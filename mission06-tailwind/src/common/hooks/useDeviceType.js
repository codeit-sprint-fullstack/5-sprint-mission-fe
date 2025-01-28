import { useState, useEffect } from "react";
import useDebounce from "./useDebounce.js";

function useDeviceType() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const debouncedWidth = useDebounce(windowWidth, 100); // 100ms 디바운스
  const [deviceType, setDeviceType] = useState(
    getDeviceType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDeviceType(getDeviceType(debouncedWidth));
  }, [debouncedWidth]);

  function getDeviceType(width) {
    if (width >= 1200) return "PC";
    if (width >= 744) return "Tablet";
    return "Mobile";
  }

  return deviceType;
}

export default useDeviceType;
