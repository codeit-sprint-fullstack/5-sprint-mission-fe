import { Header } from "./header/Header.jsx";
import { Main } from "./main/Main.jsx";
import { Footer } from "./footer/Footer.jsx";
import "./App.css";

function App() {
  console.log("App");
  return (
    <div id="app">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
