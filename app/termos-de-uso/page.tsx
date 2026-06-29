import Image from "next/image";
import styles from "./termos.module.css";

type FooterIconType =
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
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.28-1.65a11.88 11.88 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.18-3.47-8.41ZM12.06 21.8a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.84 9.84 0 0 1-1.52-5.25c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5a9.04 9.04 0 0 1-1.68-2.1c-.18-.3-.02-.46.14-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function FooterIcon({ type }: { type: FooterIconType }) {
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
        <path d="M24 6a17 17 0 0 0-14.6 25.7L7 42l10.6-2.3A17 17 0 1 0 24 6Zm8.3 24.2c-.4 1.1-2.4 2.1-3.3 2.2-.9.1-2 .2-3.2-.2-.7-.2-1.7-.6-2.9-1.1-5.1-2.2-8.4-7.3-8.7-7.6-.3-.4-2.1-2.8-2.1-5.3s1.3-3.7 1.8-4.2c.5-.5 1-.6 1.4-.6h1c.3 0 .8.1 1.2 1 .4 1 .9 2.5 1 2.7.1.2.1.6 0 .8-.1.2-.2.5-.4.7-.2.2-.4.5-.6.7-.2.2-.4.4-.2.8.2.4 1.1 1.8 2.4 2.9 1.6 1.4 3 1.9 3.4 2.1.4.2.7.2.9-.1.3-.3 1.1-1.2 1.4-1.7.3-.5.6-.4 1-.3.4.1 2.5 1.2 2.9 1.4.5.2.8.3.9.5.1.2.1 1.1-.3 2.2Z" />
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

export default function TermosDeUsoPage() {
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

      <section className={styles.termsSection}>
        <div className="layout-container">
          <div className={styles.termsHeading}>
            <h1>TERMOS DE USO E CONDIÇÕES GERAIS</h1>
            <div className={styles.termsLine} />
          </div>

          <article className={styles.termsCard}>
            <section className={styles.termsBlock}>
              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar, navegar ou utilizar o site, os catálogos, links,
                formulários, canais de atendimento e demais ambientes digitais da
                Global SC, o usuário declara estar ciente destes Termos de Uso e
                Condições Gerais.
              </p>
              <p>
                Caso não concorde com qualquer disposição, o usuário deverá
                interromper a navegação e não utilizar os recursos disponibilizados.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>2. Natureza da Plataforma</h2>
              <p>
                A Global SC atua como plataforma digital de catálogo, divulgação,
                conexão e intermediação comercial B2B, aproximando fornecedores,
                fabricantes, importadores, atacadistas, lojistas e demais
                compradores empresariais.
              </p>
              <p>
                O site não funciona como loja virtual de pagamento direto. A
                navegação, consulta de produtos e envio de pedidos ou orçamentos
                não geram venda automática, reserva obrigatória de estoque ou
                faturamento imediato.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>3. Público-Alvo e Uso B2B</h2>
              <p>
                A plataforma é destinada principalmente a operações comerciais
                entre empresas, especialmente lojistas, revendedores,
                representantes, distribuidores, fornecedores e compradores do
                mercado atacadista.
              </p>
              <p>
                O usuário declara que as informações fornecidas são verdadeiras
                e que utilizará a plataforma de forma compatível com sua
                finalidade comercial, sem práticas abusivas, fraudulentas ou
                contrárias à legislação aplicável.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>4. Catálogos, Produtos e Informações Comerciais</h2>
              <p>
                As imagens, descrições, preços, variações, quantidades mínimas,
                condições de compra, prazos, disponibilidade e demais informações
                comerciais exibidas nos catálogos podem ser alteradas a qualquer
                momento pelos fornecedores responsáveis.
              </p>
              <p>
                Antes de qualquer pagamento, retirada, envio ou faturamento, o
                comprador deverá confirmar todas as informações com o fornecedor
                responsável ou com a equipe comercial indicada.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>5. Pedido, Orçamento e Confirmação</h2>
              <p>
                O envio de pedido, orçamento, formulário ou mensagem pela
                plataforma representa uma solicitação comercial, sujeita à análise
                e confirmação posterior.
              </p>
              <p>
                O pedido somente será considerado válido após confirmação do
                fornecedor responsável, incluindo disponibilidade de estoque,
                valores, formas de pagamento, frete, prazos, emissão fiscal e
                demais condições aplicáveis.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>6. Pagamentos</h2>
              <p>
                A Global SC não realiza pagamentos diretamente pelo site via PIX,
                boleto, cartão ou qualquer outro meio de pagamento automático
                dentro da plataforma.
              </p>
              <p>
                Todas as condições de pagamento, descontos, boletos, chaves PIX,
                faturamento, notas fiscais e cobranças devem ser confirmadas
                diretamente com a empresa fornecedora responsável ou com o canal
                financeiro oficialmente indicado.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>7. Responsabilidades dos Fornecedores</h2>
              <p>
                Cada fornecedor parceiro é responsável pelas informações que
                disponibiliza, bem como por estoque, preço final, faturamento,
                emissão de nota fiscal, separação, qualidade, garantia, troca,
                devolução, entrega e atendimento pós-venda dos produtos
                confirmados em sua negociação.
              </p>
              <p>
                A Global SC poderá auxiliar na comunicação comercial entre as
                partes, mas não substitui a responsabilidade do fornecedor sobre
                a negociação efetivamente confirmada.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>8. Responsabilidades do Usuário</h2>
              <p>O usuário compromete-se a:</p>

              <ul>
                <li>Fornecer informações verdadeiras e atualizadas.</li>
                <li>Utilizar a plataforma apenas para finalidades lícitas.</li>
                <li>Não copiar, extrair ou reutilizar conteúdos sem autorização.</li>
                <li>Não tentar acessar áreas restritas ou sistemas administrativos.</li>
                <li>Não praticar fraudes, simulações, ataques, spam ou uso indevido.</li>
                <li>Confirmar dados comerciais antes de concluir qualquer negociação.</li>
              </ul>
            </section>

            <section className={styles.termsBlock}>
              <h2>9. Trocas, Devoluções, Garantias e Frete de Devolução</h2>
              <p>
                Solicitações de troca, devolução, garantia, avaria, falta de
                produto, erro de separação ou divergência serão analisadas
                conforme a Política de Trocas, as condições do fornecedor
                responsável, a negociação confirmada e a legislação aplicável.
              </p>
              <p>
                O frete de devolução, coleta ou reenvio será definido conforme a
                origem da ocorrência. Quando houver erro, defeito ou avaria
                confirmada atribuível ao fornecedor, a solução logística deverá
                ser orientada pelo fornecedor responsável. Quando a devolução
                ocorrer por preferência, erro de compra ou desistência não
                atribuível ao fornecedor, o frete poderá ser de responsabilidade
                do comprador, salvo acordo diferente e expresso.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>10. Links e Plataformas de Terceiros</h2>
              <p>
                O site pode conter links para sistemas B2B, catálogos, páginas,
                formulários, WhatsApp, plataformas de pedido e ambientes digitais
                operados por terceiros ou fornecedores parceiros.
              </p>
              <p>
                Ao acessar ambientes externos, o usuário estará sujeito aos
                termos, políticas, regras comerciais, privacidade e segurança
                definidos pela respectiva plataforma ou empresa responsável.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>11. Propriedade Intelectual</h2>
              <p>
                Todo conteúdo visual, textual, gráfico, comercial, institucional,
                técnico e operacional presente no site, incluindo logotipos,
                imagens, textos, banners, catálogos, estrutura, identidade visual
                e materiais de divulgação, pertence à Global SC, aos fornecedores
                parceiros ou aos respectivos titulares.
              </p>
              <p>
                É proibida a reprodução, cópia, modificação, distribuição,
                raspagem, extração automatizada, revenda ou uso comercial não
                autorizado de qualquer conteúdo da plataforma.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>12. Dados Pessoais e Privacidade</h2>
              <p>
                O tratamento de dados pessoais realizado pela Global SC observará
                a Política de Privacidade, a legislação aplicável e as finalidades
                relacionadas ao atendimento, segurança, operação comercial,
                relacionamento com fornecedores e cumprimento de obrigações
                legais.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>13. Disponibilidade e Alterações da Plataforma</h2>
              <p>
                A Global SC poderá atualizar, alterar, suspender, corrigir,
                substituir ou remover conteúdos, páginas, links, fornecedores,
                catálogos, funcionalidades e recursos do site a qualquer momento,
                visando melhoria operacional, segurança, atualização comercial ou
                adequação legal.
              </p>
              <p>
                A plataforma poderá passar por manutenções, instabilidades ou
                indisponibilidades temporárias, sem que isso gere obrigação de
                indenização automática.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>14. Limitação de Responsabilidade</h2>
              <p>
                A Global SC não se responsabiliza por negociações realizadas fora
                dos canais oficiais, pagamentos efetuados sem confirmação,
                informações fornecidas incorretamente pelo usuário, uso indevido
                da plataforma, indisponibilidade de sistemas de terceiros ou
                condições comerciais não confirmadas pelo fornecedor responsável.
              </p>
              <p>
                Nenhuma disposição destes Termos deverá ser interpretada como
                exclusão de direitos obrigatórios previstos em lei quando forem
                aplicáveis ao caso concreto.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>15. Comunicações Oficiais</h2>
              <p>
                As comunicações comerciais e institucionais poderão ocorrer por
                WhatsApp, e-mail, telefone, formulários, links, plataformas de
                catálogo ou outros canais informados oficialmente pela Global SC.
              </p>
              <p>
                O usuário deve sempre confirmar a autenticidade dos dados de
                pagamento, contato e fornecedor antes de realizar qualquer
                operação comercial.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>16. Atualização dos Termos</h2>
              <p>
                Estes Termos poderão ser atualizados a qualquer momento para
                refletir mudanças legais, comerciais, tecnológicas, operacionais
                ou estratégicas. A versão publicada nesta página será considerada
                a versão vigente.
              </p>
            </section>

            <section className={styles.termsBlock}>
              <h2>17. Legislação Aplicável</h2>
              <p>
                Estes Termos serão interpretados conforme a legislação brasileira,
                observada a natureza da relação comercial estabelecida entre as
                partes, as regras contratuais aplicáveis e eventual incidência de
                normas de proteção obrigatória quando cabíveis.
              </p>
            </section>

            <p className={styles.termsDate}>
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