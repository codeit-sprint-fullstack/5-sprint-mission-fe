import { product } from "../api/ProductService.js";
import { article } from "../api/ArticleService.js";

//product API
const productTest = async () => {
  //새로운 항목 생성
  const products = await product.createProduct(
    "post Test",
    "Post Test Description",
    1000
  );
  const productId = products.data.id;
  console.log(products.data);
  console.log(await product.getProduct(productId));
  //수정 후 수정된 헝목 불러오기
  setTimeout(async () => {
    console.log(
      "patch : ",
      await product.patchProduct(
        productId,
        "patch Test",
        "patch Test Description"
      )
    );
    console.log("get : ", await product.getProduct(productId));
  }, 1000);

  //삭제 후 삭제한 목록 불러오기
  setTimeout(async () => {
    const del = await product.deleteProduct(productId);
    const delMessage = () => {
      if (del.status === 204) {
        return "삭제 성공";
      } else {
        return del.response.data.message;
      }
    };
    //삭제한 후 삭제된 항목을 조회
    const getDelete = await product.getProduct(productId);
    console.log("delete : ", del.status, delMessage());
    console.log(
      `getDelete : id = ${productId}인 항목이`,
      getDelete.response.data.message
    );
  }, 4000);

  setTimeout(async () => {
    console.log(await product.getProductList());
  }, 5000);
};
//aticle API
const articleTest = async () => {
  //새로운 항목 생성
  const articles = await article.createArticle(
    "post Test",
    "Post Test content"
  );
  const articleId = articles.data.id;
  console.log(articles.data);
  // console.log(await article.getArticle(articleId));
  //수정 후 수정된 헝목 불러오기
  setTimeout(async () => {
    console.log(
      "patch : ",
      await article.patchArticle(
        articleId,
        "patch Test",
        "patch Test Description"
      )
    );
    console.log("get : ", await article.getArticle(articleId));
  }, 1000);

  //삭제 후 삭제한 목록 불러오기
  setTimeout(async () => {
    const del = await article.deleteArticle(articleId);
    const delMessage = () => {
      if (del.status === 204) {
        return "삭제 성공";
      } else {
        return del.response.data.message;
      }
    };
    //삭제한 후 삭제된 항목을 조회
    const getDelete = await article.getArticle(articleId);
    console.log("delete : ", del.status, delMessage());
    console.log(
      `getDelete : id = ${articleId}인 항목이`,
      getDelete.response.data.message
    );
  }, 4000);

  setTimeout(async () => {
    console.log(await article.getArticleList());
  }, 5500);
};
//product API test후 10초뒤 article AIP 테스트
const apiTest = () => {
  productTest();
  setTimeout(() => {
    articleTest();
  }, 10000);
};

apiTest();
