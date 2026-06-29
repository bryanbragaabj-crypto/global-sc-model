"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./sobre.module.css";

type SectionId =
  | "sobre-nos"
  | "como-funciona"
  | "missao"
  | "visao"
  | "valores";

type AboutSection = {
  id: SectionId;
  label: string;
  paragraphs: string[];
};

const aboutSections: AboutSection[] = [
  {
    id: "sobre-nos",
    label: "Sobre nós",
    paragraphs: [
      "A GLOBAL SC FÁBRICA E IMPORTADORA ALTO ATACADO é um ecossistema comercial criado para conectar fabricantes, importadores e atacadistas de forma estratégica, organizada e eficiente.",
      "Atuamos como um verdadeiro shopping de alto atacado digital, reunindo marcas, produtos e oportunidades em um único ambiente profissional.",
      "Nosso propósito é aproximar fornecedores e compradores por meio de uma estrutura confiável, que facilita conexões, gera oportunidades de negócio e impulsiona resultados.",
      "Mais do que uma plataforma de vendas, a GLOBAL SC representa conexão, estratégia e crescimento, ajudando empresas a expandirem seus atacados e evoluírem dentro de um mercado cada vez mais digital.",
    ],
  },
  {
    id: "como-funciona",
    label: "Como funciona",
    paragraphs: [
      "A empresa fornecedora passa por uma análise inicial e, após aprovação, integra o ecossistema da Global SC, tornando-se parte do nosso shopping alto atacado digital.",
      "Organizamos a apresentação dos produtos dentro da plataforma, garantindo que sejam exibidos de forma clara, profissional e estratégica, facilitando o acesso dos atacadistas às informações e oportunidades de compra.",
      "Os fabricantes e importadores passam a ter presença dentro do ecossistema da Global SC, aumentando sua visibilidade perante atacadistas e novos parceiros comerciais.",
      "A plataforma facilita o contato entre ambos, promovendo conexões que geram negociações, novas parcerias e crescimento para todos os lados.",
    ],
  },
  {
    id: "missao",
    label: "Missão",
    paragraphs: [
      "Conectar fabricantes e importadores ao mercado atacadista por meio de um ecossistema digital profissional, seguro e estratégico.",
      "Nossa missão é facilitar o acesso a produtos, ampliar a visibilidade dos fornecedores e gerar oportunidades reais de negócios para empresas que atuam no atacado.",
      "Trabalhamos para tornar o processo comercial mais organizado, eficiente e acessível, valorizando a confiança, a clareza e o crescimento sustentável.",
    ],
  },
  {
    id: "visao",
    label: "Visão",
    paragraphs: [
      "Ser referência no Brasil como ecossistema digital de negócios e shopping de alto atacado, reconhecido por conectar fabricantes, importadores e atacadistas de forma eficiente.",
      "Buscamos impulsionar oportunidades comerciais, fortalecer marcas e criar um ambiente estratégico que gere crescimento sustentável para todos os participantes do ecossistema.",
    ],
  },
  {
    id: "valores",
    label: "Valores",
    paragraphs: [
      "° Estratégia: Atuamos com planejamento e visão de mercado para conectar fabricantes, importadores e atacadistas de forma inteligente e eficiente.",
      "° Credibilidade: Construímos relações baseadas em confiança, transparência e responsabilidade entre todos que fazem parte do ecossistema.",
      "° Profissionalismo: Mantemos um padrão elevado de organização, atendimento e posicionamento dentro do ambiente da Global SC.",
      "° Conexões de Valor: Promovemos conexões entre fornecedores e atacadistas que geram oportunidades reais de negócio e crescimento mútuo.",
      "° Crescimento: Trabalhamos para impulsionar marcas, ampliar oportunidades comerciais e gerar evolução constante dentro do mercado digital.",
    ],
  },
];

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.63-.94L14.38 2.8a.5.5 0 0 0-.49-.4h-3.84a.5.5 0 0 0-.49.4l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.66 8.86a.5.5 0 0 0 .12.64l2.03 1.58c-.04.3-.07.62-.07.94s.03.64.07.94L2.78 14.54a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.39 1.04.71 1.63.94l.36 2.54a.5.5 0 0 0 .49.4h3.84a.5.5 0 0 0 .49-.4l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.28-1.65a11.88 11.88 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.18-3.47-8.41ZM12.06 21.8a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.84 9.84 0 0 1-1.52-5.25c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5a9.04 9.04 0 0 1-1.68-2.1c-.18-.3-.02-.46.14-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18v14H3zM4 7l8 6 8-6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6c-2.7-2.2-5.9-2.2-9-1v14c3.1-1.2 6.3-1.2 9 1m0-14c2.7-2.2 5.9-2.2 9-1v14c-3.1-1.2-6.3-1.2-9 1m0-14v14" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h3l2.2 11h9.9l2.3-8H8.3M10 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M4 12h25v20H4zM29 20h8l7 7v5H29zM12 36a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm24 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 26v-4a14 14 0 0 1 28 0v4M10 26h7v11h-7zm21 0h7v11h-7zM31 37c0 4-3 6-8 6h-3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5 40 11v11c0 10-6.8 17.2-16 21-9.2-3.8-16-11-16-21V11zM17 24l5 5 10-11" />
    </svg>
  );
}

