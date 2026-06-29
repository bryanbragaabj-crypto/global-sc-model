"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./trabalhe.module.css";

type FormData = {
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
  area: string;
  experiencia: string;
  mensagem: string;
  aceite: boolean;
};

const initialFormData: FormData = {
  nome: "",
  telefone: "",
  email: "",
  cidade: "",
  area: "",
  experiencia: "",
  mensagem: "",
  aceite: false,
};

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

export default function TrabalheConoscoPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [feedback, setFeedback] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checkbox = event.target as HTMLInputElement;

      setFormData((currentData) => ({
        ...currentData,
        [name]: checkbox.checked,
      }));

      return;
    }

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.aceite) {
      setFeedback(
        "Para continuar, confirme que autoriza o uso dos dados apenas para contato sobre oportunidades profissionais.",
      );

      return;
    }

    const message = [
      "Olá! Quero me cadastrar no banco de talentos da Global SC.",
      "",
      `Nome: ${formData.nome}`,
      `Telefone: ${formData.telefone}`,
      `E-mail: ${formData.email}`,
      `Cidade: ${formData.cidade}`,
      `Área de interesse: ${formData.area}`,
      `Experiência: ${formData.experiencia}`,
      `Mensagem: ${formData.mensagem || "Não informada."}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/5548920703577?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setFeedback(
      "Seu WhatsApp foi aberto com os dados preenchidos. Envie a mensagem para concluir seu cadastro.",
    );
  }

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

      <section className={styles.workSection}>
        <div className="layout-container">
          <div className={styles.heading}>
            <h1>TRABALHE CONOSCO</h1>
            <div className={styles.headingLine} />
          </div>

          <p className={styles.intro}>
            Faça parte do banco de talentos da Global SC. Buscamos profissionais
            comprometidos, comerciais, estratégicos e preparados para crescer
            dentro de um ecossistema digital de atacado.
          </p>

          <div className={styles.contentGrid}>
            <section className={styles.infoColumn}>
              <article className={styles.infoCard}>
                <h2>ÁREAS DE INTERESSE</h2>

                <ul>
                  <li>Comercial e vendas B2B</li>
                  <li>Representação comercial</li>
                  <li>Atendimento e pós-venda</li>
                  <li>Cadastro de produtos e catálogos</li>
                  <li>Marketing e criação de conteúdo</li>
                  <li>Logística, separação e expedição</li>
                  <li>Administrativo e financeiro</li>
                  <li>Tecnologia e desenvolvimento</li>
                </ul>
              </article>

              <article className={styles.infoCard}>
                <h2>O QUE VALORIZAMOS</h2>

                <p>
                  Procuramos pessoas responsáveis, comunicativas, organizadas,
                  com iniciativa e vontade de construir resultados junto com a
                  Global SC.
                </p>

                <p>
                  Experiência em vendas, atacado, atendimento, importação,
                  varejo, catálogo digital ou logística será considerada um
                  diferencial.
                </p>
              </article>

              <article className={styles.alertCard}>
                <h2>IMPORTANTE</h2>

                <p>
                  Neste primeiro momento, seus dados serão enviados pelo
                  WhatsApp comercial para análise da equipe.
                </p>

                <p>
                  Não envie documentos pessoais, informações bancárias, senhas
                  ou dados sensíveis por este formulário.
                </p>
              </article>
            </section>

            <form className={styles.workForm} onSubmit={handleSubmit}>
              <h2>CADASTRE-SE NO BANCO DE TALENTOS</h2>

              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span>Nome completo *</span>
                  <input
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>Telefone / WhatsApp *</span>
                  <input
                    name="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>E-mail *</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>Cidade / Estado *</span>
                  <input
                    name="cidade"
                    type="text"
                    placeholder="Ex.: Florianópolis - SC"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={`${styles.formField} ${styles.formFieldFull}`}>
                  <span>Área de interesse *</span>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma área</option>
                    <option value="Comercial e vendas B2B">
                      Comercial e vendas B2B
                    </option>
                    <option value="Representação comercial">
                      Representação comercial
                    </option>
                    <option value="Atendimento e pós-venda">
                      Atendimento e pós-venda
                    </option>
                    <option value="Marketing e criação de conteúdo">
                      Marketing e criação de conteúdo
                    </option>
                    <option value="Cadastro de produtos e catálogos">
                      Cadastro de produtos e catálogos
                    </option>
                    <option value="Logística, separação e expedição">
                      Logística, separação e expedição
                    </option>
                    <option value="Administrativo e financeiro">
                      Administrativo e financeiro
                    </option>
                    <option value="Tecnologia e desenvolvimento">
                      Tecnologia e desenvolvimento
                    </option>
                    <option value="Outra área">Outra área</option>
                  </select>
                </label>

                <label className={`${styles.formField} ${styles.formFieldFull}`}>
                  <span>Resumo da sua experiência *</span>
                  <textarea
                    name="experiencia"
                    placeholder="Conte brevemente sobre sua experiência profissional."
                    value={formData.experiencia}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={`${styles.formField} ${styles.formFieldFull}`}>
                  <span>Mensagem complementar</span>
                  <textarea
                    name="mensagem"
                    placeholder="Conte por que deseja fazer parte da Global SC."
                    value={formData.mensagem}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label className={styles.checkboxField}>
                <input
                  name="aceite"
                  type="checkbox"
                  checked={formData.aceite}
                  onChange={handleChange}
                />

                <span>
                  Autorizo o uso destes dados exclusivamente para contato e
                  avaliação de oportunidades profissionais na Global SC.
                </span>
              </label>

              <button className={styles.submitButton} type="submit">
                ENVIAR PELO WHATSAPP
              </button>

              {feedback && (
                <p className={styles.formFeedback} role="status">
                  {feedback}
                </p>
              )}
            </form>
          </div>

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

      <footer className="site-footer" id="sobre-nos">
        <div className="layout-container footer-main" id="contato">
          <section className="footer-column footer-column--contact">
            <h2>
              <FooterIcon type="whatsapp" />
              CONTATO:
            </h2>

            <a
              className="footer-chip"
              href="https://wa.me/5548920703577"
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
        href="https://wa.me/5548920703577?text=Olá!%20Preciso%20de%20atendimento%20na%20Global%20SC."
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Global SC pelo WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </main>
  );
}