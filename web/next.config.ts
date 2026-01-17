import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['fs', 'path'],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
