import React from "react";
import "./styles.css";
import MarkeHeader from "./components/MarkeHeader.jsx";
import BestProducts from "./components/BestProducts.jsx";
import SaleProducts from "./components/SaleProducts.jsx";
import PageBar from "./components/PageBar.jsx";
import MarkeFooter from "./components/MarkeFooter.jsx";

function App() {
  return (
    <div className="app-container">
      <MarkeHeader />
      <main className="main">
        <BestProducts />
        <SaleProducts />
        <PageBar />
      </main>
      <MarkeFooter />
    </div>
  );
}

export default App;
