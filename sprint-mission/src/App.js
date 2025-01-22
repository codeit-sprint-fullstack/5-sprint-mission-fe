import { Routes, Route } from "react-router-dom";
import RootLayout from "./shared/ui/RootLayout";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { ItemsPage } from "./pages/ItemsPage/ItemsPage";
import { RegistrationItemsPage } from "./pages/RegistrationItemsPage/RegistrationItemsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="items" element={<ItemsPage />} />
        {/* <Route path="items/:id" element={<ItemDetailPage />} /> */}
        <Route path="registration" element={<RegistrationItemsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
