import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import "./globals.css";

const DOMINIO_PRINCIPAL = "globalscaltoatacado.com";
const DOMINIOS_PERMITIDOS = [
  "globalscaltoatacado.com",
  "site.globalscaltoatacado.com",
];

/*
  Gera os metadados conforme o domínio usado no compartilhamento.
  Assim, WhatsApp recebe miniatura tanto em:
  - https://globalscaltoatacado.com
  - https://site.globalscaltoatacado.com
*/
export async function generateMetadata(): Promise<Metadata> {
  const cabecalhos = await headers();

  const hostRecebido =
    cabecalhos.get("x-forwarded-host")?.split(",")[0].trim() ||
    cabecalhos.get("host")?.split(",")[0].trim() ||
    DOMINIO_PRINCIPAL;

  const protocoloRecebido =
    cabecalhos.get("x-forwarded-proto")?.split(",")[0].trim() || "https";

  const host = DOMINIOS_PERMITIDOS.includes(hostRecebido)
    ? hostRecebido
    : DOMINIO_PRINCIPAL;

  const siteUrl = `${protocoloRecebido}://${host}`;

  return {
    metadataBase: new URL(siteUrl),
    title: "Global SC Alto Atacado",
    description:
      "Plataforma B2B de Intermediação Comercial com catálogos de fábricas e importadoras.",

    /*
      Mantém o domínio principal como referência de SEO,
      mas a imagem Open Graph é gerada no próprio domínio acessado.
    */
    alternates: {
      canonical: `https://${DOMINIO_PRINCIPAL}`,
    },

    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "/",
      siteName: "Global SC Alto Atacado",
      title: "Global SC Alto Atacado",
      description:
        "Catálogos de fábricas e importadoras para lojistas. Consulte produtos e envie seu pedido.",
      images: [
        {
          url: "/banner-principal.png",
          width: 1200,
          height: 630,
          alt: "Global SC Alto Atacado - Fábricas e Importadoras",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Global SC Alto Atacado",
      description:
        "Catálogos de fábricas e importadoras para lojistas. Consulte produtos e envie seu pedido.",
      images: ["/banner-principal.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
