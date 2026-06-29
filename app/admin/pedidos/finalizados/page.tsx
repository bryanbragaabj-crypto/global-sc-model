"use client";

import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { Pedido } from "../pedidos-data";
import {
  PEDIDOS_UPDATED_EVENT,
  atualizarStatusPedido,
  getPedidos,
} from "../pedidos-storage";
import styles from "./finalizados.module.css";

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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v13H4z" />
      <path d="M3 4h18v4H3z" />
      <path d="M9 12h6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6a12 12 0 1 0 14.2-18.9ZM12.1 21.9a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a10 10 0 1 1 8.4 4.6Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6a9.5 9.5 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
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

function formatDateOnly(value: string) {
  const [date] = value.split(" ");
  return date || "—";
}

function formatTimeOnly(value: string) {
  const [, time] = value.split(" ");
  return time || "—";
}

function telefoneParaWhatsApp(telefone?: string) {
  const numeros = (telefone || "5548920703577").replace(/\D/g, "");

  if (numeros.startsWith("55")) {
    return numeros;
  }

  return `55${numeros}`;
}

export default function PedidosFinalizadosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("Admin Global SC");
  const [perfilUsuario, setPerfilUsuario] = useState("Administrador");

  useEffect(() => {
    function carregarPedidos() {
      setPedidos(getPedidos());

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

    carregarPedidos();

    window.addEventListener(PEDIDOS_UPDATED_EVENT, carregarPedidos);
    window.addEventListener("storage", carregarPedidos);

    return () => {
      window.removeEventListener(PEDIDOS_UPDATED_EVENT, carregarPedidos);
      window.removeEventListener("storage", carregarPedidos);
    };
  }, []);

  const pedidosFinalizados = useMemo(() => {
    const busca = search.trim().toLowerCase();

    return pedidos.filter((pedido) => {
      if (pedido.status !== "FINALIZADO") {
        return false;
      }

      if (!busca) {
        return true;
      }

      return [
        pedido.numero,
        pedido.cliente,
        pedido.email,
        pedido.importadora,
        pedido.assunto,
        pedido.responsavel || "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(busca);
    });
  }, [pedidos, search]);

  const emAndamento = pedidos.filter(
    (pedido) => pedido.status === "EM_ANDAMENTO",
  ).length;

  const recebidos = pedidos.filter(
    (pedido) => pedido.status === "RECEBIDO",
  ).length;

  const isOperador = perfilUsuario.toLowerCase().includes("operador");

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

  function reabrirPedido(pedido: Pedido) {
    atualizarStatusPedido(pedido.id, "EM_ANDAMENTO");
    setPedidos(getPedidos());
    setFeedback(
      `Pedido ${pedido.numero} reaberto e transferido para Pedidos em Andamento.`,
    );
  }

  function exportarHistorico() {
    const linhas = [
      [
        "Pedido",
        "Cliente",
        "Importadora",
        "Assunto",
        "Data de entrada",
        "Responsável",
        "Status",
      ],
      ...pedidosFinalizados.map((pedido) => [
        pedido.numero,
        pedido.cliente,
        pedido.importadora,
        pedido.assunto,
        pedido.dataFormatada,
        pedido.responsavel || "Admin Global SC",
        "Finalizado",
      ]),
    ];

    const csv = linhas
      .map((linha) =>
        linha
          .map((coluna) => `"${String(coluna).replace(/"/g, '""')}"`)
          .join(";"),
      )
      .join("\n");

    const arquivo = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = "pedidos-finalizados-global-sc.csv";
    link.click();

    URL.revokeObjectURL(url);
    setFeedback("Relatório de pedidos finalizados exportado com sucesso.");
  }

  function informarArquivamento() {
    setFeedback(
      "Os pedidos finalizados já ficam arquivados automaticamente no histórico.",
    );
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
            className={styles.menuItem}
          >
            <ClockIcon />
            Pedidos em Andamento
            {emAndamento > 0 && <strong>{emAndamento}</strong>}
          </Link>

          <Link
            href="/admin/pedidos/finalizados"
            className={styles.menuItemActive}
          >
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
          <span className={styles.question}>?</span>

          <h2>Como funciona?</h2>

          <p>
            Ao finalizar o pedido, envie mensagem ao cliente no WhatsApp e,
            depois, marque como finalizado no certinho ao lado.
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
          <header className={styles.pageHeading}>
            <h1>Finalizados</h1>
            <p>Visualize os pedidos concluídos e arquivados.</p>
          </header>

          <section className={styles.metrics}>
            <article>
              <div className={styles.metricIcon}>
                <CheckIcon />
              </div>

              <div>
                <span>Finalizados no histórico</span>
                <strong>{pedidosFinalizados.length}</strong>
                <p>Pedidos concluídos</p>
              </div>
            </article>

            <article>
              <div className={styles.metricIcon}>
                <CalendarIcon />
              </div>

              <div>
                <span>Concluídos no período</span>
                <strong>{pedidosFinalizados.length}</strong>
                <p>Pedidos filtrados nesta tela</p>
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
                <StarIcon />
              </div>

              <div>
                <span>Pedidos recebidos</span>
                <strong>{recebidos}</strong>
                <p>Aguardando atendimento</p>
              </div>
            </article>
          </section>

          <section className={styles.layout}>
            <div className={styles.mainColumn}>
              <article className={styles.ordersCard}>
                <header className={styles.ordersHeader}>
                  <div className={styles.ordersTitle}>
                    <CheckIcon />

                    <div>
                      <h2>Pedidos Finalizados</h2>
                      <p>Pedidos concluídos e arquivados.</p>
                    </div>
                  </div>

                  <div className={styles.headerActions}>
                    <button
                      type="button"
                      className={styles.exportButton}
                      onClick={exportarHistorico}
                    >
                      <DownloadIcon />
                      Exportar
                    </button>

                    <button
                      type="button"
                      className={styles.archiveButton}
                      onClick={informarArquivamento}
                    >
                      <ArchiveIcon />
                      Arquivar
                    </button>
                  </div>
                </header>

                {feedback && <p className={styles.feedback}>{feedback}</p>}

                <div className={styles.tableWrapper}>
                  <table>
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Importadora</th>
                        <th>Assunto</th>
                        <th>Data de Entrada</th>
                        <th>Data de Conclusão</th>
                        <th>Anexos</th>
                        <th>Responsável</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pedidosFinalizados.map((pedido) => (
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

                          <td>{pedido.importadora}</td>

                          <td>
                            <strong className={styles.subject}>
                              {pedido.assunto}
                            </strong>
                            <small className={styles.subjectDetail}>
                              Pedido concluído
                            </small>
                          </td>

                          <td>
                            <span className={styles.dateCell}>
                              {formatDateOnly(pedido.dataFormatada)}
                              <small>{formatTimeOnly(pedido.dataFormatada)}</small>
                            </span>
                          </td>

                          <td>
                            <span className={styles.dateCell}>
                              {formatDateOnly(pedido.dataFormatada)}
                              <small>{formatTimeOnly(pedido.dataFormatada)}</small>
                            </span>
                          </td>

                          <td>
                            <div className={styles.attachments}>
                              {pedido.anexos.slice(0, 3).map((anexo) => (
                                <span key={anexo.id}>{anexo.tipo}</span>
                              ))}

                              {pedido.anexos.length > 3 && (
                                <b>+{pedido.anexos.length - 3}</b>
                              )}

                              {pedido.anexos.length === 0 && (
                                <small>Sem anexos</small>
                              )}
                            </div>
                          </td>

                          <td>
                            <span className={styles.responsavel}>
                              {pedido.responsavel || "Admin Global SC"}
                            </span>
                          </td>

                          <td onClick={(event) => event.stopPropagation()}>
                            <div className={styles.statusActions}>
                              <span className={styles.status}>
                                <CheckIcon />
                                Finalizado
                              </span>

                              <a
                                className={styles.whatsappButton}
                                href={`https://wa.me/${telefoneParaWhatsApp(
                                  pedido.telefone,
                                )}?text=${encodeURIComponent(
                                  `Olá, ${pedido.cliente}. Seu pedido ${pedido.numero} foi finalizado pela Global SC.`,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Enviar WhatsApp para ${pedido.cliente}`}
                              >
                                <WhatsAppIcon />
                              </a>

                              <button
                                type="button"
                                className={styles.reopenButton}
                                onClick={() => reabrirPedido(pedido)}
                                title="Reabrir pedido"
                                aria-label={`Reabrir pedido ${pedido.numero}`}
                              >
                                <CheckIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {pedidosFinalizados.length === 0 && (
                        <tr>
                          <td colSpan={8} className={styles.emptyState}>
                            Nenhum pedido finalizado foi encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <footer className={styles.tableFooter}>
                  <span>
                    Mostrando {pedidosFinalizados.length} de{" "}
                    {pedidos.filter((pedido) => pedido.status === "FINALIZADO")
                      .length}{" "}
                    pedidos
                  </span>

                  <div>
                    <button type="button">‹</button>
                    <button type="button" className={styles.pageActive}>
                      1
                    </button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                    <button type="button">…</button>
                    <button type="button">›</button>
                  </div>
                </footer>
              </article>

              <article className={styles.historyCard}>
                <header>
                  <div className={styles.historyTitle}>
                    <ClockIcon />
                    <div>
                      <h2>Histórico de finalizações</h2>
                      <p>Ações recentes de conclusão de pedidos.</p>
                    </div>
                  </div>

                  <button type="button" onClick={exportarHistorico}>
                    Ver todos
                    <ExternalIcon />
                  </button>
                </header>

                <div className={styles.historyList}>
                  {pedidosFinalizados.slice(0, 3).map((pedido) => (
                    <div className={styles.historyItem} key={pedido.id}>
                      <span className={styles.historyCheck}>
                        <CheckIcon />
                      </span>

                      <div className={styles.historyOrder}>
                        <strong>Pedido {pedido.numero} concluído</strong>
                        <small>Cliente: {pedido.cliente}</small>
                      </div>

                      <p>{pedido.assunto}</p>

                      <span className={styles.historyResponsible}>
                        {getInitials(pedido.responsavel || "Admin Global SC")}
                      </span>

                      <span className={styles.historyName}>
                        {pedido.responsavel || "Admin Global SC"}
                      </span>

                      <small className={styles.historyTime}>Concluído</small>
                    </div>
                  ))}

                  {pedidosFinalizados.length === 0 && (
                    <p className={styles.emptyHistory}>
                      O histórico aparecerá aqui após finalizar os pedidos.
                    </p>
                  )}
                </div>
              </article>
            </div>

            <aside className={styles.rightColumn}>
              <article className={styles.importersCard}>
                <div className={styles.importersTitle}>
                  <ExternalIcon />

                  <div>
                    <h2>Links das Importadoras</h2>
                    <p>Acesse e registrar pedidos.</p>
                  </div>
                </div>

                <div className={styles.importersList}>
                  {importadoras.map((importadora) => (
                    <Link href="/admin/importadoras" key={importadora}>
                      {importadora}
                      <ExternalIcon />
                    </Link>
                  ))}
                </div>
              </article>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}
