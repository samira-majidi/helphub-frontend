import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ir-thr-at1.arvanstorage.ir',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;