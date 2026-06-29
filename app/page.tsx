"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Supplier = {
  id: number;
  name: string;
  slug: string;
  image: string;
  catalogPath: string;
  b2bUrl: string;
  categories: string[];
  keywords: string[];
};

const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Inovare Representações",
    slug: "inovare",
    image: "/inovare.png",
    catalogPath: "/catalogos/inovare",
    b2bUrl: "https://inovarerepresentacoes.pedidook.com.br",
    categories: [
      "Moletons",
      "calça",
      "blusa",
      "conjunto",
      "jaqueta",
      "casaco",
      "cardigan",
      "Camiseta",
      "camisas",
      "Pijama",
      "Vestido",
      "macaquinho",
      "macacão",
      "Saia",
      "shorts",
      "short saia",
      "Pantufa",
      "Meia",
      "polainas",
      "Lingerie",
      "Meia-calça",
      "Mochilas bolsas",
      "Carteiras",
      "cintos",
      "brinquedos",
    ],
    keywords: [
      "inovare",
      "representações",
      "importados",
      "inverno",
      "verão",
      "roupas",
      "confecção",
    ],
  },
  {
    id: 2,
    name: "Importadora Kontudo",
    slug: "kontudo",
    image: "/kontudo.png",
    catalogPath: "/catalogos/kontudo",
    b2bUrl: "https://importadorakontudo.pedidook.com.br",
    categories: [
      "Inverno infantil",
      "Blusinha feminina",
      "Calças de inverno",
      "Roupa íntima feminina masculina e infantil",
      "Fitness",
      "Luva",
      "Touca",
      "Gorro adulto e infantil",
      "Cachecóis e lenços",
      "Acessório de cabelo unha e maquiagem",
      "Regata",
      "Camisa feminina masculina e infantil",
      "Conjunto baby doll",
      "Camisola",
      "Meias",
      "Pantufas masculina feminina e infantil",
      "Acessórios infantil",
      "Bolsas femininas",
      "Necessaire feminina",
    ],
    keywords: [
      "kontudo",
      "roupa",
      "moda",
      "infantil",
      "feminino",
      "masculino",
      "vestuário",
      "confeccao",
      "inverno",
      "fitness",
      "meias",
      "pantufas",
    ],
  },
  {
    id: 3,
    name: "Kontudo Surf",
    slug: "kontudo-surf",
    image: "/kontudo-surf.png",
    catalogPath: "/catalogos/kontudo-surf",
    b2bUrl: "https://importadorakontudosurf.pedidook.com.br",
    categories: [
      "Roupas de inverno feminino masculino e infantil",
      "Conjuntos moletom feminino masculino e infantil",
    ],
    keywords: [
      "kontudo surf",
      "surf",
      "inverno",
      "moletom",
      "roupas",
      "feminino",
      "masculino",
      "infantil",
    ],
  },
  {
    id: 4,
    name: "Importadora do Cunha",
    slug: "importadora-do-cunha",
    image: "/cunha.png",
    catalogPath: "/catalogos/importadora-do-cunha",
    b2bUrl: "https://importadoradocunha.pedidook.com.br",
    categories: [
      "Vasos",
      "Utensílios para casa",
      "Utensílios de cozinha e talheres",
      "Talheres",
      "Potes de vidro tigelas e garrafas",
      "Papelaria",
      "Kit viagem",
      "Jogos",
      "Flores",
      "Ferramentas e utilidades",
      "Despensa",
      "Cinta modeladora e roupa íntima feminina",
      "Canecas copos e xícaras",
      "Brinquedos e esporte",
      "Balança digital",
      "Acessórios para pet",
      "Acessórios de cabelo",
    ],
    keywords: [
      "cunha",
      "casa",
      "cozinha",
      "lar",
      "pet",
      "flores artificiais",
      "utilidades",
      "brinquedos",
      "vasos",
      "talheres",
      "papelaria",
      "ferramentas",
    ],
  },
  {
    id: 5,
    name: "SC Fashion",
    slug: "sc-fashion",
    image: "/sc-fashion.png",
    catalogPath: "/catalogos/sc-fashion",
    b2bUrl: "https://scfashionatacadista.com",
    categories: [
      "Hidratante corporal",
      "Perfume",
      "Body Splash",
      "Batas camisas vestidos e saídas de praia",
      "Bolsas utensílios cabides e guarda-sol",
      "Boné",
      "Brinquedos de praia jogos boias e banheiras",
      "Cabide e manequim",
      "Calcinha e biquíni",
      "Camisa UV masculino feminino e infantil",
      "Cangas",
      "Conjunto biquíni",
      "Top sutiã e biquíni",
      "Maiô",
      "Maiô infantil",
      "Frescobol e raquete",
      "Saída de praia",
      "Shorts masculino e feminino",
      "Sunga",
      "Top calça",
      "Top saia",
      "Top shorts",
      "Utensílios para praia",
      "Camiseta básica",
      "Fitness",
      "Neoprene",
      "Óculos de sol",
      "Toalha de banho",
      "Relógio",
      "Impressão 3D",
      "Bola de vôlei e futebol",
    ],
    keywords: [
      "sc fashion",
      "praia",
      "verão",
      "moda praia",
      "biquini",
      "roupas",
      "feminino",
      "masculino",
      "infantil",
      "fitness",
      "maio",
      "sunga",
      "canga",
      "oculos",
    ],
  },
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.63-.94L14.38 2.8a.5.5 0 0 0-.49-.4h-3.84a.5.5 0 0 0-.49.4l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.66 8.86a.5.5 0 0 0 .12.64l2.03 1.58c-.04.3-.07.62-.07.94s.03.64.07.94L2.78 14.54a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.39 1.04.71 1.63.94l.36 2.54a.5.5 0 0 0 .49.4h3.84a.5.5 0 0 0 .49-.4l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 8 8 8 8-8" />
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

