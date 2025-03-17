/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 기능: 개발 환경 설정 */
  reactStrictMode: true,

  // 지원할 페이지 확장자 설정
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  // Netlify 배포 최적화 설정
  output: "standalone",

  /* 환경 설정 */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  /* 스타일: 이미지 최적화 설정 */
  images: {
    domains: ["blogs.nvidia.co.kr"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* 로직: Webpack 별칭 설정 */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "/src",
    };
    return config;
  },
};

export default nextConfig;
