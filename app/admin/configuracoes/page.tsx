"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pedido } from "../pedidos/pedidos-data";
import {
  PEDIDOS_UPDATED_EVENT,
  getPedidos,
} from "../pedidos/pedidos-storage";
import {
  CONFIGURACOES_UPDATED_EVENT,
  ConfiguracoesPainel,
  ImportadoraConfig,
  ImportadoraStatus,
  OperadorConfig,
  adicionarImportadora,
  adicionarOperador,
  atualizarConfiguracoes,
  atualizarImportadora,
  getConfiguracoes,
  removerImportadora,
  salvarConfiguracoes,
} from "./configuracoes-storage";
import styles from "./configuracoes.module.css";

type ImportadoraRascunho = {
  id: string | null;
  nome: string;
  b2bUrl: string;
  status: ImportadoraStatus;
};

type OperadorRascunho = {
  nome: string;
  email: string;
};

const importadoraVazia: ImportadoraRascunho = {
  id: null,
  nome: "",
  b2bUrl: "",
  status: "ATIVA",
};

const operadorVazio: OperadorRascunho = {
  nome: "",
  email: "",
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10.5V20h13v-9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.7 2.7L16.5 9" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 21h16" />
      <path d="M6 21V4h9v17" />
      <path d="M15 9h3v12" />
      <path d="M9 8h3M9 12h3M9 16h3" />
    </svg>
  );
}

function ConfigIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a8 8 0 0 0 .1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1L15 6.5h-4L10.6 9a7 7 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a8 8 0 0 0 .1 1l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.5z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 2.5 4.2 5.5 4.2 9S14.8 18.5 12 21M12 3C9.2 5.5 7.8 8.5 7.8 12S9.2 18.5 12 21" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6a12 12 0 1 0 14.2-18.9ZM12.1 21.9a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a10 10 0 1 1 8.4 4.6Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v5M8 20h8" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 14v5h14v-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 19 6v5.7c0 4.5-3 7.7-7 9.3-4-1.6-7-4.8-7-9.3V6z" />
      <path d="m9.5 12.1 1.6 1.6 3.5-3.5" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 11H5zM5 21h14" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h12l3 3v13H5z" />
      <path d="M8 4v6h8V4M8 20v-6h8v6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M10 11v6M14 11v6M9 7V4h6v3M6 7l1 14h10l1-14" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5zM13.8 6.7l3.5 3.5" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

function contarPedidosPorImportadora(pedidos: Pedido[], nome: string) {
  return pedidos.filter((pedido) => pedido.importadora === nome).length;
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR");
}

