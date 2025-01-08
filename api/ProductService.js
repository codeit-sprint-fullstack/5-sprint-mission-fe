import axios from "axios";

const productAxios = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/products",
  headers: { "Content-Type": "application/json" },
});

/**
 * @param {number} page - 기본적인 페이지 구분 숫자 (기본값은 1)
 * @param {number} pageSize - 한페이지에 보여질 개수 (기본값은 100)
 * @param {string} keyword - title 및 description에 같은 문구가 있는 목록만 filter (기본값은 공백)
 */

const getProductList = async (page = 1, pageSize = 100, keyword = " ") => {
  const params = { page, pageSize, keyword };
  try {
    const res = await productAxios.get("", { params });
    const result = res.data;
    return result;
  } catch (error) {
    console.log("error : ", error);
    return error;
  }
};
/**
 * @param {number} id - 가져올 porduct의 id값
 */
const getProduct = async (id) => {
  try {
    const res = await productAxios(`/${id}`);
    const result = res.data;
    return result;
  } catch (error) {
    console.log("error : ", error);
    return error;
  }
};

/**
 * @param {string} name - 상품의 이름
 * @param {string} description - 상품 설명
 * @param {number} price - 상품 가격 100원 이하는 안들어가는 듯함
 * @param {string[]} tags - 상품 태그
 * @param {string[]} images - 삼품 이미지들
 *
 */
const createProduct = async (
  name = "",
  description = "",
  price = 0,
  tags = [""],
  images = [""]
) => {
  const data = { name, description, price, tags, images };
  try {
    const res = await productAxios.post("", data);
    return res;
  } catch (error) {
    console.log("error :", error);
    return error;
  }
};

/**
 * @param {number} id - 수정할 상품의 id
 * @param {string} name - 수정된 상품의 이름
 * @param {string} description - 수정된 상품의 설명
 * @param {string} price - 수정된 상품의 가격
 * @param {string[]} tags - 수정된 상품의 태그
 * @param {string[]} images - 수정된 상품의 이미지들
 */
const patchProduct = async (id, name, description, price, tags, images) => {
  const data = { name, description, price, tags, images };
  try {
    const res = await productAxios.patch(`/${id}`, data);
    return res;
  } catch (error) {
    console.log("error :", error);
  }
};

/**
 * @param {number} id - 삭제할 상품의 id
 */

const deleteProduct = async (id) => {
  try {
    const res = await productAxios.delete(`/${id}`);
    return res;
  } catch (error) {
    console.log("error :", error);
    return error;
  }
};

const product = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};

export { product };
