import Container from "@components/Container";
import Footer from "@components/Footer";
import Header from "@components/Header";
import "@styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@contexts/AuthProvider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const pagesWithSimpleHeader = ["/"];

  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header
            variant={
              pagesWithSimpleHeader.includes(router.pathname)
                ? "simple"
                : "full"
            }
          />
          <div className="flex flex-col min-h-screen">
            <Container page>
              <Component {...pageProps} />
            </Container>
            <Footer />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
