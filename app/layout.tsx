import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://globalscaltoatacado.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Global SC Alto Atacado",
  description:
    "Plataforma B2B de Intermediação Comercial com catálogos de fábricas e importadoras.",
  alternates: {
    canonical: "/",
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
