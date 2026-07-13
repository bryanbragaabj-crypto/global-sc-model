import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getErrorMessage,
  getSupabaseHeaders,
  getSupabaseServerConfig,
} from "../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PEDIDOS_BUCKET = "pedido-anexos";
const MAX_ATTACHMENTS = 10;

type AnexoRecebido = {
  id?: unknown;
  nome?: unknown;
  tipo?: unknown;
  tamanho?: unknown;
  caminho?: unknown;
};

type PedidoRecebido = {
  cnpj?: unknown;
  nome?: unknown;
  nomeFantasia?: unknown;
  inscricaoEstadual?: unknown;
  endereco?: unknown;
  numero?: unknown;
  bairro?: unknown;
  cep?: unknown;
  cidade?: unknown;
  telefone?: unknown;
  email?: unknown;
  representante?: unknown;
  mensagem?: unknown;
  origem?: unknown;
  anexos?: unknown;
};

type SupabaseConfig = ReturnType<
  typeof getSupabaseServerConfig
>;

function getText(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function createOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const sequence = String(now.getTime()).slice(-8);

  return `GS${year}-${sequence}`;
}

function isSafeAttachmentId(value: string) {
  return /^[a-zA-Z0-9._-]{8,120}$/.test(value);
}

function isSafeStoragePath(value: string) {
  return (
    value.startsWith("pedidos/") &&
    value.length < 500 &&
    !value.includes("..")
  );
}

function readAttachments(value: unknown) {
  const entrada = Array.isArray(value)
    ? value
    : [];

  if (entrada.length > MAX_ATTACHMENTS) {
    throw new Error(
      `Envie no máximo ${MAX_ATTACHMENTS} anexos por pedido.`,
    );
  }

  return entrada.map((item, index) => {
    const anexo = item as AnexoRecebido;

    const id = getText(anexo.id);
    const nome = getText(anexo.nome);
    const tipo = getText(anexo.tipo);
    const tamanho = getText(anexo.tamanho);
    const caminho = getText(anexo.caminho);

    if (
      !isSafeAttachmentId(id) ||
      !nome ||
      (
        tipo !== "PDF" &&
        tipo !== "PNG" &&
        tipo !== "JPG"
      ) ||
      !isSafeStoragePath(caminho)
    ) {
      throw new Error(
        `Anexo ${index + 1} inválido.`,
      );
    }

    return {
      id,
      nome,
      tipo,
      tamanho: tamanho || "Não informado",
      caminho,
    };
  });
}

async function removeUploadedAttachments(
  config: SupabaseConfig,
  caminhos: string[],
) {
  if (caminhos.length === 0) {
    return;
  }

  try {
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
      console.error(
        "Não foi possível remover anexos após erro no pedido:",
        await getErrorMessage(response),
      );
    }
  } catch (error) {
    console.error(
      "Erro ao limpar anexos após falha no pedido:",
      error,
    );
  }
}

export async function POST(request: Request) {
  let config: SupabaseConfig | null = null;
  let caminhosEnviados: string[] = [];

  try {
    const body =
      (await request.json()) as PedidoRecebido;

    const cnpj = getText(body.cnpj);
    const nome = getText(body.nome);
    const nomeFantasia =
      getText(body.nomeFantasia);
    const endereco = getText(body.endereco);
    const numeroEndereco =
      getText(body.numero);
    const bairro = getText(body.bairro);
    const cep = getText(body.cep);
    const cidade = getText(body.cidade);
    const telefone = getText(body.telefone);
    const email =
      getText(body.email).toLowerCase();
    const representante =
      getText(body.representante);
    const mensagem =
      getText(body.mensagem);
    const anexos =
      readAttachments(body.anexos);

    caminhosEnviados = anexos.map(
      (anexo) => anexo.caminho,
    );

    if (
      !cnpj ||
      !nome ||
      !nomeFantasia ||
      !endereco ||
      !numeroEndereco ||
      !bairro ||
      !cep ||
      !cidade ||
      !telefone ||
      !email ||
      !representante
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Preencha todos os campos obrigatórios do pedido.",
        },
        { status: 400 },
      );
    }

    if (onlyNumbers(cnpj).length !== 14) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Informe um CNPJ válido com 14 números.",
        },
        { status: 400 },
      );
    }

    if (
      !email.includes("@") ||
      email.startsWith("@") ||
      email.endsWith("@")
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Informe um e-mail válido.",
        },
        { status: 400 },
      );
    }

    if (!mensagem && anexos.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Escreva uma mensagem ou adicione ao menos um anexo.",
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    const isAdmin =
      cookieStore.get(
        "global-sc-admin-session",
      )?.value === "autorizado";

    const origemSolicitada =
      getText(body.origem);

    const origem =
      isAdmin &&
      origemSolicitada === "MANUAL"
        ? "MANUAL"
        : "SITE";

    config = getSupabaseServerConfig();

    const pedidoId = crypto.randomUUID();
    const numeroPedido =
      createOrderNumber();

    const response = await fetch(
      `${config.url}/rest/v1/pedidos`,
      {
        method: "POST",
        headers: getSupabaseHeaders(config, {
          "Content-Type": "application/json",
          Prefer: "return=representation",
        }),
        body: JSON.stringify({
          id: pedidoId,
          numero: numeroPedido,
          cliente: nomeFantasia || nome,
          email,
          telefone,
          cnpj,
          nome,
          nome_fantasia: nomeFantasia,
          inscricao_estadual:
            getText(body.inscricaoEstadual),
          endereco,
          numero_endereco: numeroEndereco,
          bairro,
          cep,
          cidade,
          representante,
          assunto:
            `Pedido - ${nomeFantasia || nome}`,
          mensagem:
            mensagem ||
            "Pedido enviado com anexos.",
          importadora: "A definir",
          origem,
          status: "RECEBIDO",
          responsavel: isAdmin
            ? "Admin Global SC"
            : null,
          anexos,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const mensagemSupabase =
        await getErrorMessage(response);

      await removeUploadedAttachments(
        config,
        caminhosEnviados,
      );

      caminhosEnviados = [];

      console.error(
        "Erro ao registrar pedido no Supabase:",
        {
          status: response.status,
          numeroPedido,
          mensagemSupabase,
        },
      );

      throw new Error(mensagemSupabase);
    }

    return NextResponse.json(
      {
        ok: true,
        numero: numeroPedido,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      config &&
      caminhosEnviados.length > 0
    ) {
      await removeUploadedAttachments(
        config,
        caminhosEnviados,
      );
    }

    console.error(
      "Erro ao enviar pedido:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar o pedido. Tente novamente.",
      },
      { status: 500 },
    );
  }
}
