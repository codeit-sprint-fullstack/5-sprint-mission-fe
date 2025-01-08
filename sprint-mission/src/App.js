import { Routes, Route } from "react-router-dom";
import RouteLayout from "./shared/RouteLayout";
import { ItemsPage } from "./pages/ItemsPage/ItemsPage";

function App() {
  return (
    <Routes>
      {/* TODO: "/" element <LandingPage />로 수정 */}
      {/* TODO: <ItemsPage /> path "/items"로 수정 */}
      <Route
        path="/"
        element={
          <RouteLayout>
            <ItemsPage />
          </RouteLayout>
        }
      />
    </Routes>
  );
}

export default App;
