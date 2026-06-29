"use client";

import Link from "next/link";
import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import {
  Pedido,
  PedidoStatus,
  getOrigemLabel,
  getStatusLabel,
} from "./pedidos-data";
import {
  PEDIDOS_UPDATED_EVENT,
  atualizarStatusPedidoNoServidor,
  carregarPedidosDoServidor,
  getPedidos,
} from "./pedidos-storage";
import styles from "./pedidos.module.css";

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
      <path d="M15 9h3M9 12h3M9 16h3" />
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

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 7.2h.01" />
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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [busca, setBusca] = useState("");
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

  const recebidos = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return pedidos.filter((pedido) => {
      if (pedido.status !== "RECEBIDO") {
        return false;
      }

      if (!termo) {
        return true;
      }

      return [
        pedido.numero,
        pedido.cliente,
        pedido.email,
        pedido.assunto,
        pedido.importadora,
        pedido.origem,
      ]
        .join(" ")
        .toLowerCase()
        .includes(termo);
    });
  }, [busca, pedidos]);

  const emAndamento = pedidos.filter(
    (pedido) => pedido.status === "EM_ANDAMENTO",
  ).length;

  const finalizados = pedidos.filter(
    (pedido) => pedido.status === "FINALIZADO",
  ).length;

  const isOperador = perfilUsuario.toLowerCase().includes("operador");

  function abrirPedido(id: string) {
    window.location.href = `/admin/pedidos/${id}`;
  }

  function pressionarLinha(
    event: KeyboardEvent<HTMLTableRowElement>,
    pedidoId: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirPedido(pedidoId);
    }
  }

  async function mudarStatus(pedidoId: string, status: PedidoStatus) {
    try {
      await atualizarStatusPedidoNoServidor(pedidoId, status);
      setPedidos(getPedidos());

      if (status === "EM_ANDAMENTO") {
        setFeedback("Pedido movido para Pedidos em Andamento.");
      }

      if (status === "FINALIZADO") {
        setFeedback("Pedido movido para Finalizados.");
      }

      if (status === "RECEBIDO") {
        setFeedback("Pedido movido para Pendentes.");
      }
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o status do pedido.",
      );
    }
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logoBox}>
          <img
            src="/global-sc-logo.png"
            alt="Global SC Fábricas e Importadora"
            className={styles.logo}
          />
        </div>

        <nav className={styles.menu} aria-label="Navegação administrativa">
          <Link href="/admin/painel" className={styles.menuItem}>
            <HomeIcon />
            Dashboard
          </Link>

          <Link href="/admin/pedidos" className={styles.menuItemActive}>
            <MailIcon />
            Pedidos
          </Link>

          <Link href="/admin/pedidos/em-andamento" className={styles.menuItem}>
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
          <h2>Importante</h2>
          <p>
            As mensagens ficam disponíveis somente quando o pedido é aberto.
            Ao alterar o status, o pedido é movido automaticamente para a aba
            correspondente.
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
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
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
                <MailIcon />
              </div>
              <div>
                <span>Total de Pedidos</span>
                <strong>{pedidos.length}</strong>
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
                <strong className={styles.metricText}>Página Principal</strong>
                <p>/pagina-principal</p>
              </div>
            </article>
          </section>

          <section className={styles.layout}>
            <article className={styles.ordersCard}>
              <header className={styles.ordersHeader}>
                <div className={styles.ordersTitle}>
                  <MailIcon />
                  <div>
                    <h1>Pedidos</h1>
                    <p>Lista inicial de pedidos recebidos.</p>
                  </div>
                </div>

                <Link
                 href="/pedido?origem=admin&retorno=/admin/pedidos"
                  className={styles.addButton}
                >
                  <PlusIcon />
                  Adicionar Pedido
                </Link>
              </header>

              <div className={styles.notice}>
                <InfoIcon />
                <p>
                  O responsável pelo pedido define o status. Ao selecionar{" "}
                  <b>“Em andamento”</b> ou <b>“Finalizado”</b>, o pedido é
                  movido automaticamente para a pasta de destino e removido
                  desta lista.
                </p>
              </div>

              {feedback && <p className={styles.feedback}>{feedback}</p>}

              <div className={styles.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      <th>Cliente / Remetente</th>
                      <th>Assunto</th>
                      <th>Anexos</th>
                      <th>Origem</th>
                      <th>Data</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recebidos.map((pedido) => (
                      <tr
                        key={pedido.id}
                        className={styles.orderRow}
                        tabIndex={0}
                        onClick={() => abrirPedido(pedido.id)}
                        onKeyDown={(event) =>
                          pressionarLinha(event, pedido.id)
                        }
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
                          <strong className={styles.subject}>
                            {pedido.assunto}
                          </strong>
                          <small className={styles.subjectHint}>
                            Clique para abrir o pedido
                          </small>
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
                            {getOrigemLabel(pedido.origem)}
                          </span>
                        </td>

                        <td>{pedido.dataFormatada}</td>

                        <td onClick={(event) => event.stopPropagation()}>
                          <select
                            value={pedido.status}
                            className={styles.statusSelect}
                            onChange={(event) =>
                              void mudarStatus(
                                pedido.id,
                                event.target.value as PedidoStatus,
                              )
                            }
                            aria-label={`Status do pedido ${pedido.numero}`}
                          >
                            <option value="RECEBIDO">
                              {getStatusLabel("RECEBIDO")}
                            </option>
                            <option value="EM_ANDAMENTO">
                              {getStatusLabel("EM_ANDAMENTO")}
                            </option>
                            <option value="FINALIZADO">
                              {getStatusLabel("FINALIZADO")}
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}

                    {recebidos.length === 0 && (
                      <tr>
                        <td colSpan={6} className={styles.emptyState}>
                          Nenhum pedido recebido foi encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <footer className={styles.tableFooter}>
                <span>
                  Mostrando {recebidos.length} de{" "}
                  {pedidos.filter((pedido) => pedido.status === "RECEBIDO").length}{" "}
                  pedidos
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

            <aside className={styles.sideColumn}>
              <article className={styles.linksCard}>
                <div className={styles.linksTitle}>
                  <ExternalIcon />
                  <div>
                    <h2>Links das Importadoras</h2>
                    <p>Acesse e registrar pedidos.</p>
                  </div>
                </div>

                <div className={styles.linksList}>
                  {importadoras.map((importadora) => (
                    <Link href="/admin/importadoras" key={importadora}>
                      {importadora}
                      <ExternalIcon />
                    </Link>
                  ))}
                </div>
              </article>

              <article className={styles.helpCard}>
                <InfoIcon />
                <h2>Importante</h2>
                <p>
                  Você define o status do pedido. Ao selecionar{" "}
                  <b>“Em andamento”</b> ou <b>“Finalizado”</b>, ele é movido
                  automaticamente para a pasta de destino.
                </p>
              </article>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}
