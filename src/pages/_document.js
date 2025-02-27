import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Pretendard CSS CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
