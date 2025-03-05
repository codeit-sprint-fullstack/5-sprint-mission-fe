import "@/styles/globals.css";
import Nav from "./components/Nav";
import Footer from "./components/footer";
import ArticleProvider from "@/context/ArticleContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ArticleProvider>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ArticleProvider>
    </>
  );
}
