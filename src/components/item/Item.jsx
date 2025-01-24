import { Header } from "./header/Header.jsx";
import { Content } from "./content/Content.jsx";
import { Footer } from "./footer/Footer.jsx";
// import "./index.css";
export function Item() {
  return (
    <div id="item">
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  );
}
