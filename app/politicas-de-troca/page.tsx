import Image from "next/image";
import styles from "./troca.module.css";

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

export default function PoliticasDeTrocaPage() {
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

      <section className={styles.exchangeSection}>
        <div className="layout-container">
          <div className={styles.exchangeHeading}>
            <h1>POLÍTICAS DE TROCA</h1>
            <div className={styles.exchangeLine} />
          </div>

          <article className={styles.exchangeCard}>
            <section className={styles.exchangeBlock}>
              <h2>1. Aplicação desta Política</h2>
              <p>
                Esta Política orienta o tratamento de solicitações de troca,
                devolução, divergência, avaria ou falta de produtos negociados
                por meio dos catálogos e conexões comerciais da Global SC.
              </p>
              <p>
                Cada solicitação será analisada conforme as condições do
                fornecedor responsável, a confirmação do pedido, a natureza do
                produto e a legislação aplicável à relação comercial.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>2. Papel da Global SC</h2>
              <p>
                A Global SC atua como plataforma de catálogo, conexão e
                intermediação comercial B2B. Quando necessário, nossa equipe
                poderá auxiliar na comunicação entre comprador e fornecedor.
              </p>
              <p>
                A análise final sobre estoque, troca, reposição, coleta,
                devolução, reembolso, crédito ou garantia é realizada pelo
                fornecedor responsável pela venda e pelo faturamento.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>3. Situações que devem ser comunicadas</h2>
              <p>
                O comprador deve comunicar o fornecedor ou a equipe comercial
                assim que identificar qualquer divergência, incluindo:
              </p>

              <ul>
                <li>Produto diferente do item confirmado no pedido.</li>
                <li>Quantidade divergente da nota fiscal ou pedido aprovado.</li>
                <li>Produto com avaria aparente no recebimento.</li>
                <li>Falta de volumes, itens ou acessórios.</li>
                <li>Defeito identificado conforme as condições do fornecedor.</li>
              </ul>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>4. Informações necessárias para análise</h2>
              <p>
                Para agilizar a tratativa, poderão ser solicitados número do
                pedido, nota fiscal, fotos, vídeos, descrição detalhada da
                ocorrência, data de recebimento e demais informações necessárias
                para conferência.
              </p>
              <p>
                A ausência de informações ou evidências pode limitar a análise
                da solicitação, especialmente quando o produto já tiver sido
                utilizado, alterado ou encaminhado a terceiros.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>5. Condições do produto para devolução</h2>
              <p>
                Quando houver autorização de devolução pelo fornecedor, os itens
                deverão ser enviados conforme as orientações recebidas, com
                embalagem adequada, identificação do pedido e preservação
                compatível com a análise solicitada.
              </p>
              <p>
                Produtos utilizados, modificados, danificados por mau uso,
                lavados, sem identificação ou fora das condições acordadas
                poderão não ser aceitos, salvo quando a legislação aplicável ou
                a confirmação do fornecedor estabelecer solução diferente.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>6. Frete de Devolução, Coleta ou Reenvio</h2>

              <p>
                <strong>6.1.</strong> Quando a devolução decorrer de erro de
                separação, envio de produto diferente do pedido confirmado, falta
                de itens, avaria comprovada antes ou no recebimento, ou defeito
                confirmado pelo fornecedor, a forma de coleta, postagem,
                devolução ou reenvio será definida pelo fornecedor responsável
                após a análise da solicitação.
              </p>

              <p>
                <strong>6.2.</strong> Nesses casos, o fornecedor poderá
                disponibilizar coleta, código de postagem, transportadora
                indicada, reembolso de frete previamente autorizado ou outra
                solução logística adequada à ocorrência.
              </p>

              <p>
                <strong>6.3.</strong> Quando a devolução for solicitada por
                preferência do comprador, erro de compra, alteração de coleção,
                mudança de estratégia comercial, desistência não vinculada a
                defeito ou qualquer situação não atribuível ao fornecedor, o
                frete de devolução será de responsabilidade do comprador, salvo
                se houver autorização diferente e expressa do fornecedor.
              </p>

              <p>
                <strong>6.4.</strong> Em casos de avaria no transporte, o
                comprador deverá registrar a ocorrência no recebimento sempre que
                possível, preservar embalagens, produtos e documentos, além de
                enviar fotos, vídeos e demais evidências para análise. A
                responsabilidade da transportadora poderá depender da verificação
                da entrega e das condições registradas no recebimento.
              </p>

              <p>
                <strong>6.5.</strong> Nenhum produto deverá ser devolvido sem
                orientação e autorização prévia do fornecedor ou do canal
                comercial responsável. Envios realizados sem autorização poderão
                ser recusados, e os custos de transporte poderão permanecer sob
                responsabilidade de quem realizou o envio.
              </p>

              <p>
                <strong>6.6.</strong> Qualquer reembolso de frete, coleta ou
                reenvio dependerá de aprovação expressa do fornecedor responsável
                pela negociação, respeitando as condições comerciais confirmadas e
                a legislação aplicável.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>7. Troca por preferência ou erro de compra</h2>
              <p>
                Pedidos de troca por preferência, alteração de coleção, erro de
                compra, mudança de estratégia comercial ou escolha equivocada de
                produto dependem de aprovação prévia do fornecedor responsável.
              </p>
              <p>
                Nessas situações, poderão existir condições específicas de
                estoque, prazo, frete, taxa logística, crédito comercial ou
                impossibilidade de troca, conforme a política do fornecedor.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>8. Produtos com defeito ou avaria</h2>
              <p>
                Em casos de defeito ou avaria, o fornecedor poderá solicitar
                fotos, vídeos, avaliação técnica, devolução parcial ou total do
                item e demais evidências necessárias para verificar a origem da
                ocorrência.
              </p>
              <p>
                Após a análise, a solução poderá envolver reposição, troca,
                crédito, abatimento, reparo, devolução ou outra medida definida
                conforme a negociação e a legislação aplicável.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>9. Produtos personalizados, sob encomenda ou promocionais</h2>
              <p>
                Produtos personalizados, fabricados sob encomenda, de ponta de
                estoque, saldos, kits especiais, itens promocionais ou
                mercadorias com condição comercial diferenciada podem possuir
                regras próprias de troca e devolução.
              </p>
              <p>
                Essas condições devem ser confirmadas antes da finalização da
                compra com o fornecedor responsável.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>10. Reembolso, crédito ou compensação</h2>
              <p>
                Qualquer reembolso, estorno, crédito comercial, abatimento ou
                compensação dependerá da análise e da confirmação do fornecedor
                responsável pela negociação e pelo faturamento.
              </p>
              <p>
                A Global SC não processa pagamentos diretamente pelo site e não
                realiza estornos financeiros em nome de fornecedores parceiros.
              </p>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>11. Contato para solicitação</h2>
              <p>
                Para iniciar uma solicitação, entre em contato pelo WhatsApp
                comercial ou pelo e-mail institucional, informando os dados do
                pedido e anexando os registros necessários para análise.
              </p>

              <div className={styles.contactBox}>
                <strong>WhatsApp:</strong> +55 48 9207-0377
                <br />
                <strong>E-mail:</strong> contato@globalscaltoatacado.com
              </div>
            </section>

            <section className={styles.exchangeBlock}>
              <h2>12. Atualizações desta Política</h2>
              <p>
                Esta Política poderá ser atualizada para refletir alterações
                operacionais, comerciais, logísticas ou legais. A versão
                publicada nesta página será considerada a versão vigente.
              </p>
            </section>

            <p className={styles.exchangeDate}>
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