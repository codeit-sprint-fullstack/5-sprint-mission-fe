import * as articleService from "./APIS/ArticleService.js";
import * as productService from "./APIS/ProductService.js";

let article = await articleService.createArticle({
  title: "제목",
  content: "내용",
  image: "이미지",
});

articleService.getArticleList();
