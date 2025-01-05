import axios from "axios";

export const productService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/",
});

const endpoint = "products/";

const messages = {
  error: {
    getProductList: "물품 목록을 불러오는데 실패했습니다.",
    getProduct: "물품 정보를 불러오는데 실패했습니다.",
    createProduct: "새로운 물품을 생성하는데 실패했습니다.",
    patchProduct: "물품 정보를 수정하는데 실패했습니다.",
    deleteProduct: "물품을 삭제하는데 실패했습니다.",
  },
  success: {
    deleteProduct: "게시글을 삭제하였습니다.",
  },
};

function getErrorMessage(e, message) {
  const errorMessage = {
    message,
    "상태 코드": e.response.status,
  };
  if (e.response.data.message) {
    errorMessage["오류 내용"] = e.response.data.message;
  }
  return errorMessage;
}

async function getProductList({ page = 1, pageSize = 100, keyword = "" } = {}) {
  const searchParams = { page, pageSize, keyword };
  try {
    const res = await instance.get(endpoint, { params: searchParams });
    return res.data;
  } catch (e) {
    return getErrorMessage(e, messages.error.getProductList);
  }
}

async function getProduct(id) {
  try {
    const res = await instance.get(`${endpoint}${id}`);
    return res.data;
  } catch (e) {
    return getErrorMessage(e, messages.error.getProduct);
  }
}

async function createProduct({
  name,
  description,
  price,
  manufacturer,
  tags,
  images,
}) {
  try {
    const res = await instance.post(endpoint, {
      name,
      description,
      price,
      manufacturer,
      tags,
      images,
    });
    return res.data;
  } catch (e) {
    return getErrorMessage(e, messages.error.createProduct);
  }
}

async function patchProduct(
  id,
  { name, description, price, manufacturer, tags, images }
) {
  try {
    const res = await instance.patch(`${endpoint}${id}`, {
      name,
      description,
      price,
      manufacturer,
      tags,
      images,
    });
    return res.data;
  } catch (e) {
    return getErrorMessage(e, messages.error.patchProduct);
  }
}

async function deleteProduct(id) {
  try {
    const res = await instance.delete(`${endpoint}${id}`);
    return messages.success.deleteProduct;
  } catch (e) {
    return getErrorMessage(e, messages.error.deleteProduct);
  }
}
