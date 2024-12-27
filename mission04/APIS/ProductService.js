import { getList, getItem, createItem, patchItem, deleteItem } from "./service.js";

const baseUrl = `https://sprint-mission-api.vercel.app/products`;

export const getProductList = (params) => {
  // 상품 목록 조회
  return getList(baseUrl, params);
};

export const getProduct = async (id) => {
  // 상품 상세 조회
  return getItem(baseUrl, id);
};

export const createProduct = async (params) => {
  // 상품 등록
  return createItem(baseUrl, params);
};

export const patchProduct = async (id, params) => {
  // 게시글 수정
  return patchItem(baseUrl, id, params);
};

export const deleteProduct = (id) => {
  // 게시글 삭제
  deleteItem(baseUrl, id);
};
