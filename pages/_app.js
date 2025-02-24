import "@/styles/globals.css";
import Nav from "./components/Nav";
import Footer from "./components/footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
