"use client";

import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

export default function useDeviceType() {
  // 클라이언트에서만 window 객체를 사용할 수 있도록 처리
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const debouncedWidth = useDebounce<number | undefined>(windowWidth, 100); // 100ms 디바운스
  const [deviceType, setDeviceType] = useState<string>("Mobile");

  useEffect(() => {
    // window 객체는 클라이언트 측에서만 존재하므로, typeof window !== "undefined"로 체크
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);

      // 초기값 설정
      setWindowWidth(window.innerWidth);

      // 리사이즈 이벤트 리스너 등록
      window.addEventListener("resize", handleResize);

      // 클린업
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (debouncedWidth !== undefined) {
      setDeviceType(getDeviceType(debouncedWidth));
    }
  }, [debouncedWidth]);

  function getDeviceType(width: number) {
    if (width >= 1200) return "PC";
    if (width >= 744) return "Tablet";
    return "Mobile";
  }

  return deviceType;
}
