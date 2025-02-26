import Header from "@/layouts/Header";
import "./globals.css";
import Footer from "@/layouts/Footer";
import { pretendard } from "@/app/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
