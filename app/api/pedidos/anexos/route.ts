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

type TipoAnexo = "PDF" | "PNG" | "JPG";

type ArquivoSolicitado = {
  id?: unknown;
  nome?: unknown;
  tipo?: unknown;
  tamanho?: unknown;
};

type SignedUploadResponse = {
  url?: string;
};

function isAllowedAttachmentType(value: string): value is TipoAnexo {
  return value === "PDF" || value === "PNG" || value === "JPG";
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
          message: `Envie no máximo ${MAX_ATTACHMENTS} anexos por pedido.`,
        },
        { status: 400 },
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
              "Um dos anexos é inválido. Remova o arquivo e selecione-o novamente.",
          },
          { status: 400 },
        );
      }

      if (
        !Number.isFinite(tamanho) ||
        tamanho <= 0 ||
        tamanho > MAX_ATTACHMENT_SIZE
      ) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Cada arquivo precisa ter conteúdo e pode ter no máximo 20 MB.",
          },
          { status: 400 },
        );
      }

      const caminho =
        `pedidos/${loteId}/${id}-${safeFileName(nome)}`;

      const response = await fetch(
        `${config.url}/storage/v1/object/upload/sign/${PEDIDOS_BUCKET}/${encodeStoragePath(
          caminho,
        )}`,
        {
          method: "POST",
          headers: getSupabaseHeaders(config, {
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({}),
          cache: "no-store",
        },
      );

      if (!response.ok) {
        const mensagemSupabase =
          await getErrorMessage(response);

        console.error(
          "Erro ao criar URL assinada do anexo:",
          {
            bucket: PEDIDOS_BUCKET,
            caminho,
            status: response.status,
            mensagemSupabase,
          },
        );

        throw new Error(
          `Não foi possível preparar o anexo "${nome}": ${mensagemSupabase}`,
        );
      }

      const data =
        (await response.json()) as SignedUploadResponse;

      if (!data.url) {
        throw new Error(
          `O Supabase não retornou um link para "${nome}".`,
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
    console.error(
      "Erro ao preparar anexos do pedido:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível preparar os anexos.",
      },
      { status: 500 },
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

    const response = await fetch(
      `${config.url}/storage/v1/object/${PEDIDOS_BUCKET}`,
      {
        method: "DELETE",
        headers: getSupabaseHeaders(config, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          prefixes: caminhos,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const mensagemSupabase =
        await getErrorMessage(response);

      console.error(
        "Erro ao remover anexos temporários:",
        {
          bucket: PEDIDOS_BUCKET,
          caminhos,
          status: response.status,
          mensagemSupabase,
        },
      );

      throw new Error(mensagemSupabase);
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "Erro ao limpar anexos temporários:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível limpar anexos temporários.",
      },
      { status: 500 },
    );
  }
}
