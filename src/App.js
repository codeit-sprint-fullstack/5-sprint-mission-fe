import "./App.css"; //폰트
import Footer from "./components/Footer";
import Items from "./components/Items";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/products/Registration";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}
export default App;
