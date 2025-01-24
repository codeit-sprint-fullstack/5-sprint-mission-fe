import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./home/Home.jsx";
import { Item } from "./item/Item.jsx";
import { Register } from "./register/Register.jsx";
import { Detail } from "./detail/Detail.jsx";
// import "./main.css";

export function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}
