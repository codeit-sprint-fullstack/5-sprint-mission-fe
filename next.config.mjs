/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
        search: "",
      },
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      //   port: "",
      //   pathname: "/**",
      //   search: "",
      // },
      // {
      //   protocol: "https",
      //   hostname: "cdn.choicenews.co.kr",
      //   port: "",
      //   pathname: "/**",
      //   search: "",
      // },
      // {
      //   protocol: "https",
      //   hostname: "via.placeholder.com",
      //   port: "",
      //   pathname: "/**",
      //   search: "",
      // },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
