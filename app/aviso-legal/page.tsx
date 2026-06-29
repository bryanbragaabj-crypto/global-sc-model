import Image from "next/image";
import styles from "./aviso.module.css";

type IconType =
  | "truck"
  | "headset"
  | "shield"
  | "whatsapp"
  | "mail"
  | "book"
  | "cart";

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
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.28-1.65a11.88 11.88 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.18-3.47-8.41ZM12.06 21.8a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.84 9.84 0 0 1-1.52-5.25c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.88 9.88Z" />
    </svg>
  );
}

function FooterIcon({ type }: { type: IconType }) {
  if (type === "truck") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M4 12h25v20H4zM29 20h8l7 7v5H29zM12 36a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm24 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      </svg>
    );
  }

  if (type === "headset") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 26v-4a14 14 0 0 1 28 0v4M10 26h7v11h-7zm21 0h7v11h-7zM31 37c0 4-3 6-8 6h-3" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5 40 11v11c0 10-6.8 17.2-16 21-9.2-3.8-16-11-16-21V11zM17 24l5 5 10-11" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6a17 17 0 0 0-14.6 25.7L7 42l10.6-2.3A17 17 0 1 0 24 6Z" />
      </svg>
    );
  }

  if (type === "mail") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 11h38v26H5zM6 13l18 14L42 13" />
      </svg>
    );
  }

  if (type === "book") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 12c-5-4-11-4-17-2v27c6-2 12-2 17 2m0-27c5-4 11-4 17-2v27c-6-2-12-2-17 2m0-27v27" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M5 8h6l4 21h21l5-15H14m4 23a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}

