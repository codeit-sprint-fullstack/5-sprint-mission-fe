import { useState, useEffect } from "react";

export const useScreenType = () => {
  const getScreenType = (width) => {
    if (width >= 1200) {
      return "desktop";
    } else if (width < 1200 && width >= 744) {
      return "tablet";
    } else if (width < 744) {
      return "mobile";
    }
  };

  const [screenType, setScreenType] = useState(() =>
    getScreenType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      const currentWindowSize = window.innerWidth;
      const currentScreenType = getScreenType(currentWindowSize);
      setScreenType(currentScreenType);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenType;
};
