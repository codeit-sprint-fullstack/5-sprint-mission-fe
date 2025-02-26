import Header from "@/layouts/Header";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/layouts/Footer";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

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
