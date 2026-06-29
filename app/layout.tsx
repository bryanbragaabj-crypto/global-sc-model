import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://globalscaltoatacado.com"),
  title: "Global SC Alto Atacado",
  description: "Plataforma B2B de Intermediação Comercial",
  openGraph: {
    title: "Global SC Alto Atacado",
    description: "Plataforma B2B de Intermediação Comercial",
    url: "https://globalscaltoatacado.com",
    siteName: "Global SC Alto Atacado",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/miniatura-whatsapp.png",
        width: 1200,
        height: 630,
        alt: "Global SC Alto Atacado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global SC Alto Atacado",
    description: "Plataforma B2B de Intermediação Comercial",
    images: ["/miniatura-whatsapp.png"],
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