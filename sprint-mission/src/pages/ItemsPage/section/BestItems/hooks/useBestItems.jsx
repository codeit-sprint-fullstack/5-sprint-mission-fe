import {
  getItemsListAPI,
  ORDER_BY,
} from "../../../../../utils/APIs/getItemsListAPI";
import { useEffect, useState } from "react";

export const useBestItems = (pageSize) => {
  const [productList, setProductList] = useState([]);

  //베스트상품 목록 불러오기 비동기 함수
  const fetchBestItemsData = async () => {
    const params = {
      page: 1,
      pageSize, //파라미터로 전달받은, usePageSize로 변경된 pageSize 쿼리로 전달
      orderBy: ORDER_BY.FAVORITE.value, //정렬 기준: 베스트상품
    };

    try {
      const itemsData = await getItemsListAPI(params);
      setProductList(itemsData.list); //상품 목록 업데이트
    } catch (err) {
      console.log("상품 목록 불러오기 오류:", err);
    }
  };

  //화면 크기 바뀔 때마다 pageSize변경된 params로 상품 목록 재호출
  useEffect(() => {
    fetchBestItemsData();
  }, [pageSize]);

  return {
    productList,
  };
};
