import axios from "axios";

axios.defaults.baseURL = "https://sprint-mission-api.vercel.app";

/** 게시글 리스트 조회
* @param        { page:1,   pageSize:100, keyword:"테스트" }
* @description - { 페이지,     페이지사이즈,     검색키워드  }
*                {  int          int           String    }
**/
export async function getArticleList(param) {
  const response = axios
    .get(
      `/articles?page=${param.page}&pageSize=${param.pageSize}&keyword=${param.keyword}`
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data.message));
  return response;
}

/** 게시글 상세 조회
* @param param -  id
* @description - 아이디
*                 int
**/
export async function getArticle(id) {
  const response = axios
    .get(`/articles/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data.message));
  return response;
}

/** 게시글 생성
* @param         { name  ,  content  ,  img   }
* @description - { 제목   ,   본문      이미지  }
*                { String    String    String }
**/
export async function createArticle(param) {
  const response = axios
    .post("/articles", {
      title: param.title,
      content: param.content,
      image: param.image,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data.message));
  return response;
}

/** 게시글 수정
* @param         { name  ,  content  ,  img   }
* @description - { 제목   ,   본문      이미지  }
*                { String    String    String }
**/
export async function patchArticle(param, id) {
  const response = axios
    .patch(`/articles/${id}`, {
      title: param.title,
      content: param.content,
      image: param.image,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data.message));
  return response;
}

/** 게시글 삭제
* @param          id
* @description - 아이디
*                 int
**/
export async function deleteArticle(id) {
  const response = axios
    .delete(`/articles/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data.message));
  return response;
}

export const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
