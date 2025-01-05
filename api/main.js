import { articleService } from "./Articleservice.js";
import { productService } from "./ProductService.js";

const newArticleData = {
  title: "안녕하세요.",
  content: "반갑습니다!",
  image: "이미지",
};

const updatedArticleData = {
  title: "Hello.",
};

console.log("===getArticleList 실행 결과입니다.===");
const data1 = await articleService.getArticleList({ page: 1, pageSize: 1 });
console.log(data1);

console.log("===getArticle 실행 결과입니다.===");
const data2 = await articleService.getArticle(9999);
console.log(data2);

console.log("===createArticle 실행 결과입니다.===");
const data3 = await articleService.createArticle(newArticleData);
console.log(data3);

console.log("===patchArticle 실행 결과입니다.===");
const data4 = await articleService.patchArticle(1686, updatedArticleData);
console.log(data4);

console.log("===deleteArticle 실행 결과입니다.===");
const data5 = await articleService.deleteArticle(1562);
console.log(data5);

console.log("=====================================================");

const newProductData = {
  name: "바나나",
  description: "달디단 바나나",
  price: 30000,
  manufacturer: "판다농장",
  tags: ["과일", "바나나"],
  images: ["바나나이미지1", "바나나이미지2"],
};

const updatedProductData = {
  description: "싱싱한 바나나",
};

console.log("===getProductleList 실행 결과입니다.===");
const data6 = await productService.getProductList({ page: 1, pageSize: 1 });
console.log(data6);

console.log("===getProduct 실행 결과입니다.===");
const data7 = await productService.getProduct(99999);
console.log(data7);

console.log("===createProductle 실행 결과입니다.===");
const data8 = await productService.createProduct(newProductData);
console.log(data8);

console.log("===patchProductle 실행 결과입니다.===");
const data9 = await productService.patchProduct(880, updatedProductData);
console.log(data9);

console.log("===deleteProductle 실행 결과입니다.===");
const data10 = await productService.deleteProduct(766);
console.log(data10);
