import axios from "axios";

export async function fetchProducts(sortBy = "favoriteCount", order = "desc") {
  try {
    const response = await axios.get(
      `https://panda-market-api.vercel.app/products`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    } // 응답 상태 코드가 200이 아닐 경우 에러를 발생시킵니다.
    return response.data; // 응답 데이터(상품 목록)를 반환
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw error;
  }
}
