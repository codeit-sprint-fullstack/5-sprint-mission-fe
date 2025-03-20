import "@/styles/globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ArticleProvider from "@/context/ArticleContext";
import ProductProvider from "@/context/ProductContext";
import { useRouter } from "next/router";
import { ProductContext } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  const route = useRouter();
  const inLoginPage = route.pathname === "/login";
  if (inLoginPage) {
    return <Component {...pageProps} />;
  }
  const inSignUpPage = route.pathname === "/signup";
  if (inSignUpPage) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <AuthProvider>
        <ArticleProvider>
          <ProductProvider>
            <div className="min-h-screen flex flex-col">
              <Nav />
              <main className="flex-1">
                <Component {...pageProps} />
              </main>
              <Footer />
            </div>
          </ProductProvider>
        </ArticleProvider>
      </AuthProvider>
    </>
  );
}
