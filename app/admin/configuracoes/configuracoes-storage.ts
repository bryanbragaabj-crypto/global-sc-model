"use client";

export type ImportadoraStatus = "ATIVA" | "INATIVA";

export type ImportadoraConfig = {
  id: string;
  nome: string;
  b2bUrl: string;
  status: ImportadoraStatus;
};

export type OperadorConfig = {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
};

export type ConfiguracoesPainel = {
  nomeEmpresa: string;
  emailAdministrador: string;
  fusoHorario: string;
  idioma: string;
  corFonte: string;
  corFundo: string;
  logoPersonalizada: string;
  statusPadraoSite: string;
  pastaDestino: string;
  moverAutomaticamenteAndamento: boolean;
  importadoras: ImportadoraConfig[];
  fraseMotivacional: string;
  numeroWhatsApp: string;
  formatosUpload: {
    pdf: boolean;
    jpg: boolean;
    png: boolean;
    mensagem: boolean;
  };
  limiteTamanhoArquivo: string;
  limiteArquivosPedido: string;
  operadores: OperadorConfig[];
};

export const CONFIGURACOES_STORAGE_KEY = "global-sc-configuracoes";
export const CONFIGURACOES_UPDATED_EVENT = "global-sc-configuracoes-updated";

const configuracoesIniciais: ConfiguracoesPainel = {
  nomeEmpresa: "Global SC Fábricas e Importadora",
  emailAdministrador: "contato@globalscaltoatacado.com",
  fusoHorario: "(UTC-03:00) Brasília",
  idioma: "Português (Brasil)",
  corFonte: "#FFC107",
  corFundo: "#0A0A0A",
  logoPersonalizada: "",
  statusPadraoSite: "Novo pedido recebido",
  pastaDestino: "Pedidos",
  moverAutomaticamenteAndamento: true,
  importadoras: [
    {
      id: "inovare",
      nome: "Inovare Representações",
      b2bUrl: "https://inovarerepresentacoes.pedidook.com.br",
      status: "ATIVA",
    },
    {
      id: "kontudo",
      nome: "Importadora KonTudo",
      b2bUrl: "https://importadorakontudo.pedidook.com.br",
      status: "ATIVA",
    },
    {
      id: "kontudo-surf",
      nome: "Kontudo Surf",
      b2bUrl: "https://importadorakontudosurf.pedidook.com.br",
      status: "ATIVA",
    },
    {
      id: "cunha",
      nome: "Importadora do Cunha",
      b2bUrl: "https://importadoradocunha.pedidook.com.br",
      status: "ATIVA",
    },
    {
      id: "sc-fashion",
      nome: "SC Fashion",
      b2bUrl: "https://scfashionatacadista.com",
      status: "ATIVA",
    },
  ],
  fraseMotivacional:
    "Foco, agilidade e organização hoje, resultados extraordinários sempre!",
  numeroWhatsApp: "(48) 9207-0377",
  formatosUpload: {
    pdf: true,
    jpg: true,
    png: true,
    mensagem: true,
  },
  limiteTamanhoArquivo: "20 MB",
  limiteArquivosPedido: "10 arquivos",
  operadores: [
    {
      id: "operador-mariana",
      nome: "Mariana Rodrigues",
      email: "mariana@globalsc.com",
      ativo: true,
    },
    {
      id: "operador-carlos",
      nome: "Carlos Alberto",
      email: "carlos@globalsc.com",
      ativo: true,
    },
    {
      id: "operador-laura",
      nome: "Laura Silva",
      email: "laura@globalsc.com",
      ativo: true,
    },
    {
      id: "operador-pedro",
      nome: "Pedro Almeida",
      email: "pedro@globalsc.com",
      ativo: true,
    },
  ],
};

function isBrowser() {
  return typeof window !== "undefined";
}

function cloneConfiguracoes(): ConfiguracoesPainel {
  return JSON.parse(JSON.stringify(configuracoesIniciais));
}

function emitirAtualizacao() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(CONFIGURACOES_UPDATED_EVENT));
  }
}

