import * as articleService from "./articleService.js";
import * as productService from "./productService.js";

//게시글 목록 조회 호출
await articleService.getArticleList({
    page: 1, 
    pageSize: 10, 
    keyword: "안주"
});

//게시글 상세 조회 호출
await articleService.getArticle(1613);

//게시글 등록 호출
await articleService.createArticle({
    title: "테스트 타이틀",
    content: "테스트 콘텐트",
    image: "테스트 이미지"
});

//게시글 수정 호출
await articleService.patchArticle(1613, {
    title: "테스트 타이틀11",
    content: "테스트 콘텐트12",
    image: "00"
});

//게시글 수정 확인용
// await articleService.getArticle(1613);

//게시글 삭제 호출
articleService.deleteArticle(1613);



//상품 목록 조회 호출
await productService.getProductList({
    page: 1, 
    pageSize: 50, 
    keyword: "초콜릿"
});

//상품 상세 조회 호출
await productService.getProduct(118);

//상품 등록 호출
await productService.createProduct({
    name: "고려은단 비타민",
    description: "고려은단 비타민c 1000",
    price: 5000,
    tags: ["비타민", "고려은단"],
    images: ["테스트 이미지"]
});

//상품 수정 호출
await productService.patchProduct(118, {
    name: "고려은단 비타민",
    description: "고려은단 비타민c 1000",
    price: 5500,
    tags: ["비타민", "고려은단"],
    images: ["테스트 이미지"]
});

//상품 수정 확인용
// await productService.getProduct(118);

//상품 삭제 호출
await productService.deleteProduct(816);