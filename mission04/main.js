/*
해결해야할 과제 1 : 로깅
*/

import { articleService } from "./ArticleService.js";
import { productService } from "./ProductService.js";
import axios from "axios";

//axios instance 생성 후 설정
export const instance = axios.create({
  timeout: 10000,
})

instance.defaults.baseURL = "https://sprint-mission-api.vercel.app";

instance.interceptors.request.use(
  (config) => {
    // 요청 전달 전 수행
    console.log("서버에 연결하는 중입니다...");
    return config;
  }, (error) => {
    // 요청 오류가 있으면 수행
    console.log("request 에러");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("response 정상적으로 확인")
    return response;
  }, (error) => {
    console.log("response 에러")
    return Promise.reject(error);
  }
)
//


//메인 함수
async function mainFunc() {

  await articleService.getArticleList(args.forGetArticleList);

}

//인자 모음
const args = {
  forGetArticleList: {
    page: 1,
    pageSize: 100,
    keyword: "테스트",
  },

  forCreateArticle: {
    title: "제목",
    content: "콘텐츠",
    image: "이미지",
  },

  forPatchArticle: {
    title: "제목",
    content: "콘텐츠",
    image: "이미지",
  },

  forGetProductList: {
    page: 1,
    pageSize: 100,
    keyword: "테스트",
  },

  forCreateProduct: {
    name: "상품 이름",
    description: "상품 설명",
    price: 10000,
    manufacturer: "제조 업체",
    tags: ["태그"],
    images: ["이미지"],
  },

  forPatchProduct: {
    name: "상품 이름",
    description: "상품 설명",
    price: 10000,
    manufacturer: "제조 업체",
    tags: ["태그"],
    images: ["이미지"],
  },
};


//에러 핸들링
export function errHandle(e) {
  console.log(e.response.status, "에러 : 서버와 연결 중 오류가 발생했습니다.");
  return e;
}

await mainFunc();

