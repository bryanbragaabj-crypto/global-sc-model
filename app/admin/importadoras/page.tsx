"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
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
  adicionarImportadora,
  atualizarImportadora,
  getConfiguracoes,
  removerImportadora,
} from "../configuracoes/configuracoes-storage";
import styles from "./importadoras.module.css";

type UsuarioLogado = {
  nome?: string;
  perfil?: string;
};

type ImportadoraRascunho = {
  id: string | null;
  nome: string;
  b2bUrl: string;
  status: ImportadoraStatus;
};

const rascunhoVazio: ImportadoraRascunho = {
  id: null,
  nome: "",
  b2bUrl: "",
  status: "ATIVA",
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

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h3l2.2 11.2h9.9L21 8H7" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11a8 8 0 0 0-14.9-3.9L3 9" />
      <path d="M3 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.9 3.9L21 15" />
      <path d="M21 20v-5h-5" />
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

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5zM13.8 6.7l3.5 3.5" />
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

function ToggleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="10" rx="5" />
      <circle cx="16" cy="12" r="3" />
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5 19 19M19 5 5 19" />
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

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

function normalizarLink(url: string) {
  const valor = url.trim();

  if (!valor) {
    return "";
  }

  if (/^https?:\/\//i.test(valor)) {
    return valor;
  }

  return `https://${valor}`;
}

function formatarHoraAtual() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function ImportadorasPage() {
  const [configuracoes, setConfiguracoes] =
    useState<ConfiguracoesPainel | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [search, setSearch] = useState("");
  const [perfil, setPerfil] = useState("Administrador");
  const [nomeUsuario, setNomeUsuario] = useState("Admin Global SC");
  const [feedback, setFeedback] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [rascunho, setRascunho] =
    useState<ImportadoraRascunho>(rascunhoVazio);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(
    `Hoje, ${formatarHoraAtual()}`,
  );

  const operador = normalizeText(perfil).includes("operador");
  const podeGerenciar = !operador;

  function carregarDados() {
    setConfiguracoes(getConfiguracoes());
    setPedidos(getPedidos());
    setUltimaAtualizacao(`Hoje, ${formatarHoraAtual()}`);

    try {
      const usuarioSalvo = window.localStorage.getItem(
        "global-sc-usuario-logado",
      );

      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo) as UsuarioLogado;
        setPerfil(usuario.perfil || "Administrador");
        setNomeUsuario(usuario.nome || "Admin Global SC");
      }
    } catch {
      setPerfil("Administrador");
      setNomeUsuario("Admin Global SC");
    }
  }

  useEffect(() => {
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

  const importadoras = configuracoes?.importadoras || [];

  const importadorasFiltradas = useMemo(() => {
    const busca = normalizeText(search);

    if (!busca) {
      return importadoras;
    }

    return importadoras.filter((importadora) =>
      normalizeText(
        `${importadora.nome} ${importadora.b2bUrl} ${importadora.status}`,
      ).includes(busca),
    );
  }, [importadoras, search]);

  const totalAtivas = importadoras.filter(
    (importadora) => importadora.status === "ATIVA",
  ).length;

  const totalPedidos = pedidos.length;

  const ranking = useMemo(() => {
    return importadoras
      .map((importadora) => ({
        id: importadora.id,
        nome: importadora.nome,
        total: pedidos.filter(
          (pedido) =>
            normalizeText(pedido.importadora) ===
            normalizeText(importadora.nome),
        ).length,
      }))
      .sort((a, b) => b.total - a.total);
  }, [importadoras, pedidos]);

  const maiorTotal = Math.max(1, ...ranking.map((item) => item.total));

  function abrirLink(importadora: ImportadoraConfig) {
    const link = normalizarLink(importadora.b2bUrl);

    if (!link) {
      setFeedback(
        `O Link de Cadastramento da ${importadora.nome} ainda não foi informado.`,
      );
      return;
    }

    window.open(link, "_blank", "noopener,noreferrer");
  }

  function abrirNovaImportadora() {
    setRascunho(rascunhoVazio);
    setModalAberto(true);
  }

  function abrirEdicao(importadora: ImportadoraConfig) {
    setRascunho({
      id: importadora.id,
      nome: importadora.nome,
      b2bUrl: importadora.b2bUrl,
      status: importadora.status,
    });

    setModalAberto(true);
  }

  function salvarImportadora(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!rascunho.nome.trim() || !rascunho.b2bUrl.trim()) {
      setFeedback(
        "Informe o nome e o Link de Cadastramento da importadora.",
      );
      return;
    }

    if (rascunho.id) {
      atualizarImportadora(rascunho.id, {
        nome: rascunho.nome,
        b2bUrl: rascunho.b2bUrl,
        status: rascunho.status,
      });

      setFeedback("Importadora atualizada com sucesso.");
    } else {
      adicionarImportadora({
        nome: rascunho.nome,
        b2bUrl: rascunho.b2bUrl,
        status: rascunho.status,
      });

      setFeedback("Importadora cadastrada com sucesso.");
    }

    setConfiguracoes(getConfiguracoes());
    setUltimaAtualizacao(`Hoje, ${formatarHoraAtual()}`);
    setModalAberto(false);
  }

  function alternarStatus(importadora: ImportadoraConfig) {
    const proximoStatus: ImportadoraStatus =
      importadora.status === "ATIVA" ? "INATIVA" : "ATIVA";

    atualizarImportadora(importadora.id, {
      status: proximoStatus,
    });

    setConfiguracoes(getConfiguracoes());
    setUltimaAtualizacao(`Hoje, ${formatarHoraAtual()}`);
    setFeedback(
      `${importadora.nome} foi ${
        proximoStatus === "ATIVA" ? "ativada" : "inativada"
      }.`,
    );
  }

  function excluirImportadora(importadora: ImportadoraConfig) {
    const confirmou = window.confirm(
      `Deseja excluir a importadora "${importadora.nome}"?`,
    );

    if (!confirmou) {
      return;
    }

    removerImportadora(importadora.id);
    setConfiguracoes(getConfiguracoes());
    setUltimaAtualizacao(`Hoje, ${formatarHoraAtual()}`);
    setFeedback("Importadora excluída com sucesso.");
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

          <Link href="/admin/importadoras" className={styles.menuItemActive}>
            <BuildingIcon />
            Importadoras
          </Link>

          {podeGerenciar && (
            <Link href="/admin/configuracoes" className={styles.menuItem}>
              <ConfigIcon />
              Configurações
            </Link>
          )}

          <Link href="/" className={styles.menuItem}>
            <HomeIcon />
            Página Principal
          </Link>
        </nav>

        <div className={styles.sidebarInfo}>
          <LinkIcon />
          <h2>{operador ? "Acesso de Operador" : "Como funciona?"}</h2>
          <p>
            {operador
              ? "Você pode acessar os Links de Cadastramento das importadoras. Alterações são exclusivas dos administradores."
              : "Gerencie as importadoras cadastradas. Edite, ative ou inative, exclua e cadastre novas importadoras."}
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
              placeholder="Buscar importadoras, links ou pedidos..."
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
              <strong>{nomeUsuario}</strong>
              <span>{perfil}</span>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <header className={styles.pageHeading}>
            <h1>Importadoras</h1>
            <p>Gerencie as importadoras cadastradas no sistema.</p>
          </header>

          <section className={styles.metrics}>
            <article>
              <div className={styles.metricIcon}>
                <BuildingIcon />
              </div>
              <div>
                <span>Total de Importadoras</span>
                <strong>{importadoras.length}</strong>
                <p>Cadastradas no sistema</p>
              </div>
            </article>

            <article>
              <div className={styles.metricIcon}>
                <LinkIcon />
              </div>
              <div>
                <span>Ativas</span>
                <strong>{totalAtivas}</strong>
                <p>Links disponíveis</p>
              </div>
            </article>

            <article>
              <div className={styles.metricIcon}>
                <CartIcon />
              </div>
              <div>
                <span>Pedidos no mês</span>
                <strong>{totalPedidos}</strong>
                <p>Recebidos pelas importadoras</p>
              </div>
            </article>

            <article>
              <div className={styles.metricIcon}>
                <RefreshIcon />
              </div>
              <div>
                <span>Última atualização</span>
                <strong className={styles.updateMetric}>Hoje</strong>
                <p>{ultimaAtualizacao}</p>
              </div>
            </article>
          </section>

          {feedback && <p className={styles.feedback}>{feedback}</p>}

          <article className={styles.tableCard}>
            <header className={styles.tableHeader}>
              <div className={styles.tableTitle}>
                <BuildingIcon />
                <div>
                  <h2>Lista de Importadoras</h2>
                  <p>
                    {operador
                      ? "Acesse os Links de Cadastramento disponíveis."
                      : "Cadastre e gerencie os Links de Cadastramento internos."}
                  </p>
                </div>
              </div>

              <div className={styles.tableTools}>
                {podeGerenciar && (
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={abrirNovaImportadora}
                  >
                    <PlusIcon />
                    Adicionar Importadora
                  </button>
                )}

                <label className={styles.tableSearch}>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar importadora..."
                  />
                  <SearchIcon />
                </label>
              </div>
            </header>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Importadora</th>
                    <th>Link de Cadastramento</th>
                    <th>Status</th>
                    <th>Pedidos no mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {importadorasFiltradas.map((importadora, index) => {
                    const pedidosDaImportadora =
                      ranking.find((item) => item.id === importadora.id)
                        ?.total || 0;

                    return (
                      <tr key={importadora.id}>
                        <td>{index + 1}</td>

                        <td>
                          <div className={styles.importadoraCell}>
                            <span>{getInitials(importadora.nome)}</span>
                            <strong>{importadora.nome}</strong>
                          </div>
                        </td>

                        <td>
                          <button
                            type="button"
                            className={styles.linkPreview}
                            onClick={() => abrirLink(importadora)}
                            title="Abrir Link de Cadastramento"
                          >
                            {normalizarLink(importadora.b2bUrl)}
                          </button>
                        </td>

                        <td>
                          <span
                            className={
                              importadora.status === "ATIVA"
                                ? styles.activeStatus
                                : styles.inactiveStatus
                            }
                          >
                            {importadora.status === "ATIVA"
                              ? "Ativa"
                              : "Inativa"}
                          </span>
                        </td>

                        <td>{pedidosDaImportadora}</td>

                        <td>
                          <div className={styles.actions}>
                            <button
                              type="button"
                              className={styles.accessButton}
                              onClick={() => abrirLink(importadora)}
                              title="Acessar Link de Cadastramento"
                            >
                              <ExternalIcon />
                              <span>Acessar</span>
                            </button>

                            {podeGerenciar && (
                              <>
                                <button
                                  type="button"
                                  className={styles.iconButton}
                                  onClick={() => abrirEdicao(importadora)}
                                  title="Editar importadora"
                                  aria-label={`Editar ${importadora.nome}`}
                                >
                                  <PencilIcon />
                                </button>

                                <button
                                  type="button"
                                  className={styles.iconButtonToggle}
                                  onClick={() => alternarStatus(importadora)}
                                  title={
                                    importadora.status === "ATIVA"
                                      ? "Inativar importadora"
                                      : "Ativar importadora"
                                  }
                                  aria-label={
                                    importadora.status === "ATIVA"
                                      ? `Inativar ${importadora.nome}`
                                      : `Ativar ${importadora.nome}`
                                  }
                                >
                                  <ToggleIcon />
                                </button>

                                <button
                                  type="button"
                                  className={styles.iconButtonDelete}
                                  onClick={() =>
                                    excluirImportadora(importadora)
                                  }
                                  title="Excluir importadora"
                                  aria-label={`Excluir ${importadora.nome}`}
                                >
                                  <TrashIcon />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {importadorasFiltradas.length === 0 && (
                    <tr>
                      <td colSpan={6} className={styles.emptyState}>
                        Nenhuma importadora encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className={styles.tableFooter}>
              <span>
                Mostrando {importadorasFiltradas.length} de{" "}
                {importadoras.length} importadoras
              </span>

              <div>
                <button type="button">‹</button>
                <button type="button" className={styles.pageActive}>
                  1
                </button>
                <button type="button">›</button>
              </div>
            </footer>
          </article>

          <article className={styles.performanceCard}>
            <header>
              <div className={styles.performanceTitle}>
                <RefreshIcon />
                <div>
                  <h2>Resumo de desempenho</h2>
                  <p>Pedidos recebidos pelas importadoras no período.</p>
                </div>
              </div>
            </header>

            <div className={styles.performanceContent}>
              <div className={styles.performanceNumbers}>
                {ranking.slice(0, 3).map((item) => (
                  <div key={item.id}>
                    <span>{item.nome}</span>
                    <strong>{item.total}</strong>
                    <small>
                      {totalPedidos > 0
                        ? `${((item.total / totalPedidos) * 100).toFixed(1)}% do total`
                        : "0% do total"}
                    </small>
                  </div>
                ))}

                {ranking.length === 0 && (
                  <p className={styles.emptyPerformance}>
                    Ainda não há importadoras cadastradas.
                  </p>
                )}
              </div>

              <div className={styles.performanceBars}>
                {ranking.map((item) => (
                  <div className={styles.barRow} key={item.id}>
                    <span>{item.nome}</span>
                    <div>
                      <b
                        style={{
                          width: `${Math.max(
                            5,
                            (item.total / maiorTotal) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                    <strong>{item.total}</strong>
                  </div>
                ))}
              </div>
            </div>

            <footer className={styles.performanceFooter}>
              <CartIcon />
              <span>Total de pedidos no mês</span>
              <strong>{totalPedidos}</strong>
            </footer>
          </article>
        </div>
      </section>

      {modalAberto && podeGerenciar && (
        <div className={styles.modalBackdrop}>
          <form className={styles.modal} onSubmit={salvarImportadora}>
            <header>
              <div>
                <h2>
                  {rascunho.id
                    ? "Editar Importadora"
                    : "Adicionar Importadora"}
                </h2>
                <p>
                  Cadastre o Link de Cadastramento que aparecerá no painel.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                aria-label="Fechar"
              >
                <CloseIcon />
              </button>
            </header>

            <label className={styles.field}>
              <span>Nome da importadora</span>
              <input
                value={rascunho.nome}
                onChange={(event) =>
                  setRascunho((atual) => ({
                    ...atual,
                    nome: event.target.value,
                  }))
                }
                placeholder="Ex.: Nova Importadora"
              />
            </label>

            <label className={styles.field}>
              <span>Link de Cadastramento</span>
              <input
                value={rascunho.b2bUrl}
                onChange={(event) =>
                  setRascunho((atual) => ({
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
                value={rascunho.status}
                onChange={(event) =>
                  setRascunho((atual) => ({
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
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </button>

              <button type="submit" className={styles.saveButton}>
                <SaveIcon />
                Salvar
              </button>
            </footer>
          </form>
        </div>
      )}
    </main>
  );
}
