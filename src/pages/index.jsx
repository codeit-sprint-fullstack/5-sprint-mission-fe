import { Header } from "widgets/header";
import Footer from "widgets/footer/ui";
import { Routes, Route } from "react-router-dom";
import { Home } from "./home";

const Routing = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Routing;
