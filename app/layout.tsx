import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/*
  Miniatura única, estática e leve para WhatsApp, Facebook e outros apps.
  Ela funciona para os dois domínios porque ambos apontam ao mesmo projeto:
  - https://globalscaltoatacado.com
  - https://site.globalscaltoatacado.com
*/
const URL_PRINCIPAL = "https://globalscaltoatacado.com";
const IMAGEM_COMPARTILHAMENTO =
  "https://globalscaltoatacado.com/miniatura-whatsapp-oficial.jpg";

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
        secureUrl: IMAGEM_COMPARTILHAMENTO,
        type: "image/jpeg",
        width: 1200,
        height: 630,
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
