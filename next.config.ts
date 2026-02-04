import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tgsadvisor.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.tgsadvisor.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "tgsadvisor.com",
        pathname: "",
      },
      {
        protocol: "https",
        hostname: "www.tgsadvisor.com",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
