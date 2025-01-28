import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./common/layouts/Footer";
import Header from "./common/layouts/Header";
import Intro from "./pages/Intro";
import Items from "./pages/Items";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Registration from "./pages/Registration";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/items" element={<Items />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
