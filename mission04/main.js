import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./APIS/ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./APIS/ProductService.js";

// articles
let articleList = await getArticleList({
  page: 0,
  pageSize: 0,
  keyword: "내용",
});
console.log("articleList: ", articleList);

let article = await createArticle({
  title: "5기 파트2 팀 배정 안내",
  content: `1팀 (심정욱 멘토님) : 최은비,정한샘,정하윤,가승연,이동혁,최유리\n2팀 (김현웅 멘토님) : 박세정,유호은,최수빈,김조순,봉재완,윤민호
\n3팀 (류제천 멘토님) : 민지영,김희성,신진호,김민희,김승우`,
  image: "img-url-1",
});
console.log("create article: ", article);

article = await patchArticle(1416, {
  title: "5기 파트2 팀 배정 안내 (민지영)",
  content: `3팀 (류제천 멘토님) : 민지영,김희성,신진호,김민희,김승우`,
  image: "img-url-1",
});
console.log("patch article: ", article);

deleteArticle(1416);

article = await getArticle(1416);
console.log("get article: ", article);

// products
let productList = await getProductList({
  page: 0,
  pageSize: 0,
  keyword: "도서",
});
console.log("productList: ", productList);

let product = await createProduct({
  name: "도서) 리팩토링 2판",
  description: "이것은 리팩토링에 대한 책입니다.",
  price: 35000,
  manufacturer: "한빛미디어",
  tags: ["자바스크립트", "리팩토링", "도서"],
  images: ["이미지-url-1", "이미지-url-2"],
});
console.log("create product: ", product);

product = await patchProduct(692, {
  name: "도서) 리팩토링 2판 / 가격 수정",
  description: "이것은 리팩토링에 대한 책입니다.",
  price: 40000,
  manufacturer: "한빛미디어",
  tags: ["자바스크립트", "리팩토링", "도서"],
  images: ["이미지-url-1", "이미지-url-2"],
});
console.log("patch product: ", product);

deleteProduct(692);

product = await getProduct(692);
console.log("get product: ", product);
