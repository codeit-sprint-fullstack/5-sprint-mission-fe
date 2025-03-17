import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient();
// 윽 어려워

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