function criarCsv(nomeArquivo: string, linhas: string[][]) {
  const conteudo = linhas
    .map((linha) =>
      linha
        .map((coluna) => `"${String(coluna).replace(/"/g, '""')}"`)
        .join(";"),
    )
    .join("\n");

  const arquivo = new Blob([conteudo], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(arquivo);
  const link = document.createElement("a");

  link.href = url;
  link.download = nomeArquivo;
  link.click();

  URL.revokeObjectURL(url);
}

export default function ConfiguracoesPage() {
  const [configuracoes, setConfiguracoes] =
    useState<ConfiguracoesPainel | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");
  const [importadoraModalAberto, setImportadoraModalAberto] = useState(false);
  const [operadorModalAberto, setOperadorModalAberto] = useState(false);
  const [importadoraRascunho, setImportadoraRascunho] =
    useState<ImportadoraRascunho>(importadoraVazia);
  const [operadorRascunho, setOperadorRascunho] =
    useState<OperadorRascunho>(operadorVazio);
  const [periodoRelatorio, setPeriodoRelatorio] = useState("Semana");
  const [categoriaRelatorio, setCategoriaRelatorio] =
    useState("Relatório de pedidos");

  useEffect(() => {
    function carregarDados() {
      setConfiguracoes(getConfiguracoes());
      setPedidos(getPedidos());
    }

    carregarDados();

    window.addEventListener(CONFIGURACOES_UPDATED_EVENT, carregarDados);
    window.addEventListener(PEDIDOS_UPDATED_EVENT, carregarDados);
    window.addEventListener("storage", carregarDados);

    return () => {
      window.removeEventListener(CONFIGURACOES_UPDATED_EVENT, carregarDados);
      window.removeEventListener(PEDIDOS_UPDATED_EVENT, carregarDados);
      window.removeEventListener("storage", carregarDados);
    };
  }, []);

  const pedidosFinalizados = useMemo(
    () => pedidos.filter((pedido) => pedido.status === "FINALIZADO"),
    [pedidos],
  );

  const resumoPorOperador = useMemo(() => {
    const mapa = new Map<string, number>();

    pedidosFinalizados.forEach((pedido) => {
      const responsavel = pedido.responsavel || "Admin Global SC";
      mapa.set(responsavel, (mapa.get(responsavel) || 0) + 1);
    });

    if (configuracoes) {
      configuracoes.operadores.forEach((operador) => {
        if (!mapa.has(operador.nome)) {
          mapa.set(operador.nome, 0);
        }
      });
    }

    return Array.from(mapa.entries())
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total);
  }, [configuracoes, pedidosFinalizados]);

  const rankingImportadoras = useMemo(() => {
    if (!configuracoes) {
      return [];
    }

    return configuracoes.importadoras
      .map((importadora) => ({
        nome: importadora.nome,
        total: contarPedidosPorImportadora(pedidos, importadora.nome),
      }))
      .sort((a, b) => b.total - a.total);
  }, [configuracoes, pedidos]);

  const maiorRanking = Math.max(
    1,
    ...rankingImportadoras.map((item) => item.total),
  );

  const importadorasFiltradas = useMemo(() => {
    if (!configuracoes) {
      return [];
    }

    const busca = search.trim().toLowerCase();

    if (!busca) {
      return configuracoes.importadoras;
    }

    return configuracoes.importadoras.filter((importadora) =>
      [importadora.nome, importadora.b2bUrl]
        .join(" ")
        .toLowerCase()
        .includes(busca),
    );
  }, [configuracoes, search]);

  function atualizarCampo<K extends keyof ConfiguracoesPainel>(
    chave: K,
    valor: ConfiguracoesPainel[K],
  ) {
    if (!configuracoes) {
      return;
    }

    const atualizadas = {
      ...configuracoes,
      [chave]: valor,
    };

    setConfiguracoes(atualizadas);
  }

  function salvarSecao(mensagem: string) {
    if (!configuracoes) {
      return;
    }

    salvarConfiguracoes(configuracoes);
    setFeedback(mensagem);
  }

  function lidarLogo(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo || !configuracoes) {
      return;
    }

    if (!arquivo.type.startsWith("image/")) {
      setFeedback("Escolha um arquivo de imagem PNG ou JPG.");
      return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
      setFeedback("A imagem da logo precisa ter no máximo 2 MB.");
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      const logoPersonalizada = String(leitor.result || "");

      const atualizadas = {
        ...configuracoes,
        logoPersonalizada,
      };

      setConfiguracoes(atualizadas);
      salvarConfiguracoes(atualizadas);
      setFeedback("Logo atualizada com sucesso neste navegador.");
    };

    leitor.readAsDataURL(arquivo);
  }

  function abrirNovaImportadora() {
    setImportadoraRascunho(importadoraVazia);
    setImportadoraModalAberto(true);
  }

  function abrirEdicaoImportadora(importadora: ImportadoraConfig) {
    setImportadoraRascunho({
      id: importadora.id,
      nome: importadora.nome,
      b2bUrl: importadora.b2bUrl,
      status: importadora.status,
    });

    setImportadoraModalAberto(true);
  }

  function salvarImportadora(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!importadoraRascunho.nome.trim() || !importadoraRascunho.b2bUrl.trim()) {
      setFeedback("Informe o nome e o link B2B da importadora.");
      return;
    }

    if (importadoraRascunho.id) {
      atualizarImportadora(importadoraRascunho.id, {
        nome: importadoraRascunho.nome,
        b2bUrl: importadoraRascunho.b2bUrl,
        status: importadoraRascunho.status,
      });
      setFeedback("Link da importadora atualizado com sucesso.");
    } else {
      adicionarImportadora({
        nome: importadoraRascunho.nome,
        b2bUrl: importadoraRascunho.b2bUrl,
        status: importadoraRascunho.status,
      });
      setFeedback("Importadora cadastrada com sucesso.");
    }

    setConfiguracoes(getConfiguracoes());
    setImportadoraModalAberto(false);
  }

  function excluirImportadora() {
    if (!importadoraRascunho.id) {
      return;
    }

    const confirmou = window.confirm(
      `Deseja excluir "${importadoraRascunho.nome}"?`,
    );

    if (!confirmou) {
      return;
    }

    removerImportadora(importadoraRascunho.id);
    setConfiguracoes(getConfiguracoes());
    setImportadoraModalAberto(false);
    setFeedback("Importadora excluída com sucesso.");
  }

  function salvarOperador(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!operadorRascunho.nome.trim() || !operadorRascunho.email.trim()) {
      setFeedback("Informe o nome e o e-mail do operador.");
      return;
    }

    adicionarOperador({
      nome: operadorRascunho.nome,
      email: operadorRascunho.email,
      ativo: true,
    });

    setConfiguracoes(getConfiguracoes());
    setOperadorRascunho(operadorVazio);
    setOperadorModalAberto(false);
    setFeedback("Operador adicionado com sucesso.");
  }

  function gerarRelatorio() {
    const linhasBase = pedidos.map((pedido) => [
      pedido.numero,
      pedido.cliente,
      pedido.email,
      pedido.importadora,
      pedido.assunto,
      pedido.status,
      pedido.responsavel || "Admin Global SC",
      pedido.dataFormatada,
    ]);

    if (categoriaRelatorio === "Por operador") {
      criarCsv("relatorio-por-operador-global-sc.csv", [
        ["Operador", "Pedidos finalizados"],
        ...resumoPorOperador.map((item) => [item.nome, String(item.total)]),
      ]);
    } else if (categoriaRelatorio === "Por importadora") {
      criarCsv("relatorio-por-importadora-global-sc.csv", [
        ["Importadora", "Pedidos"],
        ...rankingImportadoras.map((item) => [item.nome, String(item.total)]),
      ]);
    } else {
      criarCsv("relatorio-pedidos-global-sc.csv", [
        [
          "Pedido",
          "Cliente",
          "E-mail",
          "Importadora",
          "Assunto",
          "Status",
          "Responsável",
          "Data",
        ],
        ...linhasBase,
      ]);
    }

    setFeedback(
      `Relatório gerado para o período: ${periodoRelatorio.toLowerCase()}.`,
    );
  }

  function handleModalKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setImportadoraModalAberto(false);
      setOperadorModalAberto(false);
    }
  }

  if (!configuracoes) {
    return null;
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logoBox}>
          <Image
            src={configuracoes.logoPersonalizada || "/global-sc-logo.png"}
            alt="Global SC Fábricas e Importadora"
            width={300}
            height={170}
            priority
            className={styles.logo}
          />
        </div>

        <nav className={styles.menu}>
          <Link href="/admin/painel" className={styles.menuItem}>
            <HomeIcon />
            Dashboard
          </Link>

          <Link href="/admin/pedidos" className={styles.menuItem}>
            <MailIcon />
            Pedidos
          </Link>

          <Link
            href="/admin/pedidos/em-andamento"
            className={styles.menuItem}
          >
            <ClockIcon />
            Pedidos em Andamento
            {pedidos.filter((pedido) => pedido.status === "EM_ANDAMENTO")
              .length > 0 && (
              <strong>
                {
                  pedidos.filter((pedido) => pedido.status === "EM_ANDAMENTO")
                    .length
                }
              </strong>
            )}
          </Link>

          <Link href="/admin/pedidos/finalizados" className={styles.menuItem}>
            <CheckIcon />
            Finalizados
          </Link>

          <Link href="/admin/importadoras" className={styles.menuItem}>
            <BuildingIcon />
            Importadoras
          </Link>

          <Link
            href="/admin/configuracoes"
            className={styles.menuItemActive}
          >
            <ConfigIcon />
            Configurações
          </Link>

          <Link href="/" className={styles.menuItem}>
            <HomeIcon />
            Página Principal
          </Link>
        </nav>

        <div className={styles.sidebarInfo}>
          <ShieldIcon />
          <h2>Acesso exclusivo</h2>
          <p>
            Configurações de conta, integrações e usuários do painel
            administrativo.
          </p>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <button type="button" className={styles.menuToggle} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>

          <label className={styles.search}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar pedidos, clientes ou assuntos..."
            />
            <SearchIcon />
          </label>

          <div className={styles.profile}>
            <button type="button" className={styles.notification}>
              <BellIcon />
              <span>8</span>
            </button>

            <div className={styles.avatar}>
              <UserIcon />
            </div>

            <div className={styles.profileText}>
              <strong>Admin Global SC</strong>
              <span>Administrador Master</span>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <header className={styles.pageHeading}>
            <div>
              <h1>Configurações</h1>
              <p>Personalize o painel administrativo e as integrações.</p>
            </div>

            <div className={styles.masterAlert}>
              <ShieldIcon />
              Apenas o administrador master tem acesso.
            </div>
          </header>

          {feedback && <p className={styles.feedback}>{feedback}</p>}

          <section className={styles.topGrid}>
            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <UserIcon />
                </div>
                <div>
                  <h2>Informações da Conta</h2>
                  <p>
                    Atualize os dados da sua conta, identidade visual e
                    preferências.
                  </p>
                </div>
              </header>

              <div className={styles.accountGrid}>
                <div className={styles.accountFields}>
                  <label className={styles.field}>
                    <span>Nome da Empresa</span>
                    <input
                      value={configuracoes.nomeEmpresa}
                      onChange={(event) =>
                        atualizarCampo("nomeEmpresa", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span>E-mail Administrador</span>
                    <input
                      type="email"
                      value={configuracoes.emailAdministrador}
                      onChange={(event) =>
                        atualizarCampo(
                          "emailAdministrador",
                          event.target.value,
                        )
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Fuso Horário</span>
                    <select
                      value={configuracoes.fusoHorario}
                      onChange={(event) =>
                        atualizarCampo("fusoHorario", event.target.value)
                      }
                    >
                      <option>(UTC-03:00) Brasília</option>
                      <option>(UTC-04:00) Manaus</option>
                      <option>(UTC-05:00) Rio Branco</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Idioma do Painel</span>
                    <select
                      value={configuracoes.idioma}
                      onChange={(event) =>
                        atualizarCampo("idioma", event.target.value)
                      }
                    >
                      <option>Português (Brasil)</option>
                      <option>English (United States)</option>
                      <option>Español</option>
                    </select>
                  </label>
                </div>

                <div className={styles.visualSettings}>
                  <div className={styles.logoSetting}>
                    <span>Logo da empresa</span>
                    <Image
                      src={
                        configuracoes.logoPersonalizada ||
                        "/global-sc-logo.png"
                      }
                      alt="Logo atual da empresa"
                      width={160}
                      height={90}
                    />
                    <label className={styles.changeLogoButton}>
                      Alterar logo
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={lidarLogo}
                      />
                    </label>
                    <small>PNG ou JPG até 2MB</small>
                  </div>

                  <label className={styles.colorField}>
                    <span>Cor das fontes</span>
                    <input
                      type="color"
                      value={configuracoes.corFonte}
                      onChange={(event) =>
                        atualizarCampo("corFonte", event.target.value)
                      }
                    />
                    <b>{configuracoes.corFonte}</b>
                  </label>

                  <label className={styles.colorField}>
                    <span>Cor de fundo</span>
                    <input
                      type="color"
                      value={configuracoes.corFundo}
                      onChange={(event) =>
                        atualizarCampo("corFundo", event.target.value)
                      }
                    />
                    <b>{configuracoes.corFundo}</b>
                  </label>
                </div>
              </div>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() => salvarSecao("Informações da conta salvas.")}
              >
                <SaveIcon />
                Salvar alterações
              </button>
            </article>

            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <GlobeIcon />
                </div>
                <div>
                  <h2>Integração com a Página Inicial do Site</h2>
                  <p>Defina como os pedidos vindos do site serão integrados.</p>
                </div>
              </header>

              <label className={styles.field}>
                <span>Status padrão ao receber do site</span>
                <select
                  value={configuracoes.statusPadraoSite}
                  onChange={(event) =>
                    atualizarCampo("statusPadraoSite", event.target.value)
                  }
                >
                  <option>Novo pedido recebido</option>
                  <option>Em análise</option>
                  <option>Em andamento</option>
                </select>
              </label>

              <label className={styles.field}>
                <span>Pasta de destino</span>
                <select
                  value={configuracoes.pastaDestino}
                  onChange={(event) =>
                    atualizarCampo("pastaDestino", event.target.value)
                  }
                >
                  <option>Pedidos</option>
                  <option>Pedidos em Andamento</option>
                </select>
              </label>

              <label className={styles.switchRow}>
                <input
                  type="checkbox"
                  checked={configuracoes.moverAutomaticamenteAndamento}
                  onChange={(event) =>
                    atualizarCampo(
                      "moverAutomaticamenteAndamento",
                      event.target.checked,
                    )
                  }
                />
                <span className={styles.switchControl} />
                <b>
                  Mover automaticamente para Pedidos em Andamento quando status
                  for alterado para “Em andamento”
                </b>
              </label>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() => salvarSecao("Integração com o site salva.")}
              >
                <SaveIcon />
                Salvar alterações
              </button>
            </article>

            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <LinkIcon />
                </div>
                <div>
                  <h2>Links das Importadoras</h2>
                  <p>Gerencie os links rápidos das importadoras.</p>
                </div>
              </header>

              <button
                type="button"
                className={styles.addSupplierButton}
                onClick={abrirNovaImportadora}
              >
                <PlusIcon />
                Adicionar Importadora
              </button>

              <div className={styles.linksList}>
                {importadorasFiltradas.map((importadora) => (
                  <button
                    type="button"
                    key={importadora.id}
                    onClick={() => abrirEdicaoImportadora(importadora)}
                  >
                    <span>{importadora.nome}</span>
                    <ExternalIcon />
                  </button>
                ))}

                {importadorasFiltradas.length === 0 && (
                  <p className={styles.emptyText}>
                    Nenhuma importadora encontrada.
                  </p>
                )}
              </div>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() =>
                  salvarSecao("Links das importadoras atualizados.")
                }
              >
                <SaveIcon />
                Salvar alterações
              </button>
            </article>

            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <HeartIcon />
                </div>
                <div>
                  <h2>Frase de motivação dos operadores</h2>
                  <p>Defina a frase que será exibida para motivar os operadores.</p>
                </div>
              </header>

              <label className={styles.field}>
                <span>Frase atual</span>
                <textarea
                  value={configuracoes.fraseMotivacional}
                  onChange={(event) =>
                    atualizarCampo("fraseMotivacional", event.target.value)
                  }
                  maxLength={120}
                  rows={5}
                />
                <small className={styles.counter}>
                  {configuracoes.fraseMotivacional.length}/120
                </small>
              </label>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() =>
                  salvarSecao("Frase de motivação atualizada.")
                }
              >
                <SaveIcon />
                Salvar alteração
              </button>
            </article>

            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <WhatsAppIcon />
                </div>
                <div>
                  <h2>Número do WhatsApp da Página Principal</h2>
                  <p>Número exibido na página principal para contato via WhatsApp.</p>
                </div>
              </header>

              <label className={styles.field}>
                <span>Número do WhatsApp</span>
                <input
                  value={configuracoes.numeroWhatsApp}
                  onChange={(event) =>
                    atualizarCampo("numeroWhatsApp", event.target.value)
                  }
                  placeholder="(48) 99999-9999"
                />
              </label>

              <p className={styles.helperText}>
                Você pode alterar este número quando quiser.
              </p>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() => salvarSecao("Número do WhatsApp atualizado.")}
              >
                <SaveIcon />
                Salvar número
              </button>
            </article>
          </section>

          <section className={styles.middleGrid}>
            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <CalendarIcon />
                </div>
                <div>
                  <h2>Resumo de Pedidos do Dia</h2>
                  <p>Pedidos finalizados por operador hoje.</p>
                </div>
              </header>

              <div className={styles.summaryTable}>
                <div className={styles.summaryHeader}>
                  <span>Operador</span>
                  <span>Pedidos finalizados</span>
                </div>

                {resumoPorOperador.slice(0, 4).map((item) => (
                  <div className={styles.summaryRow} key={item.nome}>
                    <span>{item.nome}</span>
                    <b>{item.total}</b>
                  </div>
                ))}
              </div>

              <div className={styles.totalDay}>
                <span>Total geral do dia</span>
                <strong>{formatarMoeda(pedidosFinalizados.length)}</strong>
              </div>
            </article>

            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <DocumentIcon />
                </div>
                <div>
                  <h2>Relatório Geral</h2>
                  <p>Gere e baixe relatórios completos do sistema.</p>
                </div>
              </header>

              <div className={styles.reportGrid}>
                <div>
                  <span className={styles.optionTitle}>Período</span>

                  <div className={styles.choiceList}>
                    {["Semana", "Mês", "Ano"].map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={
                          periodoRelatorio === item
                            ? styles.choiceActive
                            : styles.choice
                        }
                        onClick={() => setPeriodoRelatorio(item)}
                      >
                        <CalendarIcon />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className={styles.optionTitle}>Categoria do relatório</span>

                  <div className={styles.choiceList}>
                    {[
                      "Relatório de pedidos",
                      "Por operador",
                      "Por importadora",
                    ].map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={
                          categoriaRelatorio === item
                            ? styles.choiceActive
                            : styles.choice
                        }
                        onClick={() => setCategoriaRelatorio(item)}
                      >
                        <DocumentIcon />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={styles.downloadReportButton}
                onClick={gerarRelatorio}
              >
                <DocumentIcon />
                Gerar e baixar relatório
              </button>
            </article>

            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <TrophyIcon />
                </div>
                <div>
                  <h2>Ranking de Pedidos por Importadora</h2>
                  <p>Ranking das importadoras por quantidade de pedidos.</p>
                </div>
              </header>

              <div className={styles.rankingList}>
                {rankingImportadoras.map((item, index) => (
                  <div className={styles.rankingRow} key={item.nome}>
                    <span className={styles.rankNumber}>{index + 1}</span>
                    <b>{item.nome}</b>
                    <div className={styles.rankBar}>
                      <span
                        style={{
                          width: `${Math.max(
                            5,
                            (item.total / maiorRanking) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                    <strong>{item.total}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.rankingTotal}>
                <span>Total de pedidos no período</span>
                <strong>{formatarMoeda(pedidos.length)}</strong>
              </div>
            </article>
          </section>

          <section className={styles.bottomGrid}>
            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <UploadIcon />
                </div>
                <div>
                  <h2>Formatos de Upload Aceitos</h2>
                  <p>Gerencie os formatos de arquivos permitidos para anexos.</p>
                </div>
              </header>

              <div className={styles.uploadButtons}>
                {[
                  ["pdf", "PDF"],
                  ["jpg", "JPG"],
                  ["png", "PNG"],
                  ["mensagem", "Mensagem"],
                ].map(([chave, titulo]) => {
                  const campo = chave as keyof ConfiguracoesPainel["formatosUpload"];

                  return (
                    <button
                      type="button"
                      key={chave}
                      className={
                        configuracoes.formatosUpload[campo]
                          ? `${styles.uploadType} ${styles[`upload${titulo}`]}`
                          : styles.uploadTypeDisabled
                      }
                      onClick={() =>
                        atualizarCampo("formatosUpload", {
                          ...configuracoes.formatosUpload,
                          [campo]: !configuracoes.formatosUpload[campo],
                        })
                      }
                    >
                      {titulo}
                    </button>
                  );
                })}
              </div>

              <div className={styles.uploadLimits}>
                <label className={styles.inlineField}>
                  <span>Limite de tamanho por arquivo</span>
                  <select
                    value={configuracoes.limiteTamanhoArquivo}
                    onChange={(event) =>
                      atualizarCampo(
                        "limiteTamanhoArquivo",
                        event.target.value,
                      )
                    }
                  >
                    <option>10 MB</option>
                    <option>20 MB</option>
                    <option>50 MB</option>
                  </select>
                </label>

                <label className={styles.inlineField}>
                  <span>Limite de arquivos por pedido</span>
                  <select
                    value={configuracoes.limiteArquivosPedido}
                    onChange={(event) =>
                      atualizarCampo(
                        "limiteArquivosPedido",
                        event.target.value,
                      )
                    }
                  >
                    <option>5 arquivos</option>
                    <option>20 arquivos</option>
                    <option>50 arquivos</option>
                  </select>
                </label>
              </div>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() => salvarSecao("Formatos de upload atualizados.")}
              >
                <SaveIcon />
                Salvar alterações
              </button>
            </article>

            <article className={styles.card}>
              <header className={styles.cardTitle}>
                <div className={styles.cardIcon}>
                  <ShieldIcon />
                </div>
                <div>
                  <h2>Controle de Acesso</h2>
                  <p>Este painel de configurações é exclusivo do administrador master.</p>
                </div>
              </header>

              <div className={styles.accessBox}>
                <CrownIcon />

                <div>
                  <h3>Acesso exclusivo</h3>
                  <p>
                    Somente o administrador master pode acessar e alterar estas
                    configurações.
                  </p>
                </div>

                <dl>
                  <div>
                    <dt>Usuário master</dt>
                    <dd>Admin Global SC (Você)</dd>
                  </div>
                  <div>
                    <dt>Nível de acesso</dt>
                    <dd>Master</dd>
                  </div>
                </dl>
              </div>

              <div className={styles.accessActions}>
                <button
                  type="button"
                  className={styles.addUserButton}
                  onClick={() => {
                    setOperadorRascunho(operadorVazio);
                    setOperadorModalAberto(true);
                  }}
                >
                  <PlusIcon />
                  Adicionar Usuário
                </button>

                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={() => salvarSecao("Controle de acesso atualizado.")}
                >
                  <SaveIcon />
                  Salvar alterações
                </button>
              </div>

              <div className={styles.operatorsPreview}>
                {configuracoes.operadores.slice(0, 4).map((operador) => (
                  <span key={operador.id} title={operador.email}>
                    {getInitials(operador.nome)}
                  </span>
                ))}

                <small>
                  {configuracoes.operadores.length} operador(es) cadastrados
                </small>
              </div>
            </article>
          </section>
        </div>
      </section>

      {importadoraModalAberto && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onKeyDown={handleModalKey}
        >
          <form
            className={styles.modal}
            onSubmit={salvarImportadora}
            role="dialog"
            aria-modal="true"
            aria-label="Configurar importadora"
          >
            <header>
              <div>
                <h2>
                  {importadoraRascunho.id
                    ? "Editar Importadora"
                    : "Adicionar Importadora"}
                </h2>
                <p>Cadastre o link para cadastramento que aparecerá no painel.</p>
              </div>

              <button
                type="button"
                onClick={() => setImportadoraModalAberto(false)}
                aria-label="Fechar"
              >
                <CloseIcon />
              </button>
            </header>

            <label className={styles.field}>
              <span>Nome da importadora</span>
              <input
                value={importadoraRascunho.nome}
                onChange={(event) =>
                  setImportadoraRascunho((atual) => ({
                    ...atual,
                    nome: event.target.value,
                  }))
                }
                placeholder="Ex.: Nova Importadora"
              />
            </label>

            <label className={styles.field}>
              <span>Link B2B</span>
              <input
                value={importadoraRascunho.b2bUrl}
                onChange={(event) =>
                  setImportadoraRascunho((atual) => ({
                    ...atual,
                    b2bUrl: event.target.value,
                  }))
                }
                placeholder="https://empresa.pedidook.com.br"
              />
            </label>

            <label className={styles.field}>
              <span>Status</span>
              <select
                value={importadoraRascunho.status}
                onChange={(event) =>
                  setImportadoraRascunho((atual) => ({
                    ...atual,
                    status: event.target.value as ImportadoraStatus,
                  }))
                }
              >
                <option value="ATIVA">Ativa</option>
                <option value="INATIVA">Inativa</option>
              </select>
            </label>

            <footer className={styles.modalActions}>
              {importadoraRascunho.id && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={excluirImportadora}
                >
                  <TrashIcon />
                  Excluir
                </button>
              )}

              <button type="submit" className={styles.saveButton}>
                <SaveIcon />
                Salvar
              </button>
            </footer>
          </form>
        </div>
      )}

      {operadorModalAberto && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onKeyDown={handleModalKey}
        >
          <form
            className={styles.modal}
            onSubmit={salvarOperador}
            role="dialog"
            aria-modal="true"
            aria-label="Adicionar operador"
          >
            <header>
              <div>
                <h2>Adicionar Usuário</h2>
                <p>Cadastre um novo operador para o painel administrativo.</p>
              </div>

              <button
                type="button"
                onClick={() => setOperadorModalAberto(false)}
                aria-label="Fechar"
              >
                <CloseIcon />
              </button>
            </header>

            <label className={styles.field}>
              <span>Nome completo</span>
              <input
                value={operadorRascunho.nome}
                onChange={(event) =>
                  setOperadorRascunho((atual) => ({
                    ...atual,
                    nome: event.target.value,
                  }))
                }
                placeholder="Ex.: Maria da Silva"
              />
            </label>

            <label className={styles.field}>
              <span>E-mail do operador</span>
              <input
                type="email"
                value={operadorRascunho.email}
                onChange={(event) =>
                  setOperadorRascunho((atual) => ({
                    ...atual,
                    email: event.target.value,
                  }))
                }
                placeholder="operador@globalsc.com"
              />
            </label>

            <footer className={styles.modalActions}>
              <button type="submit" className={styles.saveButton}>
                <SaveIcon />
                Adicionar usuário
              </button>
            </footer>
          </form>
        </div>
      )}
    </main>
  );
}
