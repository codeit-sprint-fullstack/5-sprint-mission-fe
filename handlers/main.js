import { articleService } from "../api/ArticleService.js";
import { productService } from "../api/ProductService.js";

/**
 * article
 */
const articleList = await articleService.getArticleList({ page: 1, pageSize: 1 });
console.log(articleList);

const article = await articleService.getArticle(354);
console.log(`article :::: ` + `${article.id}, ${article.title}, ${article.content}, ${article.image}, ${article.likeCount}`);

const createData = await articleService.createArticle({ title: "seha title", content: "content", image: "image url" });
console.log(createData);

console.log(await articleService.patchArticle(createData.id, { title: "seha update title", content: "udpate content", image: " update image url" }));

articleService.deleteArticle(createData.id)


/**
 * product
 */
const productList = await productService.getProductList({ page: 1, pageSize: 1, keyword: 1 });
console.log(productList);

const product = await productService.getProduct(225);
console.log(`product :::: ` + `${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.manufacturer}`);

const newProduct = await productService.createProduct({
  name: "small memo",
  description: "Easily take notes on any page you're visiting.",
  price: 10,
  tags: ["memo"],
  images: ["url"]
});
console.log(newProduct);

const updateProduct = await productService.patchProduct(newProduct.id, {
  name: "update small memo",
  description: "update Easily take notes on any page you're visiting.",
  price: 100,
  tags: ["update", "memo"],
  images: ["update", "url"]
});
console.log(updateProduct);

productService.deleteProduct(newProduct.id);
