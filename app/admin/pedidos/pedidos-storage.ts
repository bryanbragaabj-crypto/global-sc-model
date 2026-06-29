"use client";

import { Pedido, PedidoStatus, pedidosIniciais } from "./pedidos-data";

export const PEDIDOS_STORAGE_KEY = "global-sc-pedidos";
export const PEDIDOS_UPDATED_EVENT = "global-sc-pedidos-updated";

/*
  Esta versão limpa somente os pedidos e movimentações já salvos no navegador
  uma única vez. Configurações, importadoras, links, usuários e layout não são
  alterados.
*/
const PEDIDOS_STORAGE_VERSION_KEY = "global-sc-pedidos-versao";
const PEDIDOS_STORAGE_VERSION = "limpeza-pedidos-2026-06-28";

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

export function getPedidos(): Pedido[] {
  if (!isBrowser()) {
    return clonePedidosIniciais();
  }

  garantirLimpezaInicial();

  try {
    const dadosSalvos = window.localStorage.getItem(PEDIDOS_STORAGE_KEY);

    if (!dadosSalvos) {
      const pedidosVazios = clonePedidosIniciais();

      window.localStorage.setItem(
        PEDIDOS_STORAGE_KEY,
        JSON.stringify(pedidosVazios),
      );

      return pedidosVazios;
    }

    const pedidos = JSON.parse(dadosSalvos);

    if (!Array.isArray(pedidos)) {
      window.localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }

    return pedidos as Pedido[];
  } catch {
    window.localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

export function salvarPedidos(pedidos: Pedido[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify(pedidos));
  emitirAtualizacao();
}

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