function normalizarUrl(url: string) {
  const valor = url.trim();

  if (!valor) {
    return "";
  }

  if (/^https?:\/\//i.test(valor)) {
    return valor;
  }

  return `https://${valor}`;
}

function normalizarConfiguracoes(
  configuracoes: ConfiguracoesPainel,
): ConfiguracoesPainel {
  return {
    ...configuracoes,
    nomeEmpresa: configuracoes.nomeEmpresa.trim(),
    emailAdministrador: configuracoes.emailAdministrador.trim(),
    fraseMotivacional: configuracoes.fraseMotivacional.trim(),
    numeroWhatsApp: configuracoes.numeroWhatsApp.trim(),
    importadoras: configuracoes.importadoras.map((importadora) => ({
      ...importadora,
      nome: importadora.nome.trim(),
      b2bUrl: normalizarUrl(importadora.b2bUrl),
    })),
    operadores: configuracoes.operadores.map((operador) => ({
      ...operador,
      nome: operador.nome.trim(),
      email: operador.email.trim(),
    })),
  };
}

export function getConfiguracoes(): ConfiguracoesPainel {
  if (!isBrowser()) {
    return cloneConfiguracoes();
  }

  try {
    const stored = window.localStorage.getItem(CONFIGURACOES_STORAGE_KEY);

    if (!stored) {
      const iniciais = cloneConfiguracoes();

      window.localStorage.setItem(
        CONFIGURACOES_STORAGE_KEY,
        JSON.stringify(iniciais),
      );

      return iniciais;
    }

    const parsed = JSON.parse(stored);

    return {
      ...cloneConfiguracoes(),
      ...parsed,
      formatosUpload: {
        ...cloneConfiguracoes().formatosUpload,
        ...(parsed.formatosUpload || {}),
      },
      importadoras: Array.isArray(parsed.importadoras)
        ? parsed.importadoras
        : cloneConfiguracoes().importadoras,
      operadores: Array.isArray(parsed.operadores)
        ? parsed.operadores
        : cloneConfiguracoes().operadores,
    };
  } catch {
    return cloneConfiguracoes();
  }
}

export function salvarConfiguracoes(configuracoes: ConfiguracoesPainel) {
  if (!isBrowser()) {
    return;
  }

  const prontas = normalizarConfiguracoes(configuracoes);

  window.localStorage.setItem(
    CONFIGURACOES_STORAGE_KEY,
    JSON.stringify(prontas),
  );

  emitirAtualizacao();
}

export function atualizarConfiguracoes(
  atualizacao: Partial<ConfiguracoesPainel>,
) {
  const configuracoes = {
    ...getConfiguracoes(),
    ...atualizacao,
  };

  salvarConfiguracoes(configuracoes);

  return configuracoes;
}

export function adicionarImportadora(
  dados: Omit<ImportadoraConfig, "id">,
) {
  const configuracoes = getConfiguracoes();

  const nova: ImportadoraConfig = {
    ...dados,
    id: `importadora-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };

  salvarConfiguracoes({
    ...configuracoes,
    importadoras: [...configuracoes.importadoras, nova],
  });

  return nova;
}

export function atualizarImportadora(
  id: string,
  atualizacao: Partial<Omit<ImportadoraConfig, "id">>,
) {
  const configuracoes = getConfiguracoes();

  const importadoras = configuracoes.importadoras.map((importadora) =>
    importadora.id === id
      ? {
          ...importadora,
          ...atualizacao,
        }
      : importadora,
  );

  salvarConfiguracoes({
    ...configuracoes,
    importadoras,
  });
}

export function removerImportadora(id: string) {
  const configuracoes = getConfiguracoes();

  salvarConfiguracoes({
    ...configuracoes,
    importadoras: configuracoes.importadoras.filter(
      (importadora) => importadora.id !== id,
    ),
  });
}

export function adicionarOperador(dados: Omit<OperadorConfig, "id">) {
  const configuracoes = getConfiguracoes();

  const novo: OperadorConfig = {
    ...dados,
    id: `operador-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };

  salvarConfiguracoes({
    ...configuracoes,
    operadores: [...configuracoes.operadores, novo],
  });

  return novo;
}
