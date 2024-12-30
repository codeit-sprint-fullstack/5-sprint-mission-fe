import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

const logData = ((data) => console.log(data));
// Article API Fetch && then 사용함
getArticleList(1, 10, "example keyword").then(logData)
getArticle(1).then(logData)
createArticle("New Title", "Content", "image_url").then(logData);
patchArticle(1, { title: "Updated Title" }).then(logData);
deleteArticle(1).then(logData);

// Product API axios && async 사용함
(async () => {
  console.log(await getProductList(1, 10, "product keyword"));
  console.log(await getProduct(1));
  console.log(await createProduct("Product Name", "Description", 100, ["tag1", "tag2"], ["image1", "image2"]));
  console.log(await patchProduct(1, { name: "Updated Product Name" }));
  console.log(await deleteProduct(1));
});
