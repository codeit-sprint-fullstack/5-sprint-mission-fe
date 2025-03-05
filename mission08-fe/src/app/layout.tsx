import "./globals.css";
import { pretendard } from "@/fonts/font";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import ScrollToTop from "@/layouts/ScrollToTop";
import { Providers } from "../contexts/tanstack-query-providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard`}>
      <body className="relative">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
