import React from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import ItemPage from "./pages/items";
import RegistrationPage from "./pages/registration";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="items" element={<ItemPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
