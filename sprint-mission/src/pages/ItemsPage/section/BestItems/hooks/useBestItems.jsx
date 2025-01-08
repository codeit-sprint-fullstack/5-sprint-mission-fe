import {
  getItemsListAPI,
  ORDER_BY,
} from "../../../../../utils/APIs/getItemsListAPI";
import {
  useScreenSize,
  SCREEN_SIZES,
} from "../../../../../shared/hooks/useScreenSize";
import { useEffect, useState } from "react";

const SCREEN_SIZES_TO_PAGE_SIZE = {
  [SCREEN_SIZES.MOBILE]: 1,
  [SCREEN_SIZES.TABLET]: 2,
  [SCREEN_SIZES.DESKTOP]: 4,
};

export const useBestItems = () => {
  const screenSize = useScreenSize();
  const [pageSize, setPageSize] = useState(
    SCREEN_SIZES_TO_PAGE_SIZE[screenSize]
  );
  const [productList, setProductList] = useState([]);

  //베스트상품 목록 불러오기 비동기 함수
  const fetchBestItemsData = async () => {
    const params = {
      page: 1,
      pageSize, //setPageSize로 변경된 pageSize 쿼리로 전달
      orderBy: ORDER_BY.FAVORITE.value, //정렬 기준: 베스트상품
    };

    try {
      const itemsData = await getItemsListAPI(params);
      setProductList(itemsData.list); //상품 목록 업데이트
    } catch (err) {
      console.log("상품 목록 불러오기 오류:", err);
    }
  };

  //스크린사이즈에 따라 서버에서 받아오는 데이터 개수 변경
  useEffect(() => {
    setPageSize(SCREEN_SIZES_TO_PAGE_SIZE[screenSize]);
  }, [screenSize]);

  //화면 크기 바뀔 때마다 pageSize변경된 params로 상품 목록 재호출
  useEffect(() => {
    fetchBestItemsData();
  }, [pageSize]);

  return {
    productList,
  };
};
