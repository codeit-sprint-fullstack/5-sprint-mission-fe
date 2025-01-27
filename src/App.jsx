import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./page/main/main.jsx";
import ItemsPage from "./page/itemsPage/ItemsPage.jsx";
import RegistrationPage from "./page/registrationPage/RegistrationPage.jsx";
import ProductRegistration from "./page/productRegistration/ProductRegistration.jsx";
import "./index.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/productRegistration" element={<ProductRegistration />} />
    </Routes>
  </Router>
);

export default App;
