import "@/styles/globals.css";
import Nav from "./components/Nav";
import Footer from "./components/footer";
import ArticleProvider from "@/context/ArticleContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ArticleProvider>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </ArticleProvider>
    </>
  );
}
