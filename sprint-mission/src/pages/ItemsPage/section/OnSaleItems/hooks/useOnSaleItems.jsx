import { getItemsListAPI } from "../../../../../utils/APIs/getItemsListAPI";
import { useEffect, useState } from "react";

export const useOnSaleItems = (params) => {
  const [productList, setProductList] = useState([]); //변한 상태에 따라 새로 불러온 상품 목록 전달
  const [totalPageCount, setTotalPageCount] = useState(1); //스크린사이즈에 따라 pageSize달라지므로, 전체 페이지 수도 달라짐

  //판매 중인 상품 목록 불러오기 비동기 함수
  const fetchOnSaleItemsData = async () => {
    try {
      const itemsData = await getItemsListAPI(params);
      setProductList(itemsData.list); //상품 목록 업데이트
      setTotalPageCount(Math.ceil(itemsData.totalCount / params.pageSize));
    } catch (err) {
      console.log("상품 목록 불러오기 오류:", err);
    }
  };

  //params 바뀔 때마다 상품 목록 재호출
  useEffect(() => {
    fetchOnSaleItemsData();
  }, [params]);

  return {
    productList,
    totalPageCount,
  };
};
