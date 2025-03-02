import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Layout from "@/components/layout/Layout";
import Head from "next/head";

const cache = createCache({
  key: "next",
  prepend: true,
});

export default function App({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/panda_face.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  );
}
