import Image from "next/image";
import styles from "./politica.module.css";

type IconType =
  | "truck"
  | "headset"
  | "shield"
  | "whatsapp"
  | "mail"
  | "document"
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
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.28-1.65a11.88 11.88 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.18-3.47-8.41ZM12.06 21.8a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.84 9.84 0 0 1-1.52-5.25c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5a9.04 9.04 0 0 1-1.68-2.1c-.18-.3-.02-.46.14-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z" />
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

  if (type === "document") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M13 5h17l8 8v30H13zM30 5v9h8M19 22h13M19 29h13M19 36h9" />
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

export default function PoliticaDePrivacidadePage() {
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

      <section className={styles.policySection}>
        <div className="layout-container">
          <div className={styles.policyHeading}>
            <h1>POLÍTICA DE PRIVACIDADE (LGPD)</h1>
            <div className={styles.policyLine} />
          </div>

          <article className={styles.policyCard}>
            <section className={styles.policyBlock}>
              <h2>1. Objetivo desta Política</h2>
              <p>
                Esta Política de Privacidade explica como a GLOBAL SC FÁBRICA E
                IMPORTADORA ALTO ATACADO trata os dados pessoais fornecidos por
                usuários, clientes, fornecedores, parceiros e visitantes de seus
                canais digitais.
              </p>
              <p>
                O tratamento de dados é realizado com respeito à privacidade,
                segurança, transparência e às regras aplicáveis de proteção de
                dados pessoais.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>2. Dados que podem ser tratados</h2>
              <p>
                Poderemos tratar dados fornecidos diretamente pelo titular,
                conforme o contato ou serviço solicitado, tais como nome,
                telefone, e-mail, empresa, CNPJ, cidade, segmento comercial,
                interesse em produtos, informações de pedido e mensagens
                enviadas pelos canais de atendimento.
              </p>
              <p>
                Também poderão ser registrados dados técnicos básicos de
                navegação necessários para o funcionamento, segurança e
                melhoria dos canais digitais, conforme as configurações do
                navegador e dos serviços tecnológicos utilizados.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>3. Finalidades do tratamento</h2>
              <p>Os dados poderão ser utilizados para:</p>

              <ul>
                <li>Responder solicitações de contato, orçamento e pedido.</li>
                <li>
                  Direcionar o usuário ao fornecedor ou parceiro comercial
                  relacionado ao seu interesse.
                </li>
                <li>
                  Confirmar informações comerciais, disponibilidade e
                  comunicação sobre produtos.
                </li>
                <li>
                  Manter registros de atendimento e relacionamento comercial.
                </li>
                <li>
                  Melhorar a segurança, a experiência de navegação e a
                  organização dos canais da Global SC.
                </li>
                <li>
                  Cumprir obrigações legais, regulatórias ou solicitações de
                  autoridades competentes, quando aplicável.
                </li>
              </ul>
            </section>

            <section className={styles.policyBlock}>
              <h2>4. Compartilhamento de dados</h2>
              <p>
                Os dados poderão ser compartilhados somente quando necessário
                para a finalidade informada, especialmente com fornecedores,
                fabricantes, importadores, parceiros comerciais, plataformas de
                catálogo, hospedagem, tecnologia, atendimento e meios de
                comunicação utilizados pela operação.
              </p>
              <p>
                O compartilhamento será limitado ao que for necessário para
                viabilizar o atendimento, a solicitação comercial, a segurança
                do sistema ou o cumprimento de obrigação legal.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>5. Negociação com fornecedores parceiros</h2>
              <p>
                A Global SC atua como plataforma de conexão, catálogo e
                intermediação comercial B2B. Quando o usuário solicitar um
                orçamento, pedido ou contato com determinado fornecedor, os
                dados necessários poderão ser encaminhados à empresa
                responsável pela negociação.
              </p>
              <p>
                Após o encaminhamento, o fornecedor poderá tratar os dados
                recebidos conforme suas próprias políticas, condições
                comerciais, procedimentos internos e responsabilidades legais.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>6. Bases legais aplicáveis</h2>
              <p>
                O tratamento poderá ocorrer conforme a base legal adequada para
                cada situação, incluindo execução de procedimentos relacionados
                a pedido, atendimento de solicitação do titular, cumprimento de
                obrigação legal, exercício regular de direitos, consentimento
                quando necessário e legítimo interesse, observados os direitos
                e liberdades do titular.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>7. Armazenamento e segurança</h2>
              <p>
                Adotamos medidas administrativas e técnicas razoáveis para
                reduzir riscos de acesso não autorizado, perda, alteração,
                divulgação ou uso indevido dos dados pessoais.
              </p>
              <p>
                Os dados serão mantidos pelo período necessário para atender às
                finalidades informadas, cumprir obrigações legais, preservar
                registros operacionais ou exercer direitos em processos
                administrativos, judiciais ou extrajudiciais.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>8. Direitos do titular dos dados</h2>
              <p>
                O titular poderá solicitar, observadas as hipóteses legais, a
                confirmação da existência de tratamento, acesso aos dados,
                correção de informações incompletas ou desatualizadas,
                anonimização, bloqueio, eliminação, informação sobre
                compartilhamentos, revogação de consentimento e outros direitos
                previstos na legislação aplicável.
              </p>
              <p>
                Para exercer seus direitos, envie uma solicitação para:
                <strong> contato@globalscaltoatacado.com</strong>.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>9. Cookies e tecnologias de navegação</h2>
              <p>
                Tecnologias de navegação poderão ser utilizadas para permitir o
                funcionamento do site, reforçar a segurança e compreender a
                utilização dos canais digitais. O usuário pode gerenciar
                cookies e permissões diretamente nas configurações do navegador.
              </p>
              <p>
                Caso sejam implementadas ferramentas adicionais de análise,
                publicidade ou integração, esta Política poderá ser atualizada
                para refletir as novas finalidades e práticas de tratamento.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>10. Links e plataformas de terceiros</h2>
              <p>
                A plataforma pode conter links para catálogos, sites B2B,
                sistemas, formulários e canais de fornecedores ou parceiros.
                Esses ambientes externos possuem regras próprias de privacidade,
                segurança e tratamento de dados.
              </p>
              <p>
                Recomendamos que o usuário consulte as políticas aplicáveis
                antes de fornecer dados em plataformas de terceiros.
              </p>
            </section>

            <section className={styles.policyBlock}>
              <h2>11. Atualizações desta Política</h2>
              <p>
                Esta Política poderá ser atualizada para refletir alterações
                legais, operacionais, comerciais ou tecnológicas. A versão
                publicada nesta página será considerada a versão vigente.
              </p>
            </section>

            <p className={styles.policyDate}>
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
            <h2>
              <FooterIcon type="document" />
              POLÍTICAS:
            </h2>

            <a className="footer-chip" href="/politica-de-privacidade">
              <FooterIcon type="document" />
              Política de Privacidade (LGPD)
            </a>

            <a className="footer-chip" href="/politicas-de-troca">
              <FooterIcon type="document" />
              Políticas de Troca
            </a>

            <a className="footer-chip" href="/termos-de-uso">
              <FooterIcon type="document" />
              Termos de Uso e Condições Gerais
            </a>

            <a className="footer-chip" href="/aviso-legal">
              <FooterIcon type="document" />
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