

import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';

import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';


getArticleList("1","3");
getArticle(4);
createArticle("!!!!","되나?");
patchArticle(1);
deleteArticle(1);


getProductList("1", "3");
getProduct(1);
getProduct("test1", "um...", 1000, "문구");
getProduct("test2", "미정", 1500, "문구용품");
getProduct(1);