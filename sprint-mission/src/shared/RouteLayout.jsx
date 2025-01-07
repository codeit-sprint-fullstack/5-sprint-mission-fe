import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

export function RouteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RouteLayout;
