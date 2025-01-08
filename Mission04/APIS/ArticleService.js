import axios from "axios";
import { instance } from "../../main.js";

// GET method 파라미터 초기화 함수
const initParams = (params) => params || {};

// 게시글 목록 조회
const getArticleList = async (params) => {
  const endPoint = `/articles`;
  return await instance
    .get(endPoint, {
      params: initParams(params),
    })
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(`게시글 목록 조회 실패: ${e.message}`);
    });
};

//게시글 상세 조회(ID로)
const getArticle = async (id) => {
  if (!id) {
    return Promise.reject(new Error("Invalid ID"));
  }
  const endPoint = `/articles/${id}`;
  return await instance
    .get(endPoint)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(`게시글 상세 조회 실패: ${e.message}`);
    });
};

//게시글 등록
const createArticle = async (data) => {
  const endPoint = `/articles`;
  const fields = errorChecks.required_fields.articles;
  errorChecks.verifyFields(data, fields);
  errorChecks.verifyData(data, fields);

  return await instance
    .post(endPoint, data)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(`게시글 등록 실패: ${e.message}`);
    });
};

// 게시글 수정
const patchArticle = async ({ id, data }) => {
  if (!id) {
    return Promise.reject(new Error("Invalid ID"));
  }
  const endPoint = `/articles/${id}`;
  // const fields = errorChecks.required_fields.articles;
  // errorChecks.verifyData(data, fields);
  return await instance
    .patch(endPoint, data)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(`게시글 수정 실패: ${e.message}`);
    });
};

//게시글 삭제
const deleteArticle = async (id) => {
  if (!id) {
    return Promise.reject(new Error("Invalid ID"));
  }
  const endPoint = `/articles/${id}`;
  return await instance
    .delete(endPoint)
    .then((res) => res.data)
    .then((res) => {
      console.log("Article deleted successfully");
      return res.data;
    })
    .catch((e) => {
      throw new Error(`게시글 삭제 실패: ${e.message}`);
    });
};

const ArticleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

export default ArticleService;
