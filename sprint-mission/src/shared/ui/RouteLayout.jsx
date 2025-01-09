import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

//FIXME: root div아래에 의미없는 div를 하나 더 생성하고 싶지 않아서 <>로 감쌌는데 괜찮은지 모르겠다! -> Layout으로 감싸보자.
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
