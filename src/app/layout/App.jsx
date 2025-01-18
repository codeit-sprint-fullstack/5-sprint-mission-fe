import "../styles/App.css";
import Footer from "../../widgets/Footer/Footer.jsx";
import Header from "../../widgets/Header/Header.jsx";
import LandingPage from "../../pages/LandingPage/LandingPage.jsx";
import ProductListPage from "../../pages/ProductListPage/ProductListPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPostPage from "../../pages/ProductPostPage/ProductPostPage.jsx";

export default function App() {
  return (
    <Router>
      <div className="pt-[70px]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/items" element={<ProductListPage />} />
            <Route path="/registration" element={<ProductPostPage />} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
