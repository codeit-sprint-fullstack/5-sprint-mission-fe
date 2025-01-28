import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function App({ children }) {
  const [isHeaderMenuVisible, setIsHeaderMenuVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/"
      ? setIsHeaderMenuVisible(() => false)
      : setIsHeaderMenuVisible(() => true);
  }, [location]);

  return (
    <>
      <Header isMenuVisible={isHeaderMenuVisible} />
      {children}
      <Footer />
    </>
  );
}

export default App;
