"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./faq.module.css";

type FaqItem = {
  id: number;
  question: string;
  title: string;
  paragraphs: string[];
};

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "1) O QUE A GLOBAL SC FAZ?",
    title: "1) O QUE A GLOBAL SC FAZ?",
    paragraphs: [
      "A Global SC conecta fabricantes, importadores e atacadistas por meio de um ecossistema digital estratégico e organizado.",
      "Atuamos como uma plataforma B2B de divulgação e intermediação comercial, reunindo marcas, produtos e oportunidades em um ambiente profissional.",
      "Nosso objetivo é facilitar conexões comerciais, ampliar a visibilidade dos fornecedores e ajudar atacadistas a encontrarem novos parceiros e produtos.",
    ],
  },
  {
    id: 2,
    question: "2) COMO FAÇO PARA COMPRAR?",
    title: "2) COMO FAÇO PARA COMPRAR?",
    paragraphs: [
      "COMO FAZER UM PEDIDO?",
      "Escolha um fornecedor de acordo com o produto que procura e clique no banner correspondente na Página Inicial.",
      "1. Navegue pelo catálogo do fornecedor e selecione os produtos desejados.",
      "2. Adicione os itens ao carrinho e revise o pedido antes de confirmar.",
      "3. Após realizar o pedido, entre em contato com nossa equipe ou com o fornecedor responsável para confirmar disponibilidade, frete, valores e condições comerciais.",
      "4. O pagamento somente deverá ser realizado após a confirmação oficial da equipe comercial ou do fornecedor responsável.",
      "IMPORTANTE",
      "A Global SC funciona como catálogo e plataforma de conexão comercial B2B. A negociação, estoque, faturamento, envio, pagamento e entrega são confirmados diretamente com o fornecedor responsável.",
    ],
  },
  {
    id: 3,
    question: "3) QUAL O PRAZO DE ENTREGA?",
    title: "3) QUAL O PRAZO DE ENTREGA?",
    paragraphs: [
      "O prazo de entrega pode variar conforme o fornecedor parceiro, o tipo de produto, a disponibilidade em estoque, a região de entrega e a modalidade de transporte.",
      "Cada fabricante ou importador pode possuir suas próprias condições logísticas, prazos de separação e regras de envio.",
      "Recomendamos confirmar diretamente com o fornecedor ou com nossa equipe antes da finalização do pedido.",
    ],
  },
  {
    id: 4,
    question: "4) O FRETE É GRÁTIS?",
    title: "4) O FRETE É GRÁTIS?",
    paragraphs: [
      "O frete pode ser gratuito para determinadas regiões, pedidos ou condições comerciais específicas, conforme disponibilidade do fornecedor parceiro.",
      "Para outras localidades, o valor pode variar de acordo com peso, volume, endereço, transportadora e distância de entrega.",
      "Antes de confirmar o pedido, consulte nossa equipe ou o fornecedor para receber as condições atualizadas de frete.",
    ],
  },
  {
    id: 5,
    question: "5) O PRODUTO TEM GARANTIA?",
    title: "5) O PRODUTO TEM GARANTIA?",
    paragraphs: [
      "A garantia dos produtos, quando aplicável, é definida conforme a natureza do item, as condições comerciais do fornecedor e a legislação vigente.",
      "Caso exista defeito, divergência ou avaria, entre em contato com a equipe comercial ou com o fornecedor responsável, enviando fotos, vídeos e informações do pedido.",
      "A Global SC auxilia na comunicação entre as partes, porém a análise e a solução final dependem do fornecedor responsável pelo produto.",
    ],
  },
  {
    id: 6,
    question: "6) COMO ENTRO EM CONTATO?",
    title: "6) COMO ENTRO EM CONTATO?",
    paragraphs: [
      "Você pode entrar em contato com a Global SC pelos canais oficiais disponíveis no site.",
      "Nossa equipe está pronta para esclarecer dúvidas, orientar sobre pedidos e direcionar você da melhor forma dentro do nosso ecossistema comercial.",
      "WhatsApp: +55 48 9207-0377.",
      "E-mail: contato@globalscaltoatacado.com.",
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

export default function DuvidasFrequentesPage() {
  const [activeId, setActiveId] = useState(1);

  const activeFaq =
    faqItems.find((item) => item.id === activeId) ?? faqItems[0];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerContent}`}>
          <nav className={styles.navigation} aria-label="Navegação principal">
            <a href="/">Início</a>
            <a href="/sobre-nos?secao=como-funciona">Como Funciona</a>
            <a href="/sobre-nos">Sobre Nós</a>
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

      <section className={styles.brandSection}>
        <div className={styles.brandRail}>
          <Image
            src="/global-sc-logo.png"
            alt="Global SC Fábricas e Importadora"
            width={900}
            height={300}
            quality={100}
            priority
            className={styles.brandLogoImage}
          />
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <section className={styles.faqPanel}>
            <h1>DÚVIDAS FREQUENTES:</h1>

            <div className={styles.optionsGrid}>
              {faqItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.optionButton} ${
                    activeId === item.id ? styles.optionButtonActive : ""
                  }`}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.answerSection} aria-live="polite">
            <div className={styles.answerTitle}>{activeFaq.title}</div>
            <div className={styles.answerLine} />

            <article className={styles.answerBox}>
              {activeFaq.paragraphs.map((paragraph, index) => (
                <p
                  key={`${activeFaq.id}-${index}`}
                  className={
                    paragraph === "IMPORTANTE" ||
                    paragraph === "COMO FAZER UM PEDIDO?"
                      ? styles.answerSubtitle
                      : ""
                  }
                >
                  {paragraph}
                </p>
              ))}
            </article>
          </section>

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
              FORNECEDORA OU ATRAVÉS DO FINANCEIRO: (48) 9207-0377 – TIAGO BRAGA.
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