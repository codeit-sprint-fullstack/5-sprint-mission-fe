import { Routes, Route } from "react-router-dom";
import { Home } from "./home";
import { Market } from "./market";
import { Registration } from "./registration";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Market />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
};

export default Routing;
