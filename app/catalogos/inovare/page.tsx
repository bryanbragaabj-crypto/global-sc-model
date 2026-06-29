import Link from "next/link";
import styles from "./catalogos.module.css";

const catalogos = [
  {
    title: "Linha de Importação 2026",
    description:
      "Pijamas, blusas térmicas, tricot, calças de moletom, blusas modal, casacos de lã e meia-calça.",
    file: "linha-de-importacao-2026.pdf",
  },
  {
    title: "Confecção - Inverno",
    description:
      "Catálogo de moda e confecção para a temporada de inverno.",
    file: "confeccao-inverno.pdf",
  },
  {
    title: "Confecção - Meia Estação",
    description:
      "Peças de confecção para os períodos de meia estação.",
    file: "confeccao-meia-estacao.pdf",
  },
  {
    title: "Meias e Polainas",
    description:
      "Meias infantis, adultas, kits e polainas.",
    file: "meias-e-polainas.pdf",
  },
  {
    title: "Acessórios de Inverno",
    description:
      "Lenços, toucas, luvas e lingerie.",
    file: "acessorios-inverno.pdf",
  },
  {
    title: "Acessórios Diversos",
    description:
      "Carteiras, cintos, mochilas e bolsas.",
    file: "acessorios-diversos.pdf",
  },
  {
    title: "Brinquedos",
    description:
      "Brinquedos e itens recreativos.",
    file: "brinquedos.pdf",
  },
];

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h9l3 3v17H6z" />
      <path d="M14 2v5h4" />
      <path d="M9 12h6M9 16h6M9 20h4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function CatalogosInovarePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <span>GLOBAL SC - CATÁLOGOS</span>
            <h1>Inovare Representações</h1>
            <p>Escolha abaixo o catálogo que deseja visualizar.</p>
          </div>

          <Link href="/" className={styles.backButton}>
            Voltar
          </Link>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.intro}>
          <span className={styles.badge}>7 catálogos disponíveis</span>
          <p>
            Os arquivos serão abertos em uma nova aba para facilitar a consulta
            e o compartilhamento.
          </p>
        </div>

        <div className={styles.grid}>
          {catalogos.map((catalogo, index) => (
            <article className={styles.catalogCard} key={catalogo.file}>
              <div className={styles.number}>0{index + 1}</div>

              <div className={styles.iconBox}>
                <PdfIcon />
              </div>

              <h2>{catalogo.title}</h2>
              <p>{catalogo.description}</p>

              <a
                href={`/catalogos/inovare/${catalogo.file}`}
                target="_blank"
                rel="noreferrer"
                className={styles.openButton}
              >
                Abrir PDF
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
