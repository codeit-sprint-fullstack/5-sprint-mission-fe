import api from "./apiClient";

const productService = {
  /**
   * ✅ 상품 목록 조회
   * @param {number} page - 페이지 번호
   * @param {number} pageSize - 한 페이지에 보여줄 개수
   * @param {string} orderBy - 정렬 기준 (예: 'favorite', 'recent' 등)
   * @returns {Promise<{list: object[], totalCount: number}>} - 상품 목록 및 총 개수
   */
  getProducts: async (page = 1, pageSize = 10, orderBy = "favorite") => {
    console.log("🚀 상품 목록 조회:", "page:", page, "pageSize:", pageSize, orderBy);
    try {
      return await api.get("/products", { page, pageSize, orderBy });
    } catch (error) {
      console.error("❌ 상품 목록 조회 실패:", error);
      throw error;
    }
  },
};

export default productService;