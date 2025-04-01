import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-backend-domain.com'],  // ✅ 여기에 허용할 도메인 추가
  },
};


export default nextConfig;