export default function SobreNosPage() {
  const [activeSectionId, setActiveSectionId] =
    useState<SectionId>("sobre-nos");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("secao") as SectionId | null;

    if (
      section === "sobre-nos" ||
      section === "como-funciona" ||
      section === "missao" ||
      section === "visao" ||
      section === "valores"
    ) {
      setActiveSectionId(section);
    }
  }, []);

  const activeSection =
    aboutSections.find((section) => section.id === activeSectionId) ??
    aboutSections[0];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerContent}`}>
          <nav className={styles.navigation} aria-label="Navegação principal">
            <a href="/">Início</a>

            <a
              href="/sobre-nos?secao=como-funciona"
              className={
                activeSectionId === "como-funciona"
                  ? styles.navigationActive
                  : ""
              }
              onClick={() => setActiveSectionId("como-funciona")}
            >
              Como Funciona
            </a>

            <a
              href="/sobre-nos"
              className={
                activeSectionId === "sobre-nos"
                  ? styles.navigationActive
                  : ""
              }
              onClick={() => setActiveSectionId("sobre-nos")}
            >
              Sobre Nós
            </a>
          </nav>

          <div className={styles.headerActions}>
            <a className={styles.orderButton} href="/pedido">
              ENVIE SEU PEDIDO CLIQUE AQUI.
            </a>

            <a
              className={styles.adminButton}
              href="/admin"
              aria-label="Abrir área administrativa"
              title="Área administrativa"
            >
              <GearIcon />
            </a>
          </div>
        </div>
      </header>

      {/* MESMO CONTAINER, DIMENSÃO E PROPORÇÃO DA PÁGINA INICIAL */}
      <section className="hero-section">
        <div className="layout-container hero-content">
          <Image
            src="/banner-principal.png"
            alt="Global SC - As Melhores Importadoras"
            width={1825}
            height={862}
            quality={100}
            priority
            className="hero-image"
          />
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={`${styles.container} ${styles.aboutContent}`}>
          <aside className={styles.sideMenu} aria-label="Menu Sobre Nós">
            {aboutSections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`${styles.sideMenuButton} ${
                  activeSectionId === section.id
                    ? styles.sideMenuButtonActive
                    : ""
                }`}
                onClick={() => setActiveSectionId(section.id)}
              >
                {section.label}
                <span />
              </button>
            ))}
          </aside>

          <article className={styles.aboutTextBox}>
            {activeSection.paragraphs.map((paragraph, index) => (
              <p key={`${activeSection.id}-${index}`}>{paragraph}</p>
            ))}
          </article>
        </div>

        <div className={styles.container}>
          <a className={styles.backButton} href="/">
            Voltar
          </a>
        </div>
      </section>

      <section className={styles.quickActions}>
        <div className={`${styles.container} ${styles.quickActionsContent}`}>
          <a href="/duvidas-frequentes">DÚVIDAS FREQUENTES</a>
          <a href="#contato">FALE CONOSCO</a>
          <a href="/trabalhe-conosco">TRABALHE CONOSCO</a>
        </div>
      </section>

      <section className={styles.serviceStrip}>
        <div className={`${styles.container} ${styles.serviceStripContent}`}>
          <article className={styles.serviceCard}>
            <TruckIcon />
            <div>
              <h2>FRETE A COMBINAR:</h2>
              <p>
                FRETE NA REGIÃO DE FLORIANÓPOLIS. OUTRA REGIÃO CONSULTAR VALOR.
              </p>
            </div>
          </article>

          <article className={styles.serviceCard}>
            <HeadsetIcon />
            <div>
              <h2>ATENDIMENTO:</h2>
              <p>DE SEGUNDA A SEXTA DAS 7H - 20H.</p>
            </div>
          </article>

          <article className={styles.serviceCard}>
            <ShieldIcon />
            <div>
              <h2>SITE SEGURO:</h2>
              <p>SITE 100% CONFIÁVEL E APROVADO NO TRUSTPILOT.</p>
            </div>
          </article>
        </div>
      </section>

      <footer className={styles.footer} id="contato">
        <div className={styles.footerMain}>
          <div className={`${styles.container} ${styles.footerMainContent}`}>
            <section className={styles.footerColumn}>
              <h2>
                <WhatsAppIcon />
                CONTATO:
              </h2>

              <a
                href="https://wa.me/554892070377"
                target="_blank"
                rel="noreferrer"
                className={styles.footerChip}
              >
                <WhatsAppIcon />
                +55 48 9207-0377
              </a>

              <a
                href="mailto:contato@globalscaltoatacado.com"
                className={styles.footerChip}
              >
                <MailIcon />
                contato@globalscaltoatacado.com
              </a>
            </section>

            <section className={styles.footerColumn}>
              <h2>POLÍTICAS:</h2>

              <a href="/politica-de-privacidade" className={styles.footerChip}>
                Política de Privacidade (LGPD)
              </a>

              <a href="/politicas-de-troca" className={styles.footerChip}>
                Políticas de Troca
              </a>

              <a href="/termos-de-uso" className={styles.footerChip}>
                Termos de Uso e Condições Gerais
              </a>

              <a href="/aviso-legal" className={styles.footerChip}>
                Aviso Legal
              </a>
            </section>

            <section className={styles.footerColumn}>
              <h2>
                <BookIcon />
                TUTORIAL:
              </h2>

              <a href="/como-comprar" className={styles.footerChip}>
                <CartIcon />
                COMO COMPRAR ?
              </a>
            </section>

            <section className={styles.tiagoArea}>
              <Image
                src="/tiago.png"
                alt="Tiago Braga - Equipe Comercial Global SC"
                width={340}
                height={420}
                quality={100}
                className={styles.tiagoImage}
              />
            </section>
          </div>
        </div>

        <div className={styles.footerNotice}>
          <div className={styles.container}>
            <p>
              ESTE CATÁLOGO B2B DESTINA-SE EXCLUSIVAMENTE À CONSULTA DE PRODUTOS
              E SOLICITAÇÃO DE ORÇAMENTOS. NÃO SÃO REALIZADOS PAGAMENTOS PELO
              SITE VIA PIX, BOLETO OU CARTÃO. TODAS AS NEGOCIAÇÕES, DESCONTOS E
              FORMAS DE PAGAMENTO DEVEM SER TRATADAS DIRETAMENTE COM A EMPRESA
              FORNECEDORA OU ATRAVÉS DO FINANCEIRO: (48) 9207-0377 – TIAGO
              BRAGA.
            </p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.container}>
            <p>© 2026 Global SC Alto Atacado. Todos os direitos reservados.</p>
            <p>
              GLOBAL SC FÁBRICA E IMPORTADORA ALTO ATACADO | CNPJ:
              59.987.080/0001-63
            </p>
            <p>
              Sede Administrativa: Av. Marginal Oeste, 90 - Monte Alegre,
              Camboriú - SC, 88340-000
            </p>
            <p>Contato Institucional: contato@globalscaltoatacado.com</p>
            <p>
              Plataforma e Catálogo B2B de Intermediação Comercial – Modelo de
              Catálogo Digital Automatizado (Asset-Light).
            </p>
          </div>
        </div>
      </footer>

      <a
        className={styles.floatingWhatsapp}
        href="https://wa.me/554892070377?text=Olá!%20Preciso%20de%20atendimento%20na%20Global%20SC."
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Global SC pelo WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </main>
  );
}