import * as articleService from "./articleService.js";
import * as productService from "./productService.js";

//잘 동작하는지 테스트하기 위해 전부 console.log로 출력해서 확인해보고 있는 상태.

//게시글 목록 조회 호출
console.log(await articleService.getArticleList({
    page: 1, 
    pageSize: 10, 
    keyword: "안주"
}));

//게시글 상세 조회 호출
console.log(await articleService.getArticle(1003));

//게시글 등록 호출
console.log(await articleService.createArticle({
    title: "테스트 타이틀",
    content: "테스트 콘텐트",
    image: "테스트 이미지"
}));

//게시글 수정 호출
console.log(await articleService.patchArticle({
    id: 1003,
    title: "테스트 타이틀11",
    content: "테스트 콘텐트12",
    image: "테스트 이미지11"
}));

//게시글 삭제 호출
console.log(articleService.deleteArticle(996));



//상품 목록 조회 호출
console.log(await productService.getProductList({
    page: 1, 
    pageSize: 50, 
    keyword: "초콜릿"
}));

//상품 상세 조회 호출
console.log(await productService.getProduct(553));

//상품 등록 호출
console.log(await productService.createProduct({
    name: "고려은단 비타민",
    description: "고려은단 비타민c 1000",
    price: 5000,
    tags: ["비타민", "고려은단"],
    images: ["테스트 이미지"]
}));

//상품 수정 호출
console.log(await productService.patchProduct({
    id: 553,
    name: "고려은단 비타민",
    description: "고려은단 비타민c 1000",
    price: 5000,
    tags: ["비타민", "고려은단"],
    images: ["테스트 이미지"]
}));

//상품 삭제 호출
console.log(await productService.deleteProduct(686));