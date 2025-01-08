import { instance } from "./axiosInstance";

/** 상품 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {int} params.pageSize - 페이지 당 상품 수
 * @param {string} params.orderBy - 정렬 기준(recent, favorite)
 * @param {string} params.keyword - 검색 키워드
 */
export const getItemsListAPI = async (params = {}) => {
  //쿼리 기본값
  const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = params;

  try {
    const response = await instance.get("/products", {
      params: { page, pageSize, orderBy, keyword },
    });
    console.log("getItemsList", response.data);
    return response.data;
  } catch (err) {
    console.log("error: ", err);
  }
};

export const ORDER_BY = {
  FAVORITE: "favorite",
  RECENT: "recent",
};
