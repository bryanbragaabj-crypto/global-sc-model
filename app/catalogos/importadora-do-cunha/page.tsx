import Image from "next/image";
import styles from "./catalogo.module.css";

type Catalogo = {
  id: number;
  titulo: string;
  descricao: string;
  arquivo: string;
};

const catalogos: Catalogo[] = [
  {
    id: 1,
    titulo: "LYSTR-001-25 03-02",
    descricao:
      "Confira os modelos.",
    arquivo: "LYSTR-001-25 03-02.pdf",
  },
  {
    id: 2,
    titulo: "LYSTR-002-25 03-02",
    descricao:
      "Confira os Modelos.",
    arquivo: "LYSTR-002-25 03-02.pdf",
  },
  {
    id: 3,
    titulo: "LYSTR-003-25 13-5",
    descricao:
      "Confira Modelos.",
    arquivo: "LYSTR-003-25 13-5.pdf",
  },
  {
    id: 4,
    titulo: "LYSTR-004-25 13-5",
    descricao:
      "Confira Modelos.",
    arquivo: "LYSTR-004-25 13-5.pdf",
  },
  {
    id: 5,
    titulo: "LYSTR-005-2513-5",
    descricao:
      "Confira os Modelos.",
    arquivo: "LYSTR-005-2513-5.pdf",
  },
  {
    id: 6,
    titulo: "MSKZA-011-25",
    descricao:
      "Confira os Modelos.",
    arquivo: "MSKZA-011-25.pdf",
  },
];

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M11 4h18l8 8v32H11z" />
      <path d="M29 4v9h8" />
      <path d="M16 23h16" />
      <path d="M16 30h16" />
      <path d="M16 37h10" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5" />
      <path d="m19 5-9 9" />
      <path d="M17 13v6H5V7h6" />
    </svg>
  );
}

export default function KontudoSurfCatalogosPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <a className={styles.backButton} href="/">
              <ArrowLeftIcon />
              Voltar à Página Inicial
            </a>

            <div className={styles.headerBrand}>
              <span>GLOBAL SC</span>
              <strong>Catálogos de Fornecedores</strong>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.bannerSection}>
        <div className={styles.container}>
          <div className={styles.bannerWrapper}>
            <Image
              src="/banner-principal.png"
              alt="Kontudo Surf"
              width={1269}
              height={162}
              priority
              className={styles.bannerImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.introduction}>
        <div className={styles.container}>
          <div className={styles.introductionContent}>
            <span className={styles.introductionLabel}>
              CATÁLOGOS EM PDF
            </span>

            <h1>CATÁLOGOS KONTUDO SURF</h1>

            <p>
              Escolha uma das opções abaixo e clique para visualizar o catálogo
              completo em PDF.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.catalogSection}>
        <div className={styles.container}>
          <div className={styles.catalogGrid}>
            {catalogos.map((catalogo) => {
              const pdfUrl = `/catalogos/kontudo-surf/${encodeURIComponent(
                catalogo.arquivo
              )}`;

              return (
                <article className={styles.catalogCard} key={catalogo.id}>
                  <div className={styles.pdfIcon}>
                    <PdfIcon />
                  </div>

                  <div className={styles.catalogInformation}>
                    <span className={styles.pdfLabel}>ARQUIVO PDF</span>

                    <h2>{catalogo.titulo}</h2>

                    <p>{catalogo.descricao}</p>
                  </div>

                  <a
                    className={styles.openButton}
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${catalogo.titulo}`}
                    title={`Abrir ${catalogo.titulo}`}
                  >
                    Abrir Catálogo
                    <ExternalIcon />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.helpSection}>
        <div className={styles.container}>
          <div className={styles.helpBox}>
            <div>
              <span>PRECISA DE AJUDA?</span>

              <h2>Fale com nossa equipe comercial</h2>

              <p>
                Nossa equipe está disponível para auxiliar na escolha dos
                produtos e no envio do seu pedido.
              </p>
            </div>

            <a
              href="https://wa.me/5548920703577?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20catálogos%20da%20Kontudo%20Surf."
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            © 2026 Global SC Alto Atacado. Todos os direitos reservados.
          </p>

          <p>Plataforma B2B de Intermediação Comercial.</p>
        </div>
      </footer>
    </main>
  );
}