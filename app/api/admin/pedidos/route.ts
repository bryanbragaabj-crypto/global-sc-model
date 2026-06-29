import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getErrorMessage,
  getSupabaseHeaders,
  getSupabaseServerConfig,
} from "../../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PedidoAnexoBanco = {
  id?: string;
  nome?: string;
  tipo?: "PDF" | "PNG" | "JPG";
  tamanho?: string;
  caminho?: string;
};

type PedidoBanco = {
  id: string;
  numero: string;
  cliente: string;
  email: string;
  telefone?: string | null;
  cnpj?: string | null;
  nome?: string | null;
  nome_fantasia?: string | null;
  inscricao_estadual?: string | null;
  endereco?: string | null;
  numero_endereco?: string | null;
  bairro?: string | null;
  cep?: string | null;
  cidade?: string | null;
  representante?: string | null;
  assunto: string;
  mensagem?: string | null;
  importadora?: string | null;
  origem: "SITE" | "MANUAL";
  status: "RECEBIDO" | "EM_ANDAMENTO" | "FINALIZADO";
  responsavel?: string | null;
  anexos?: PedidoAnexoBanco[] | null;
  criado_em?: string | null;
};

function formatOrderDate(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

async function verificarAdmin() {
  const cookieStore = await cookies();

  return cookieStore.get("global-sc-admin-session")?.value === "autorizado";
}

function formatarPedido(pedido: PedidoBanco) {
  const anexosOriginais = Array.isArray(pedido.anexos)
    ? pedido.anexos
    : [];

  return {
    id: pedido.id,
    numero: pedido.numero,
    cliente: pedido.cliente,
    email: pedido.email,
    telefone: pedido.telefone || "",
    cnpj: pedido.cnpj || "",
    nome: pedido.nome || "",
    nomeFantasia: pedido.nome_fantasia || "",
    inscricaoEstadual: pedido.inscricao_estadual || "",
    endereco: pedido.endereco || "",
    numeroEndereco: pedido.numero_endereco || "",
    bairro: pedido.bairro || "",
    cep: pedido.cep || "",
    cidade: pedido.cidade || "",
    representante: pedido.representante || "",
    assunto: pedido.assunto,
    mensagem: pedido.mensagem || "",
    importadora: pedido.importadora || "A definir",
    origem: pedido.origem,
    status: pedido.status,
    responsavel: pedido.responsavel || "",
    dataFormatada: formatOrderDate(pedido.criado_em),
    criadoEm: pedido.criado_em || "",
    anexos: anexosOriginais.map((anexo, index) => ({
      id: anexo.id || `${pedido.id}-anexo-${index}`,
      nome: anexo.nome || "Anexo",
      tipo: anexo.tipo || "PDF",
      tamanho: anexo.tamanho || "Não informado",
      caminho: anexo.caminho || "",
    })),
  };
}

export async function GET() {
  if (!(await verificarAdmin())) {
    return NextResponse.json(
      { ok: false, message: "Acesso administrativo não autorizado." },
      { status: 401 },
    );
  }

  try {
    const config = getSupabaseServerConfig();
    const response = await fetch(
      `${config.url}/rest/v1/pedidos?select=*&order=criado_em.desc`,
      {
        headers: getSupabaseHeaders(config),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    const data = (await response.json()) as PedidoBanco[];
    const pedidos = data.map(formatarPedido);

    return NextResponse.json({ ok: true, pedidos });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os pedidos.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await verificarAdmin())) {
    return NextResponse.json(
      { ok: false, message: "Acesso administrativo não autorizado." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as {
      pedidoId?: unknown;
      status?: unknown;
    };

    const pedidoId =
      typeof body.pedidoId === "string" ? body.pedidoId.trim() : "";
    const status = typeof body.status === "string" ? body.status : "";

    if (!pedidoId) {
      return NextResponse.json(
        { ok: false, message: "Pedido inválido." },
        { status: 400 },
      );
    }

    if (
      status !== "RECEBIDO" &&
      status !== "EM_ANDAMENTO" &&
      status !== "FINALIZADO"
    ) {
      return NextResponse.json(
        { ok: false, message: "Status de pedido inválido." },
        { status: 400 },
      );
    }

    const config = getSupabaseServerConfig();
    const response = await fetch(
      `${config.url}/rest/v1/pedidos?id=eq.${encodeURIComponent(pedidoId)}`,
      {
        method: "PATCH",
        headers: getSupabaseHeaders(config, {
          "Content-Type": "application/json",
          Prefer: "return=representation",
        }),
        body: JSON.stringify({ status }),
      },
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    const pedidosAtualizados = (await response.json()) as PedidoBanco[];
    const pedido = pedidosAtualizados[0];

    if (!pedido) {
      throw new Error("Pedido não encontrado.");
    }

    return NextResponse.json({
      ok: true,
      pedido: formatarPedido(pedido),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar o status do pedido.",
      },
      { status: 500 },
    );
  }
}
