import { useEffect, useState } from "react";

const BREAKPOINTS = {
  MOBILE: 743,
  TABLET: 1199,
};

//TODO: 더 이쁘게 만들수있는방법 고민해보기~
export const SCREEN_SIZES = {
  MOBILE: "MOBILE",
  TABLET: "TABLET",
  DESKTOP: "DESKTOP",
};

//분기 포인트에 따라 스크린사이즈 상태 리턴
const getScreenSize = () => {
  const width = window.innerWidth;

  if (width <= BREAKPOINTS.MOBILE) return SCREEN_SIZES.MOBILE;
  if (width <= BREAKPOINTS.TABLET) return SCREEN_SIZES.TABLET;
  return SCREEN_SIZES.DESKTOP;
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  //window객체에 스크린사이즈 변경 이벤트 핸들러 등록
  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

//TODO: 리사이즈를 계속 감지하면 버벅일것. 심하면 아래 방식으로 해결해보자.
//디바운스/ 메모리제이션? useCallback/
