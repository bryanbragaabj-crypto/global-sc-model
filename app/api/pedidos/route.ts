import { NextResponse } from "next/server";
import {
  encodeStoragePath,
  getErrorMessage,
  getSupabaseHeaders,
  getSupabaseServerConfig,
} from "../../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PEDIDOS_BUCKET = "pedido-anexos";
const MAX_ATTACHMENT_SIZE = 20 * 1024 * 1024;
const MAX_ATTACHMENTS = 10;

type AttachmentType = "PDF" | "PNG" | "JPG";

type ArquivoSolicitado = {
  id?: unknown;
  nome?: unknown;
  tipo?: unknown;
  tamanho?: unknown;
};

type SignedUploadResponse = {
  url?: string;
};

type ErrorWithCause = Error & {
  cause?: {
    code?: string;
    syscall?: string;
    hostname?: string;
    address?: string;
    port?: number;
    message?: string;
  };
};

function isAllowedAttachmentType(
  value: string,
): value is AttachmentType {
  return (
    value === "PDF" ||
    value === "PNG" ||
    value === "JPG"
  );
}

function safeFileName(name: string) {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const safeName = normalized
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  return safeName || `arquivo-${Date.now()}`;
}

function isSafeId(value: string) {
  return /^[a-zA-Z0-9._-]{8,120}$/.test(value);
}

function isSafeStoragePath(value: string) {
  return (
    value.startsWith("pedidos/") &&
    value.length < 500 &&
    !value.includes("..")
  );
}

function getFetchErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Erro desconhecido ao conectar com o Supabase.";
  }

  const errorWithCause = error as ErrorWithCause;
  const cause = errorWithCause.cause;

  if (!cause) {
    return error.message;
  }

  const details = [
    cause.code
      ? `Código: ${cause.code}`
      : "",
    cause.syscall
      ? `Operação: ${cause.syscall}`
      : "",
    cause.hostname
      ? `Servidor: ${cause.hostname}`
      : "",
    cause.address
      ? `Endereço: ${cause.address}`
      : "",
    cause.port
      ? `Porta: ${cause.port}`
      : "",
    cause.message
      ? `Causa: ${cause.message}`
      : "",
  ].filter(Boolean);

  if (details.length === 0) {
    return error.message;
  }

  return `${error.message}. ${details.join(" | ")}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      arquivos?: ArquivoSolicitado[];
    };

    const arquivos = Array.isArray(body.arquivos)
      ? body.arquivos
      : [];

    if (arquivos.length === 0) {
      return NextResponse.json({
        ok: true,
        anexos: [],
      });
    }

    if (arquivos.length > MAX_ATTACHMENTS) {
      return NextResponse.json(
        {
          ok: false,
          message:
            `Envie no máximo ${MAX_ATTACHMENTS} anexos por pedido.`,
        },
        {
          status: 400,
        },
      );
    }

    const config = getSupabaseServerConfig();
    const loteId = crypto.randomUUID();

    const anexos: Array<{
      id: string;
      caminho: string;
      signedUrl: string;
    }> = [];

    for (const arquivo of arquivos) {
      const id =
        typeof arquivo.id === "string"
          ? arquivo.id.trim()
          : "";

      const nome =
        typeof arquivo.nome === "string"
          ? arquivo.nome.trim()
          : "";

      const tipo =
        typeof arquivo.tipo === "string"
          ? arquivo.tipo.trim()
          : "";

      const tamanho =
        typeof arquivo.tamanho === "number"
          ? arquivo.tamanho
          : Number.NaN;

      if (
        !isSafeId(id) ||
        !nome ||
        !isAllowedAttachmentType(tipo)
      ) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Um dos anexos é inválido. Remova o arquivo e selecione novamente.",
          },
          {
            status: 400,
          },
        );
      }

      if (
        !Number.isFinite(tamanho) ||
        tamanho <= 0
      ) {
        return NextResponse.json(
          {
            ok: false,
            message:
              `O arquivo "${nome}" está vazio ou não pôde ser lido.`,
          },
          {
            status: 400,
          },
        );
      }

      if (tamanho > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json(
          {
            ok: false,
            message:
              `O arquivo "${nome}" ultrapassa o limite de 20 MB.`,
          },
          {
            status: 400,
          },
        );
      }

      const nomeSeguro = safeFileName(nome);

      const caminho =
        `pedidos/${loteId}/${id}-${nomeSeguro}`;

      const endpoint =
        `${config.url}/storage/v1/object/upload/sign/` +
        `${PEDIDOS_BUCKET}/${encodeStoragePath(caminho)}`;

      let response: Response;

      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: getSupabaseHeaders(config, {
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            upsert: false,
          }),
          cache: "no-store",
        });
      } catch (error) {
        const mensagemConexao =
          getFetchErrorMessage(error);

        console.error(
          "Falha de conexão ao preparar o anexo:",
          {
            endpoint,
            bucket: PEDIDOS_BUCKET,
            caminho,
            erro: mensagemConexao,
          },
        );

        throw new Error(
          `Não foi possível conectar ao Supabase para preparar "${nome}". ${mensagemConexao}`,
        );
      }

      if (!response.ok) {
        const mensagemSupabase =
          await getErrorMessage(response);

        console.error(
          "Erro do Supabase ao preparar anexo:",
          {
            endpoint,
            bucket: PEDIDOS_BUCKET,
            caminho,
            status: response.status,
            mensagemSupabase,
          },
        );

        throw new Error(
          `Não foi possível preparar o anexo "${nome}". ${mensagemSupabase}`,
        );
      }

      const data =
        (await response.json()) as SignedUploadResponse;

      if (!data.url) {
        console.error(
          "Supabase não retornou URL assinada:",
          {
            bucket: PEDIDOS_BUCKET,
            caminho,
            resposta: data,
          },
        );

        throw new Error(
          `O Supabase não retornou um link de envio para "${nome}".`,
        );
      }

      const signedUrl = data.url.startsWith("http")
        ? data.url
        : `${config.url}/storage/v1${data.url}`;

      anexos.push({
        id,
        caminho,
        signedUrl,
      });
    }

    return NextResponse.json({
      ok: true,
      anexos,
    });
  } catch (error) {
    const message = getFetchErrorMessage(error);

    console.error(
      "Erro ao preparar anexos do pedido:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as {
      caminhos?: unknown;
    };

    const caminhos = Array.isArray(body.caminhos)
      ? body.caminhos
          .filter(
            (caminho): caminho is string =>
              typeof caminho === "string" &&
              isSafeStoragePath(caminho),
          )
          .slice(0, MAX_ATTACHMENTS)
      : [];

    if (caminhos.length === 0) {
      return NextResponse.json({
        ok: true,
      });
    }

    const config = getSupabaseServerConfig();

    const endpoint =
      `${config.url}/storage/v1/object/${PEDIDOS_BUCKET}`;

    let response: Response;

    try {
      response = await fetch(endpoint, {
        method: "DELETE",
        headers: getSupabaseHeaders(config, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          prefixes: caminhos,
        }),
        cache: "no-store",
      });
    } catch (error) {
      throw new Error(
        `Falha ao conectar com o Supabase para limpar os anexos. ${getFetchErrorMessage(
          error,
        )}`,
      );
    }

    if (!response.ok) {
      const mensagemSupabase =
        await getErrorMessage(response);

      throw new Error(mensagemSupabase);
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    const message = getFetchErrorMessage(error);

    console.error(
      "Erro ao limpar anexos temporários:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      {
        status: 500,
      },
    );
  }
}