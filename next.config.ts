import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/board",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
