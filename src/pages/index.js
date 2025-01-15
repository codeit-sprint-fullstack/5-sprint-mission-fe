import { Routes, Route } from "react-router-dom";
import Market from "./Market";
import "./index.css";

const Page = () => {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Market />}></Route>
        <Route path="/comunity" element={<Market />}></Route>
        <Route path="/policy" element={<Market />}></Route>
        <Route path="/faq" element={<Market />}></Route>
      </Routes>
    </div>
  );
};

export default Page;
