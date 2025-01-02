// 게시글 APIs
import Service from "./service.js";

const endPoint = "articles";
const articleService = new Service(endPoint); // 게시글 서비스 객체 생성

const getArticleList = articleService.getResourceList;
const getArticle = articleService.getResource;
const createArticle = articleService.createResource;
const patchArticle = articleService.patchResource;
const deleteArticle = articleService.deleteResource;

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
