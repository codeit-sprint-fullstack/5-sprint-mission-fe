/*
해결해야할 과제 1 : 로깅
*/
import { createAxiosInstance } from "./axiosFunc.js";
import { articleService } from "./ArticleService.js";
// import { productService } from "./ProductService.js";

export const sprint = await createAxiosInstance("https://sprint-mission-api.vercel.app");

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
export function errHandle(err) {
  try{
    console.log(err.response.status, "에러 : 서버와 연결 중 오류가 발생했습니다.");
  } catch(e){
    console.log("등록되지 않은 오류 발생!")
  }
  return err;
}

await mainFunc();

