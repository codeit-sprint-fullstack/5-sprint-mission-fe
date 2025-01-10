import axios from "axios";

const BASE_URL = "https://panda-market-api.vercel.app/products";

export const getProductList = async (page, pageSize, orderBy, keyword = "") => {
  try {
    const res = await axios.get(`${BASE_URL}`, {
      params: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        keyword: keyword,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch product list:", error);
    return { products: [] };
  }
};

export const getProduct = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("상품을 찾을 수 없음", error);
    console.log("상품 상세 조회 실패!", error.message);
  }
};
