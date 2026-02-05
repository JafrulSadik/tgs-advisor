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
        protocol: "https",
        hostname: "tgsadvisor.com",
      },
      {
        protocol: "https",
        hostname: "www.tgsadvisor.com",
      },
      {
        protocol: "https",
        hostname: "loclhost",
      },
      {
        protocol: "http",
        hostname: "loclhost",
      },
    ],
  },
};

export default nextConfig;
