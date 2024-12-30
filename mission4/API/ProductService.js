import axios from "axios";

const BASE_URL = "'https://sprint-mission-api.vercel.app/products";


// Axios GET 요청 - 쿼리 파라미터 포함
export const getProductList = async(page = 1, pageSize = 10, keyword = "") => {
  try {
    const response = await axios.get (BASE_URL, {
      params: {page, pageSize, keyword},
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const getProduct = async(id) => {
  try {
    const response = await axios.get(`${BASE_URL},${id}`);
    return response.data
  } catch (error) {
    console.error("Error:", error.message);
  }
}

  // Axios POST 요청 - 데이터 전송
  export const createProduct = async(name, description, price, tags, images) => {
    try {
      const response = await axios.post(BASE_URL, {
        name,
        description,
        price,
        tags,
        images
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

// Axios PATCH 요청 - 데이터 수정
export const patchProduct = async (id, updatedFields) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Axios DELETE 요청
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};
