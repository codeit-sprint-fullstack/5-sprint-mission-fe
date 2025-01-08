import ArticleService from "./Mission04/APIS/ArticleService.js";
import ProductService from "./Mission04/APIS/ProductService.js";
import axios from "axios";
import { getProductList } from "./Mission04/APIS/getProductList.js";

export const instance = axios.create({
  baseURL: `https://sprint-mission-api.vercel.app`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
  };
  return config;
});

instance.interceptors.response.use(
  (response) => response, // Pass successful responses directly
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 404) {
        return Promise.reject(new Error("404 Page Not Found"));
      }
    }
    // Handle other errors normally
    return Promise.reject(error);
  }
);

// //게시글 목록 조회
// console.log("GET /articleList");
// const testParams = { page: 1, size: 10 }; // 테스트용 파라미터

// try {
//   const articleList = await ArticleService.getArticleList(testParams);
//   console.log("게시글 목록 조회 성공:", articleList);
// } catch (error) {
//   console.error("게시글 목록 조회 실패:", error.message);
// }

//게시글 상세 조회
// console.log("GET /articles/:id");
// let testArticleId = 1690;
// let survey = await ArticleService.getArticle(testArticleId);
// console.log(survey);

//게시글 등록
// let article = await ArticleService.createArticle({
//   title: "제주도는 귤이 화폐",
//   content: `한라봉`,
//   image: "img-url-1",
// });
// console.log("create article: ", article);

// console.log("POST /articles");
// const surveyData = {
//   title: "5기 화이팅",
//   content: "ㅎㅎ",
//   image: "img",
// };
// const newSurvey = await ArticleService.createArticle(surveyData);
// console.log("create article: ", newSurvey);

//게시글 수정
// let article = await ArticleService.patchArticle({
//   id: "1690",
//   data: {
//     title: "고등어회",
//     content: "고등어도 맛있다",
//   },
// });
// console.log("patch article: ", article);

// console.log("PATCH /articles/:id");
// const updateData = {
//   title: "React",
//   content: "안녕 리액트 ",
//   image: "img",
// };

// const updatedArticle = await ArticleService.patchArticle({
//   id: 1690,
//   data: updateData,
// });
// console.log("updated successfully", updatedArticle);

// let testArticleId = 1690; //
// console.log(await ArticleService.getArticle(testArticleId));
// ArticleService.deleteArticle(testArticleId);
// console.log(ArticleService.getArticle(testArticleId));

// console.log("GET /articles/:id");
// let testArticleId = 1690; //
// let survey = await ArticleService.getArticle(testArticleId);
// console.log(survey);

// //getProcutList test
// const params = { offset: 3, limit: 1 };
// console.log("GET /productList");
// console.log("-----------------------------------------------");
// const productList = await ProductService.getProductList({ params });
// console.log(productList);
// console.log("-----------------------------------------------");

// console.log("GET /products/:id");

// const productId = 883;
// console.log(`Fetching product with ID: ${productId}`);

// const product = await ProductService.getProduct({ id: productId }); // id 값 object로 전달

// console.log("-----------------------------------------------");
// console.log("상품 상세조회 결과", product);

// console.log("POST /products");
// const productData = {
//   name: "제주감귤3",
//   description: "안녕",
//   price: 5000,
//   manufacturer: "제주도",
//   tags: ["제주여행"],
//   images: ["이미지-url-1", "이미지-url-2"],
// };

// const result = await ProductService.createProduct({ data: productData });
// console.log("Created product:", result);

// console.log("DELETE /products");

// const productId = 883;
// const product = await ProductService.deleteProduct({ id: productId });
// console.log("-----------------------------------------------");
// console.log("Product deleted successfully:", product);

// // console.log("PATCH /products");
// const productId = 884;
// const productData = {
//   name: "감귤",
//   description: "한라산 감귤",
//   price: 5000,
//   manufacturer: "제주랜드",
//   tags: ["제주", "감귤"],
//   images: ["이미지-url-1", "이미지-url-2"],
// };
// const updatedProduct = await ProductService.patchProduct({
//   id: productId,
//   productData: productData,
// });
// console.log("-----------------------------------------------");
// console.log("updated successfully:", updatedProduct);

// const product = await ProductService.getProduct({ id: productId }); // id 값 object로 전달

// console.log("-----------------------------------------------");
// console.log("patched product:", product);
