import { articleUrl, getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./articleService.js";

import { productUrl, getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./productService.js";

//게시글 목록 조회 호출
console.log(await getArticleList({
    page: 1, 
    pageSize: 10, 
    keyword: "안주"
}));

//게시글 상세 조회 호출
console.log(await getArticle(1002));

//게시글 등록 호출
console.log(await createArticle({
    title: "테스트 타이틀",
    content: "테스트 콘텐트",
    image: "테스트 이미지"
}));

//게시글 수정 호출
console.log(await patchArticle({
    id: 1002,
    title: "테스트 타이틀11",
    content: "테스트 콘텐트12",
    image: "테스트 이미지11"
}));

console.log(await getArticle(1002));

//게시글 삭제 호출
console.log(await deleteArticle(1124));



//상품 목록 조회 호출
console.log(await getProductList({
    page: 1, 
    pageSize: 50, 
    keyword: "초콜릿"
}));

//상품 상세 조회 호출
console.log(await getProduct(554));

//상품 등록 호출
console.log(await createProduct({
    name: "고려은단 비타민",
    description: "고려은단 비타민c 1000",
    price: 5000,
    tags: ["비타민", "고려은단"],
    images: ["테스트 이미지"]
}));

//상품 수정 호출
console.log(await patchProduct({
    id: 554,
    name: "고려은단 비타민",
    description: "고려은단 비타민c 1000",
    price: 5000,
    tags: ["비타민", "고려은단"],
    images: ["테스트 이미지"]
}));


//상품 삭제 호출
console.log(await deleteProduct(557));