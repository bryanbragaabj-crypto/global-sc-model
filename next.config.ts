import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Obriga o Next.js a entregar os metadados completos dentro do <head>.
    Isso melhora a leitura pelo WhatsApp, Facebook e outros aplicativos.
  */
  htmlLimitedBots: /.*/,
};

export default nextConfig;