import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Main.css";
import App from "./common/App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ItemsPage from "./pages/ItemsPage/ItemsPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":itemId" element={<ItemPage />} />
          </Route>
          <Route path="registration" element={<RegistrationPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
