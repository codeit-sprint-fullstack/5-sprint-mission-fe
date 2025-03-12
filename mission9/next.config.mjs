/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  output: "standalone", // Netlify 배포를 위한 최적화 설정
  images: {
    domains: ["blogs.nvidia.co.kr"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "/src",
    };
    return config;
  },
  // 절대 경로를 사용하는 경우 basePath 설정이 필요할 수 있습니다
  // basePath: '',
  // 정적 에셋에 대한 경로 설정이 필요할 수 있습니다
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
};

export default nextConfig;
