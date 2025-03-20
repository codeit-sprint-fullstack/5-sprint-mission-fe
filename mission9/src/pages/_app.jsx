import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const cache = createCache({
  key: "next",
  prepend: true,
});

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5분
            // 에러 핸들링
            onError: (error) => {
              console.error("Query Error:", error);
            },
            // 서스펜스 모드 활성화
            suspense: false,
          },
          mutations: {
            // 에러 핸들링
            onError: (error) => {
              console.error("Mutation Error:", error);
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
