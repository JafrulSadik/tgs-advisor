import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tgsadvisor.com",
      },
      {
        protocol: "https",
        hostname: "www.tgsadvisor.com",
      },
      {
        protocol: "http",
        hostname: "tgsadvisor.com",
      },
      {
        protocol: "http",
        hostname: "www.tgsadvisor.com",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
