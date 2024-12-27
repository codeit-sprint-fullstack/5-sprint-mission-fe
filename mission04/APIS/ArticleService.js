import { getList, getItem, createItem, patchItem, deleteItem } from "./service.js";

const baseUrl = `https://sprint-mission-api.vercel.app/articles`;

export const getArticleList = (params) => {
  // 게시글 목록 조회
  return getList(baseUrl, params);
};

export const getArticle = async (id) => {
  // 게시글 상세 조회
  return getItem(baseUrl, id);
};

export const createArticle = async (params) => {
  // 게시글 등록
  return createItem(baseUrl, params);
};

export const patchArticle = async (id, params) => {
  // 게시글 수정
  return patchItem(baseUrl, id, params);
};

export const deleteArticle = (id) => {
  // 게시글 삭제
  deleteItem(baseUrl, id);
};
