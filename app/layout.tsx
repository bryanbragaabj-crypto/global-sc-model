import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const URL_PRINCIPAL = "https://globalscaltoatacado.com";

const IMAGEM_COMPARTILHAMENTO =
  "https://globalscaltoatacado.com/miniatura-whatsapp-oficial-v2.png";

export const metadata: Metadata = {
  metadataBase: new URL(URL_PRINCIPAL),

  title: "Global SC Alto Atacado | As Melhores Importadoras",

  description:
    "Encontre fornecedores confiáveis, visualize catálogos e envie seu pedido de forma rápida e prática.",

  alternates: {
    canonical: URL_PRINCIPAL,
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: URL_PRINCIPAL,
    siteName: "Global SC Alto Atacado",

    title: "Global SC Alto Atacado | As Melhores Importadoras",

    description:
      "Encontre fornecedores confiáveis, visualize catálogos e envie seu pedido de forma rápida e prática.",

    images: [
      {
        url: IMAGEM_COMPARTILHAMENTO,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Global SC Alto Atacado - As Melhores Importadoras",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Global SC Alto Atacado | As Melhores Importadoras",

    description:
      "Encontre fornecedores confiáveis, visualize catálogos e envie seu pedido de forma rápida e prática.",

    images: [IMAGEM_COMPARTILHAMENTO],
  },

  robots: {
    index: true,
    follow: true,
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