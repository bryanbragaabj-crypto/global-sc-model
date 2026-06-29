"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Pedido } from "../pedidos/pedidos-data";
import {
  PEDIDOS_UPDATED_EVENT,
  getPedidos,
} from "../pedidos/pedidos-storage";
import styles from "./painel.module.css";

type UsuarioLogado = {
  nome?: string;
  perfil?: string;
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

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
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

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.2-5.6 9.5-5.6S21.5 12 21.5 12s-3.2 5.6-9.5 5.6S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
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

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
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

function getPedidoDate(pedido: Pedido) {
  return pedido.criadoEm || pedido.dataFormatada;
}

export default function PainelPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [busca, setBusca] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("Admin Global SC");
  const [perfilUsuario, setPerfilUsuario] = useState("Administrador");

  useEffect(() => {
    function carregarDados() {
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

    carregarDados();

    window.addEventListener(PEDIDOS_UPDATED_EVENT, carregarDados);
    window.addEventListener("storage", carregarDados);

    return () => {
      window.removeEventListener(PEDIDOS_UPDATED_EVENT, carregarDados);
      window.removeEventListener("storage", carregarDados);
    };
  }, []);

  const isOperador = perfilUsuario.toLowerCase().includes("operador");

  const totalPedidos = pedidos.length;
  const emAndamento = pedidos.filter(
    (pedido) => pedido.status === "EM_ANDAMENTO",
  ).length;
  const finalizados = pedidos.filter(
    (pedido) => pedido.status === "FINALIZADO",
  ).length;

  const pedidosSite = useMemo(
    () =>
      pedidos
        .filter((pedido) => pedido.origem === "SITE")
        .sort((a, b) => getPedidoDate(b).localeCompare(getPedidoDate(a))),
    [pedidos],
  );

  const atividadesRecentes = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return pedidos
      .filter((pedido) => {
        if (!termo) {
          return true;
        }

        return [
          pedido.numero,
          pedido.cliente,
          pedido.email,
          pedido.assunto,
          pedido.importadora,
        ]
          .join(" ")
          .toLowerCase()
          .includes(termo);
      })
      .sort((a, b) => getPedidoDate(b).localeCompare(getPedidoDate(a)))
      .slice(0, 5);
  }, [busca, pedidos]);

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

        <nav className={styles.menu} aria-label="Navegação administrativa">
          <Link href="/admin/painel" className={styles.menuItemActive}>
            <HomeIcon />
            Dashboard
          </Link>

          <Link href="/admin/pedidos" className={styles.menuItem}>
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
          <h2>Operação iniciada</h2>
          <p>
            Ainda não há movimentações registradas. Os indicadores serão
            atualizados automaticamente conforme chegarem pedidos.
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
          <header className={styles.pageHeading}>
            <h1>Dashboard</h1>
            <p>Visão geral completa da operação e acompanhamento dos pedidos.</p>
          </header>

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
                <EyeIcon />
              </div>

              <div>
                <span>Página Mais Acessada</span>
                <strong className={styles.noDataTitle}>Sem dados</strong>
                <p>Nenhum acesso registrado</p>
              </div>
            </article>
          </section>

          <section className={styles.addOrderCard}>
            <div className={styles.addOrderIcon}>
              <PlusIcon />
            </div>

            <div className={styles.addOrderContent}>
              <h2>Adicionar Pedido</h2>
              <p>
                Envie as informações do pedido através dos formatos aceitos
                abaixo.
              </p>

              <div className={styles.formats}>
                <span>Formatos aceitos:</span>

                <div>
                  <b className={styles.pdf}>PDF</b>
                  <b className={styles.jpg}>JPG</b>
                  <b className={styles.png}>PNG</b>
                  <b className={styles.message}>Mensagem</b>
                </div>
              </div>
            </div>

            <Link
              href="/pedido?retorno=/admin/pedidos"
              className={styles.addOrderButton}
            >
              <PlusIcon />
              Novo Pedido
            </Link>
          </section>

          <section className={styles.grid}>
            <article className={styles.card}>
              <header className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <GlobeIcon />

                  <div>
                    <h2>Pedidos vindos da página inicial do site</h2>
                    <p>
                      Pedidos recebidos através do formulário da página inicial
                      do site.
                    </p>
                  </div>
                </div>

                <Link href="/admin/pedidos" className={styles.cardLink}>
                  Ver todos os pedidos
                </Link>
              </header>

              {pedidosSite.length === 0 ? (
                <div className={styles.emptyState}>
                  <GlobeIcon />
                  <h3>Nenhum pedido recebido pelo site</h3>
                  <p>
                    Os pedidos enviados pelo formulário público aparecerão
                    automaticamente aqui.
                  </p>
                </div>
              ) : (
                <div className={styles.ordersList}>
                  {pedidosSite.slice(0, 4).map((pedido) => (
                    <Link
                      href={`/admin/pedidos/${pedido.id}`}
                      className={styles.orderItem}
                      key={pedido.id}
                    >
                      <span className={styles.orderInitials}>
                        {getInitials(pedido.cliente)}
                      </span>

                      <div>
                        <strong>{pedido.cliente}</strong>
                        <small>{pedido.assunto}</small>
                      </div>

                      <time>{pedido.dataFormatada}</time>
                    </Link>
                  ))}
                </div>
              )}
            </article>

            <article className={styles.card}>
              <header className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <ClockIcon />

                  <div>
                    <h2>Atividades recentes</h2>
                    <p>Últimas movimentações registradas no sistema.</p>
                  </div>
                </div>
              </header>

              {atividadesRecentes.length === 0 ? (
                <div className={styles.emptyState}>
                  <ClockIcon />
                  <h3>Nenhuma movimentação registrada</h3>
                  <p>
                    Quando novos pedidos forem enviados ou atualizados, o
                    histórico aparecerá aqui.
                  </p>
                </div>
              ) : (
                <div className={styles.ordersList}>
                  {atividadesRecentes.map((pedido) => (
                    <Link
                      href={`/admin/pedidos/${pedido.id}`}
                      className={styles.orderItem}
                      key={pedido.id}
                    >
                      <span className={styles.orderInitials}>
                        {pedido.numero.slice(-2)}
                      </span>

                      <div>
                        <strong>{pedido.numero}</strong>
                        <small>{pedido.assunto}</small>
                      </div>

                      <time>{pedido.dataFormatada}</time>
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </section>

          <section className={styles.emptyOverview}>
            <InfoIcon />

            <div>
              <h2>Sistema sem movimentações</h2>
              <p>
                Todos os dados demonstrativos foram removidos. O painel será
                preenchido somente com pedidos reais a partir de agora.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
