import { useScreenSize } from "./useScreenSize";
import { useEffect, useState } from "react";

export const usePageSize = (SCREEN_SIZES_TO_PAGE_SIZE) => {
  const screenSize = useScreenSize();
  const [pageSize, setPageSize] = useState(
    SCREEN_SIZES_TO_PAGE_SIZE[screenSize]
  ); //상품 카드 반응형 상태 관리

  //스크린사이즈에 따라 서버에서 받아오는 데이터 개수 변경
  useEffect(() => {
    setPageSize(SCREEN_SIZES_TO_PAGE_SIZE[screenSize]);
  }, [screenSize]);

  return {
    pageSize,
  };
};
