import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
