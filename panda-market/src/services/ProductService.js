import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://panda-market-t9vr.onrender.com",
});

const productService = {
  getProductList,
  getProductById,
  postNewProduct,
};

async function getProductList({
  sort = "recent",
  offset = 0,
  limit = 10,
  keyword = "",
} = {}) {
  const searchParams = { sort, offset, limit, keyword };
  try {
    const res = await instance.get("items/", { params: searchParams });
    return res.data;
  } catch (e) {
    console.log(e.response);
    return e;
  }
}

async function getProductById(id) {
  try {
    const res = await instance.get(`items/${id}`);
    return res.data;
  } catch (e) {
    return e;
  }
}

async function postNewProduct({ name, description, price, tags }) {
  try {
    const res = await instance.post("registration/", {
      name,
      description,
      price,
      tags,
    });
    const result = res.data;
    return result;
  } catch (e) {
    console.log(e.response);
    return e;
  }
}

export default productService;
