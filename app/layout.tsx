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
  
  // NOVA SEÇÃO: Configuração do Favicon com arquivos baseados na sua imagem
  // Certifique-se de que estes arquivos existam na pasta 'public'
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Recomendado converter sua imagem para .ico
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' }, // Versão otimizada em PNG
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }, // Versão Retina para Apple
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