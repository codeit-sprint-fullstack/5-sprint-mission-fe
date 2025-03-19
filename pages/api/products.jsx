import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async ({ page = 1, pageSize = 10 }) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: {
        page, // 페이지 번호
        pageSize, // 한 페이지당 상품 개수
      },
    });

    return response.data; // { list: [], totalCount: 100 } 형태로 반환
  } catch (error) {
    console.error("상품 데이터를 불러오는 중 오류 발생:", error);
    return { list: [], totalCount: 0 };
  }
};

// 상품 상세 정보 불러오기
export const fetchProductById = async (productId) => {
  const response = await axios.get(`${API_URL}/products/${productId}`);
  return response.data;
};

// 상품 댓글 조회
export const fetchProductComments = async (productId, limit = 5) => {
  try {
    const response = await axios.get(
      `${API_URL}/products/${productId}/comments`,
      { params: { limit } }
    );
    return response.data;
  } catch (error) {
    console.error("댓글 불러오기 실패", error.response?.data || error);
    throw error;
  }
};
