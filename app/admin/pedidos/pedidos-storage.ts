"use client";

import { Pedido, PedidoStatus, pedidosIniciais } from "./pedidos-data";

export const PEDIDOS_STORAGE_KEY = "global-sc-pedidos";
export const PEDIDOS_UPDATED_EVENT = "global-sc-pedidos-updated";

/*
  O Supabase é a fonte oficial dos pedidos.
  O localStorage permanece somente como cópia temporária para a tela responder
  rapidamente enquanto a atualização do servidor é concluída.
*/
const PEDIDOS_STORAGE_VERSION_KEY = "global-sc-pedidos-versao";
const PEDIDOS_STORAGE_VERSION = "supabase-pedidos-2026-06-29";

function isBrowser() {
  return typeof window !== "undefined";
}

function clonePedidosIniciais(): Pedido[] {
  return pedidosIniciais.map((pedido) => ({
    ...pedido,
    anexos: pedido.anexos.map((anexo) => ({ ...anexo })),
  }));
}

function emitirAtualizacao() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(PEDIDOS_UPDATED_EVENT));
  }
}

function garantirLimpezaInicial() {
  if (!isBrowser()) {
    return;
  }

  const versaoSalva = window.localStorage.getItem(PEDIDOS_STORAGE_VERSION_KEY);

  if (versaoSalva !== PEDIDOS_STORAGE_VERSION) {
    window.localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify([]));
    window.localStorage.setItem(
      PEDIDOS_STORAGE_VERSION_KEY,
      PEDIDOS_STORAGE_VERSION,
    );
  }
}

function salvarPedidosSemEvento(pedidos: Pedido[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify(pedidos));
}

export function getPedidos(): Pedido[] {
  if (!isBrowser()) {
    return clonePedidosIniciais();
  }

  garantirLimpezaInicial();

  try {
    const dadosSalvos = window.localStorage.getItem(PEDIDOS_STORAGE_KEY);

    if (!dadosSalvos) {
      const pedidosVazios = clonePedidosIniciais();
      salvarPedidosSemEvento(pedidosVazios);
      return pedidosVazios;
    }

    const pedidos = JSON.parse(dadosSalvos);

    if (!Array.isArray(pedidos)) {
      salvarPedidosSemEvento([]);
      return [];
    }

    return pedidos as Pedido[];
  } catch {
    salvarPedidosSemEvento([]);
    return [];
  }
}

export function salvarPedidos(pedidos: Pedido[]) {
  salvarPedidosSemEvento(pedidos);
  emitirAtualizacao();
}

/*
  Carrega os pedidos reais do Supabase pela rota protegida do servidor.
*/
export async function carregarPedidosDoServidor() {
  const response = await fetch("/api/admin/pedidos", {
    cache: "no-store",
  });

  const resposta = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
    pedidos?: Pedido[];
  };

  if (!response.ok || resposta.ok !== true || !Array.isArray(resposta.pedidos)) {
    throw new Error(resposta.message || "Não foi possível carregar os pedidos.");
  }

  salvarPedidosSemEvento(resposta.pedidos);

  return resposta.pedidos;
}

/*
  Atualiza o status no Supabase e deixa a cópia local igual ao banco.
*/
export async function atualizarStatusPedidoNoServidor(
  pedidoId: string,
  status: PedidoStatus,
) {
  const response = await fetch("/api/admin/pedidos", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pedidoId,
      status,
    }),
  });

  const resposta = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
    pedido?: Pedido;
  };

  if (!response.ok || resposta.ok !== true || !resposta.pedido) {
    throw new Error(
      resposta.message || "Não foi possível atualizar o status do pedido.",
    );
  }

  const pedidosAtualizados = getPedidos().map((pedido) =>
    pedido.id === pedidoId ? resposta.pedido! : pedido,
  );

  salvarPedidos(pedidosAtualizados);

  return resposta.pedido;
}

/*
  Funções abaixo ficam por compatibilidade com telas antigas.
  A tela Pedidos atualizada usará as funções remotas acima.
*/
export function adicionarPedido(pedido: Pedido) {
  const pedidos = getPedidos();
  salvarPedidos([pedido, ...pedidos]);
  return pedido;
}

export const criarPedido = adicionarPedido;

export function atualizarPedido(
  pedidoId: string,
  atualizacao: Partial<Pedido>,
) {
  const pedidosAtualizados = getPedidos().map((pedido) =>
    pedido.id === pedidoId
      ? {
          ...pedido,
          ...atualizacao,
          anexos: atualizacao.anexos
            ? atualizacao.anexos.map((anexo) => ({ ...anexo }))
            : pedido.anexos,
        }
      : pedido,
  );

  salvarPedidos(pedidosAtualizados);

  return (
    pedidosAtualizados.find((pedido) => pedido.id === pedidoId) || null
  );
}

export function atualizarStatusPedido(
  pedidoId: string,
  status: PedidoStatus,
) {
  return atualizarPedido(pedidoId, { status });
}

export function removerPedido(pedidoId: string) {
  const pedidosAtualizados = getPedidos().filter(
    (pedido) => pedido.id !== pedidoId,
  );

  salvarPedidos(pedidosAtualizados);
}

export function limparSomentePedidos() {
  salvarPedidos([]);
}
