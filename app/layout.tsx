import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const URL_PRINCIPAL = "https://globalscaltoatacado.com";
const TITULO = "Global SC Alto Atacado | As Melhores Importadoras";
const DESCRICAO = "Encontre fornecedores confiáveis, visualize catálogos e envie seu pedido de forma rápida e prática.";

// Diretório da imagem que aparecerá no WhatsApp e Redes Sociais (Pasta 'public')
const IMAGEM_OG = "/og-image.jpg"; // (Mantenha este arquivo grande para redes sociais)

export const metadata: Metadata = {
  metadataBase: new URL(URL_PRINCIPAL),
  title: TITULO,
  description: DESCRICAO,
  alternates: {
    canonical: URL_PRINCIPAL,
  },
  
  // SEÇÃO CORRIGIDA: Apontando diretamente para o arquivo icone-global.png
  icons: {
    icon: [
      { url: '/icone-global.png' }, // Aqui está a sua imagem corretamente referenciada
    ],
    shortcut: ['/icone-global.png'],
    apple: [
      { url: '/icone-global.png', type: 'image/png' },
    ],
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: URL_PRINCIPAL,
    siteName: "Global SC Alto Atacado",
    title: TITULO,
    description: DESCRICAO,
    images: [
      {
        url: IMAGEM_OG,
        width: 1200,
        height: 630,
        alt: "Capa do site Global SC Alto Atacado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: [IMAGEM_OG],
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