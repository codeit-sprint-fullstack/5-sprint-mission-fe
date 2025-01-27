import axios from "axios";

const BASE_URL = "https://five-sprint-mission-be-jswo.onrender.com/product";

// 상품 목록 조회
export const fetchProductList = async (
  page,
  pagesize,
  orderBy,
  keyword = ""
) => {
  try {
    const res = await axios.get(`${BASE_URL}`, {
      params: {
        page: page,
        pagesize: pagesize,
        orderBy: orderBy,
        keyword: keyword,
      },
    });
    console.log("res.data", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product list:", err);
    return console.log("error", err);
  }
};

//상품 등록 name, description, price, tags
export const createProduct = async (productData) => {
  try {
    const res = await axios.post(`${BASE_URL}`, {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      tags: productData.tags,
    });
    console.log("res.data", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product list:", err);
    return console.log("error", err);
  }
};

//상품 상세 조회
export const fetchProductDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product list:", err);
    return console.log("error", err);
  }
};
