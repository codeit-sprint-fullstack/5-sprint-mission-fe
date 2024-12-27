import { deleteProduct } from "./ProductService.js";
import { articleService } from "./ArticleService.js";
import { productService } from "./ProductService.js";

//메인 함수
async function mainFunc() {
  // await productService.getProductList(args.forGetProductList);
  await productService.patchProduct(args.forPatchProduct,333);
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

mainFunc();
