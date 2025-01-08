import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./pages/Items";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Items />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
