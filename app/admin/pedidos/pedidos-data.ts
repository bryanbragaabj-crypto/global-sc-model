"use client";

export type PedidoStatus = "RECEBIDO" | "EM_ANDAMENTO" | "FINALIZADO";

export type PedidoOrigem = "SITE" | "MANUAL";

export type PedidoAnexo = {
  id: string;
  nome: string;
  tipo: "PDF" | "PNG" | "JPG";
};

export type Pedido = {
  id: string;
  numero: string;
  cliente: string;
  email: string;
  telefone?: string;
  cnpj?: string;
  nome?: string;
  nomeFantasia?: string;
  inscricaoEstadual?: string;
  endereco?: string;
  numeroEndereco?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  representante?: string;
  assunto: string;
  mensagem: string;
  importadora: string;
  origem: PedidoOrigem;
  status: PedidoStatus;
  responsavel?: string;
  dataFormatada: string;
  criadoEm?: string;
  anexos: PedidoAnexo[];
};

/*
  O sistema inicia sem pedidos de demonstração.
  Os pedidos reais enviados pelo formulário serão gravados normalmente.
*/
export const pedidosIniciais: Pedido[] = [];

export function getStatusLabel(status: PedidoStatus) {
  if (status === "EM_ANDAMENTO") {
    return "Em andamento";
  }

  if (status === "FINALIZADO") {
    return "Finalizado";
  }

  return "Pendente";
}

export function getOrigemLabel(origem: PedidoOrigem) {
  return origem === "SITE" ? "Site" : "Manual";
}
