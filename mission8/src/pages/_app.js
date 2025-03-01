import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Layout from "@/components/layout/Layout";

const cache = createCache({
  key: "next",
  prepend: true,
});

export default function App({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  );
}