function FooterIcon({
  type,
}: {
  type:
    | "truck"
    | "headset"
    | "shield"
    | "whatsapp"
    | "mail"
    | "document"
    | "book"
    | "cart";
}) {
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

  if (type === "document") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 5h18l8 8v30H12zM30 5v9h8M18 23h14M18 30h14M18 37h9" />
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

  if (type === "cart") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 8h6l4 21h21l5-15H14m4 23a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    );
  }

  return null;
}

export default function Home() {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

  const allTerms = useMemo(() => {
    const terms = suppliers.flatMap((supplier) => [
      supplier.name,
      ...supplier.categories,
      ...supplier.keywords,
    ]);

    return Array.from(new Set(terms)).sort((first, second) =>
      first.localeCompare(second, "pt-BR"),
    );
  }, []);

  const suggestions = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return allTerms
      .filter((term) => normalizeText(term).includes(normalizedQuery))
      .slice(0, 8);
  }, [allTerms, normalizedQuery]);

  const filteredSuppliers = useMemo(() => {
    if (!queryWords.length) {
      return suppliers;
    }

    return suppliers.filter((supplier) => {
      const searchableText = normalizeText(
        [supplier.name, ...supplier.categories, ...supplier.keywords].join(" "),
      );

      return queryWords.every((word) => searchableText.includes(word));
    });
  }, [queryWords]);

  return (
    <main className="site-page" id="inicio">
      <header className="site-header">
        <div className="layout-container header-content">
          <nav className="main-navigation" aria-label="Navegação principal">
            <a className="navigation-link navigation-link--active" href="#inicio">
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

      <section className="catalog-introduction" id="como-funciona">
        <div className="layout-container catalog-introduction__content">
          <div className="search-wrapper">
            <label className="sr-only" htmlFor="supplier-search">
              Pesquise categorias ou fornecedores
            </label>

            <input
              id="supplier-search"
              className="supplier-search"
              type="search"
              placeholder="PESQUISE CATEGORIAS AQUI"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />

            <SearchIcon />

            {suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <h1>CATÁLOGOS DE FORNECEDORES</h1>

          <p>
            ESCOLHA UM FORNECEDOR <strong>CLICANDO</strong> NOS BANNERS ABAIXO
          </p>

          <div className="down-arrow">
            <ArrowDownIcon />
          </div>
        </div>
      </section>

      <section className="suppliers-section">
        <div className="layout-container suppliers-content">
          {filteredSuppliers.length > 0 ? (
            <div className="suppliers-list">
              {filteredSuppliers.map((supplier) => (
                <article className="supplier-banner" key={supplier.id}>
                  <Image
                    src={supplier.image}
                    alt={`Banner da ${supplier.name}`}
                    width={1269}
                    height={162}
                    className="supplier-image"
                  />

                  <a
                    href={supplier.catalogPath}
                    className="supplier-zone supplier-zone--pdf"
                    aria-label={`Visualizar catálogos da ${supplier.name}`}
                    title={`Visualizar catálogos da ${supplier.name}`}
                  >
                    <span className="sr-only">Visualizar PDF</span>
                  </a>

                  <a
                    href={supplier.b2bUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="supplier-zone supplier-zone--b2b"
                    aria-label={`Abrir B2B da ${supplier.name}`}
                    title={`Abrir B2B da ${supplier.name}`}
                  >
                    <span className="sr-only">Visualizar B2B</span>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h2>Nenhum fornecedor encontrado.</h2>

              <p>
                Tente pesquisar outro nome, produto, segmento ou categoria.
              </p>

              <button type="button" onClick={() => setQuery("")}>
                Limpar pesquisa
              </button>
            </div>
          )}
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
        href="https://wa.me/5548920703577?text=Olá!%20Preciso%20de%20atendimento%20na%20Global%20SC."
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Global SC pelo WhatsApp"
        title="Fale conosco pelo WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </main>
  );
}
