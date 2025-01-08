import {
  useScreenSize,
  SCREEN_SIZES,
} from "../../../../../shared/hooks/useScreenSize";
import { useEffect, useState } from "react";

const SCREEN_SIZES_TO_PAGE_SIZE = {
  [SCREEN_SIZES.MOBILE]: 4,
  [SCREEN_SIZES.TABLET]: 6,
  [SCREEN_SIZES.DESKTOP]: 10,
};

export const usePageSize = () => {
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