export default function AvisoLegalPage() {
  return (
    <main className="site-page">
      <header className="site-header">
        <div className="layout-container header-content">
          <nav className="main-navigation" aria-label="Navegação principal">
            <a className="navigation-link" href="/">
              Início
            </a>

            <a
              className="navigation-link"
              href="/sobre-nos?secao=como-funciona"
            >
              Como Funciona
            </a>

            <a className="navigation-link" href="/sobre-nos">
              Sobre Nós
            </a>
          </nav>

          <div className="header-actions">
            <a className="order-button" href="/pedido">
              ENVIE SEU PEDIDO CLIQUE AQUI.
            </a>

            <a
              className="admin-button"
              href="/admin"
              aria-label="Abrir área administrativa"
              title="Área administrativa"
            >
              <GearIcon />
            </a>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="layout-container hero-content">
          <Image
            src="/banner-principal.png"
            alt="Global SC - As Melhores Importadoras"
            width={1825}
            height={862}
            priority
            className="hero-image"
          />
        </div>
      </section>

      <section className={styles.legalSection}>
        <div className="layout-container">
          <div className={styles.legalHeading}>
            <h1>AVISO LEGAL</h1>
            <div className={styles.legalLine} />
          </div>

          <article className={styles.legalCard}>
            <section className={styles.legalBlock}>
              <h2>1. Finalidade da Plataforma</h2>
              <p>
                A Global SC disponibiliza um ambiente digital de divulgação,
                consulta de produtos, conexão comercial e solicitação de
                orçamentos entre empresas, fornecedores, fabricantes,
                importadores e compradores.
              </p>
              <p>
                As informações exibidas no catálogo possuem caráter informativo
                e comercial, devendo ser confirmadas antes da realização de
                qualquer negociação.
              </p>
            </section>

            <section className={styles.legalBlock}>
              <h2>2. Catálogo, Orçamento e Pedido</h2>
              <p>
                O acesso aos catálogos, produtos, preços, imagens, condições
                comerciais e disponibilidade não representa oferta definitiva,
                contratação automática, reserva de estoque ou garantia de
                fornecimento.
              </p>
              <p>
                Todo pedido ou orçamento estará sujeito à confirmação do
                fornecedor responsável, incluindo disponibilidade, valores,
                quantidade mínima, frete, prazo de separação, faturamento e
                entrega.
              </p>
            </section>

            <section className={styles.legalBlock}>
              <h2>3. Pagamentos e Negociação</h2>
              <p>
                A Global SC não realiza pagamentos diretamente pelo site via
                PIX, boleto ou cartão. As condições de pagamento, descontos,
                faturamento e demais tratativas comerciais devem ser confirmadas
                diretamente com a empresa fornecedora ou com o canal comercial
                indicado para cada negociação.
              </p>
            </section>

            <section className={styles.legalBlock}>
              <h2>4. Responsabilidade dos Fornecedores</h2>
              <p>
                Cada fornecedor é responsável pelas informações, imagens,
                preços, estoque, qualidade, garantia, faturamento, expedição,
                entrega, assistência e demais condições relacionadas aos
                produtos que disponibiliza.
              </p>
              <p>
                A Global SC poderá auxiliar na comunicação comercial, mas não
                substitui a responsabilidade do fornecedor perante a negociação
                e o fornecimento efetivamente confirmado.
              </p>
            </section>

            <section className={styles.legalBlock}>
              <h2>5. Links e Plataformas de Terceiros</h2>
              <p>
                O site pode direcionar o usuário para catálogos, sistemas B2B,
                sites, formulários e canais operados por empresas parceiras ou
                terceiros.
              </p>
              <p>
                A navegação em ambientes externos está sujeita às políticas,
                termos, condições e práticas próprias de cada plataforma ou
                fornecedor responsável.
              </p>
            </section>

            <section className={styles.legalBlock}>
              <h2>6. Propriedade Intelectual</h2>
              <p>
                Textos, marcas, logotipos, imagens, catálogos, materiais
                comerciais, identidade visual e demais conteúdos presentes na
                plataforma são protegidos por direitos de propriedade
                intelectual e não podem ser copiados, reproduzidos, alterados
                ou utilizados sem autorização.
              </p>
            </section>

            <section className={styles.legalBlock}>
              <h2>7. Dados e Privacidade</h2>
              <p>
                Os dados fornecidos pelos usuários serão tratados conforme a
                Política de Privacidade da Global SC e em conformidade com a
                legislação aplicável de proteção de dados pessoais.
              </p>
            </section>

            <section className={styles.legalBlock}>
              <h2>8. Atualizações deste Aviso</h2>
              <p>
                Este Aviso Legal poderá ser atualizado para refletir mudanças
                operacionais, comerciais, tecnológicas ou legais. A versão
                publicada nesta página será considerada a versão vigente.
              </p>
            </section>

            <p className={styles.legalDate}>
              Última atualização: 23 de junho de 2026.
            </p>
          </article>

          <a className={styles.backButton} href="/">
            Voltar
          </a>
        </div>
      </section>

      <section className="quick-actions">
        <div className="layout-container quick-actions__content">
          <a href="/duvidas-frequentes">DÚVIDAS FREQUENTES</a>
          <a href="#contato">FALE CONOSCO</a>
          <a href="/trabalhe-conosco">TRABALHE CONOSCO</a>
        </div>
      </section>

      <section className="service-strip">
        <div className="layout-container service-strip__content">
          <article className="service-card">
            <FooterIcon type="truck" />
            <div>
              <h2>FRETE A COMBINAR:</h2>
              <p>
                FRETE NA REGIÃO DE FLORIANÓPOLIS. OUTRA REGIÃO CONSULTAR VALOR.
              </p>
            </div>
          </article>

          <article className="service-card">
            <FooterIcon type="headset" />
            <div>
              <h2>ATENDIMENTO:</h2>
              <p>DE SEGUNDA A SEXTA DAS 7H - 20H.</p>
            </div>
          </article>

          <article className="service-card">
            <FooterIcon type="shield" />
            <div>
              <h2>SITE SEGURO:</h2>
              <p>SITE 100% CONFIÁVEL E APROVADO NO TRUSTPILOT.</p>
            </div>
          </article>
        </div>
      </section>

      <footer className="site-footer" id="contato">
        <div className="layout-container footer-main">
          <section className="footer-column footer-column--contact">
            <h2>
              <FooterIcon type="whatsapp" />
              CONTATO:
            </h2>

            <a
              className="footer-chip"
              href="https://wa.me/554892070377"
              target="_blank"
              rel="noreferrer"
            >
              <FooterIcon type="whatsapp" />
              +55 48 9207-0377
            </a>

            <a
              className="footer-chip"
              href="mailto:contato@globalscaltoatacado.com"
            >
              <FooterIcon type="mail" />
              contato@globalscaltoatacado.com
            </a>
          </section>

          <section className="footer-column footer-column--policies">
            <h2>POLÍTICAS:</h2>

            <a className="footer-chip" href="/politica-de-privacidade">
              Política de Privacidade (LGPD)
            </a>

            <a className="footer-chip" href="/politicas-de-troca">
              Políticas de Troca
            </a>

            <a className="footer-chip" href="/termos-de-uso">
              Termos de Uso e Condições Gerais
            </a>

            <a className="footer-chip" href="/aviso-legal">
              Aviso Legal
            </a>
          </section>

          <section className="footer-column footer-column--tutorial">
            <h2>
              <FooterIcon type="book" />
              TUTORIAL:
            </h2>

            <a className="footer-chip" href="/como-comprar">
              <FooterIcon type="cart" />
              COMO COMPRAR ?
            </a>
          </section>

          <section className="footer-tiago" aria-label="Equipe comercial">
            <Image
              src="/tiago.png"
              alt="Tiago Braga - Equipe Comercial Global SC"
              width={340}
              height={420}
              className="tiago-image"
            />
          </section>
        </div>

        <div className="footer-notice">
          <div className="layout-container">
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

        <div className="footer-bottom">
          <div className="layout-container">
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
              Plataforma B2B de Intermediação Comercial – Modelo de Catálogo
              Digital Automatizado (Asset-Light).
            </p>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-floating-button"
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