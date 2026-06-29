"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pedido, PedidoStatus, getStatusLabel } from "../pedidos-data";
import {
  PEDIDOS_UPDATED_EVENT,
  atualizarStatusPedidoNoServidor,
  carregarPedidosDoServidor,
  getPedidos,
} from "../pedidos-storage";
import styles from "./em-andamento.module.css";

type UsuarioLogado = {
  nome?: string;
  perfil?: string;
};


const importadoras = [
  "Inovare Representações",
  "Importadora KonTudo",
  "Kontudo Surf",
  "Importadora do Cunha",
  "SC Fashion",
];

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
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
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


function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <path d="M12 7h.01" />
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

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function ManualIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h9l3 3v17H6z" />
      <path d="M14 2v5h4" />
      <path d="M9 11h6M9 15h6M9 19h4" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatShortDate(date: string) {
  return date.replace(" ", "\n");
}

export default function PedidosEmAndamentoPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("Admin Global SC");
  const [perfilUsuario, setPerfilUsuario] = useState("Administrador");

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const pedidosDoServidor = await carregarPedidosDoServidor();
        setPedidos(pedidosDoServidor);
        setFeedback("");
      } catch (error) {
        setPedidos(getPedidos());
        setFeedback(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os pedidos do servidor.",
        );
      }

      try {
        const usuarioSalvo = window.localStorage.getItem(
          "global-sc-usuario-logado",
        );

        if (usuarioSalvo) {
          const usuario = JSON.parse(usuarioSalvo) as UsuarioLogado;
          setNomeUsuario(usuario.nome || "Admin Global SC");
          setPerfilUsuario(usuario.perfil || "Administrador");
        }
      } catch {
        setNomeUsuario("Admin Global SC");
        setPerfilUsuario("Administrador");
      }
    }

    function atualizarPedidos() {
      void carregarPedidos();
    }

    void carregarPedidos();

    window.addEventListener(PEDIDOS_UPDATED_EVENT, atualizarPedidos);
    window.addEventListener("storage", atualizarPedidos);

    return () => {
      window.removeEventListener(PEDIDOS_UPDATED_EVENT, atualizarPedidos);
      window.removeEventListener("storage", atualizarPedidos);
    };
  }, []);

  const pedidosEmAndamento = useMemo(() => {
    const busca = search.trim().toLowerCase();

    return pedidos.filter((pedido) => {
      const correspondeBusca =
        !busca ||
        pedido.cliente.toLowerCase().includes(busca) ||
        pedido.assunto.toLowerCase().includes(busca) ||
        pedido.importadora.toLowerCase().includes(busca) ||
        pedido.email.toLowerCase().includes(busca) ||
        pedido.numero.toLowerCase().includes(busca) ||
        (pedido.responsavel || "").toLowerCase().includes(busca);

      return pedido.status === "EM_ANDAMENTO" && correspondeBusca;
    });
  }, [pedidos, search]);

  const totalPedidos = pedidos.length;
  const emAndamento = pedidos.filter(
    (pedido) => pedido.status === "EM_ANDAMENTO",
  ).length;
  const finalizados = pedidos.filter(
    (pedido) => pedido.status === "FINALIZADO",
  ).length;

  const isOperador = perfilUsuario.toLowerCase().includes("operador");

  async function handleStatusChange(
    event: ChangeEvent<HTMLSelectElement>,
    pedido: Pedido,
  ) {
    event.stopPropagation();

    const novoStatus = event.target.value as PedidoStatus;

    if (novoStatus === pedido.status) {
      return;
    }

    try {
      await atualizarStatusPedidoNoServidor(pedido.id, novoStatus);
      setPedidos(getPedidos());

      if (novoStatus === "FINALIZADO") {
        setFeedback(`O pedido ${pedido.numero} foi movido para Finalizados.`);
      }

      if (novoStatus === "RECEBIDO") {
        setPedidos((pedidosAtuais) =>
          pedidosAtuais.filter((item) => item.id !== pedido.id),
        );

        window.location.href = "/admin/pedidos";
        return;
      }
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o status do pedido.",
      );
    }
  }

  function abrirPedido(pedidoId: string) {
    window.location.href = `/admin/pedidos/${pedidoId}`;
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTableRowElement>,
    pedidoId: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirPedido(pedidoId);
    }
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logoBox}>
          <Image
            src="/global-sc-logo.png"
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
            className={styles.menuItemActive}
          >
            <ClockIcon />
            Pedidos em Andamento
            {emAndamento > 0 && <strong>{emAndamento}</strong>}
          </Link>

          <Link href="/admin/pedidos/finalizados" className={styles.menuItem}>
            <CheckIcon />
            Finalizados
          </Link>

          <Link href="/admin/importadoras" className={styles.menuItem}>
            <BuildingIcon />
            Importadoras
          </Link>

          {!isOperador && (
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
          <InfoIcon />

          <h2>Em andamento</h2>

          <p>
            Pedidos em processamento pela equipe. Ao marcar como{" "}
            <b>Finalizado</b>, o pedido é transferido automaticamente para a
            aba Finalizados.
          </p>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
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
              <span>0</span>
            </button>

            <div className={styles.avatar}>
              <UserIcon />
            </div>

            <div className={styles.profileText}>
              <strong>{nomeUsuario}</strong>
              <span>{perfilUsuario}</span>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <section className={styles.metrics}>
            <article>
              <div className={styles.metricIcon}>
                <FileIcon />
              </div>

              <div>
                <span>Total de Pedidos</span>
                <strong>{totalPedidos}</strong>
                <p>Todos os pedidos recebidos</p>
              </div>
            </article>

            <article>
              <div className={styles.metricIcon}>
                <ClockIcon />
              </div>

              <div>
                <span>Em andamento</span>
                <strong>{emAndamento}</strong>
                <p>Pedidos em processamento</p>
              </div>
            </article>

            <article>
              <div className={styles.metricIcon}>
                <CheckIcon />
              </div>

              <div>
                <span>Finalizados</span>
                <strong>{finalizados}</strong>
                <p>Pedidos concluídos</p>
              </div>
            </article>

            <article>
              <div className={styles.metricIcon}>
                <HomeIcon />
              </div>

              <div>
                <span>Página Mais Acessada</span>
                <strong>Página Principal</strong>
                <p>/pagina-principal</p>
              </div>
            </article>
          </section>

          <section className={styles.grid}>
            <div className={styles.mainColumn}>
              <article className={styles.ordersCard}>
                <header className={styles.ordersHeader}>
                  <div className={styles.ordersTitle}>
                    <ClockIcon />

                    <div>
                      <h1>Pedidos em Andamento</h1>
                      <p>Pedidos que estão sendo processados pela equipe.</p>
                    </div>
                  </div>

                  <div className={styles.headerActions}>
                    <div className={styles.formatosAceitos}>
                      <span>Aceita:</span>
                      <b className={styles.pdf}>PDF</b>
                      <b className={styles.jpg}>JPG</b>
                      <b className={styles.png}>PNG</b>
                      <b className={styles.messageBadge}>Mensagem</b>
                    </div>
                  </div>
                </header>

                <div className={styles.notice}>
                  <InfoIcon />

                  <p>
                    Quando o atendimento for concluído, marque o pedido como{" "}
                    <b>Finalizado</b>. Ele será removido desta lista e enviado
                    automaticamente para a aba Finalizados.
                  </p>
                </div>

                {feedback && <p className={styles.feedback}>{feedback}</p>}

                <div className={styles.tableControls}>
                  <button type="button">Todos em andamento</button>
                  <button type="button">Mais recentes</button>
                </div>

                <div className={styles.tableWrapper}>
                  <table>
                    <thead>
                      <tr>
                        <th>Cliente / Remetente</th>
                        <th>Assunto</th>
                        <th>Responsável</th>
                        <th>Anexos</th>
                        <th>Origem</th>
                        <th>Data</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pedidosEmAndamento.map((pedido) => (
                        <tr
                          key={pedido.id}
                          className={styles.orderRow}
                          tabIndex={0}
                          onClick={() => abrirPedido(pedido.id)}
                          onKeyDown={(event) => handleKeyDown(event, pedido.id)}
                        >
                          <td>
                            <div className={styles.clientCell}>
                              <span>{getInitials(pedido.cliente)}</span>

                              <div>
                                <strong>{pedido.cliente}</strong>
                                <small>{pedido.email}</small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className={styles.subject}>
                              <i />
                              {pedido.assunto}
                            </span>
                          </td>

                          <td>
                            <span className={styles.responsavel}>
                              <UserIcon />
                              {pedido.responsavel || "Admin Global SC"}
                            </span>
                          </td>

                          <td>
                            <div className={styles.attachments}>
                              {pedido.anexos.slice(0, 3).map((anexo) => (
                                <span key={anexo.id}>{anexo.tipo}</span>
                              ))}

                              {pedido.anexos.length === 0 && (
                                <small>Sem anexos</small>
                              )}
                            </div>
                          </td>

                          <td>
                            <span className={styles.origin}>
                              {pedido.origem === "SITE" ? (
                                <GlobeIcon />
                              ) : (
                                <ManualIcon />
                              )}
                              {pedido.origem === "SITE" ? "Site" : "Manual"}
                            </span>
                          </td>

                          <td className={styles.dateCell}>
                            {formatShortDate(pedido.dataFormatada)}
                          </td>

                          <td
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            <select
                              className={styles.statusSelect}
                              value={pedido.status}
                              onChange={(event) =>
                                void handleStatusChange(event, pedido)
                              }
                            >
                              <option value="EM_ANDAMENTO">
                                {getStatusLabel("EM_ANDAMENTO")}
                              </option>
                              <option value="FINALIZADO">
                                {getStatusLabel("FINALIZADO")}
                              </option>
                              <option value="RECEBIDO">
                                Voltar para Pedidos
                              </option>
                            </select>
                          </td>
                        </tr>
                      ))}

                      {pedidosEmAndamento.length === 0 && (
                        <tr>
                          <td colSpan={7} className={styles.emptyState}>
                            Nenhum pedido está em andamento no momento.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <footer className={styles.tableFooter}>
                  <span>
                    Mostrando {pedidosEmAndamento.length} de {emAndamento}{" "}
                    pedidos em andamento
                  </span>

                  <div>
                    <button type="button">‹</button>
                    <button type="button" className={styles.pageActive}>
                      1
                    </button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                    <button type="button">›</button>
                  </div>
                </footer>
              </article>
            </div>

            <aside className={styles.rightColumn}>
              <article className={styles.importersCard}>
                <div className={styles.importersTitle}>
                  <LinkIcon />

                  <div>
                    <h2>Links das Importadoras</h2>
                    <p>Cadastre os links em Configurações.</p>
                  </div>
                </div>

                <div className={styles.importersList}>
                  {importadoras.map((importadora) => (
                    <Link
                      href="/admin/configuracoes"
                      key={importadora}
                      title="Cadastrar link em Configurações"
                    >
                      {importadora}
                      <ExternalIcon />
                    </Link>
                  ))}
                </div>
              </article>

              <article className={styles.importantCard}>
                <InfoIcon />

                <div>
                  <h2>Importante</h2>

                  <p>
                    Administradores podem trabalhar os pedidos como operadores:
                    assumir, encaminhar, responder, marcar como em andamento e
                    finalizar.
                  </p>
                </div>
              </article>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}
