import { apiClientList } from "./apiClient";

/**
 * 게시글을 수정합니다.
 * @param page - 페이지 번호 (default: 1)
 * @param pageSize - 페이지 당 상품 수 (default: 10)
 * @param orderBy - 정렬 기준 (available: favorite, recent; default: recent)
 * @param keyword - 검색 키워드 (default: keyword)
 */
export async function ProductList({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "keyword",
} = {}) {
  const response = await apiClientList.codeitApiClient.get(`/products`, {
    params: {
      page,
      pageSize,
      orderBy,
      keyword,
    },
  });
  return response.data;
}

export const ItemsList = {
  ProductList,
};
