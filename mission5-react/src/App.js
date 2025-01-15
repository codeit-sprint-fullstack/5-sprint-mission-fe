import "./App.css";

import Navigation from "./Common/Navigation/Navigation";
import Product from "./Feature/Product/Product";
import Footer from "./Common/Footer/Footer";

function App() {
  return (
    <div className="containerAll">
      <header className="containerHeader">
        <Navigation />
      </header>
      <main className="containerMain">
        <Product />
      </main>
      <footer className="containerFooter">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
