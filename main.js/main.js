import {getArticleList, getAriticle, createArticle, patchArticle, deleteArticle} from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct} from './ProductService';

const userArticle = {
  title : "good",
  Content : "day",
  image : "image.jpg"
}

const userArticle1 = {
  title : "Ggood",
  Content : "day",
  image : "image.jpg"
}

const userProduct = {
  name : "JIN",
  description : "sprint-5기",
  tags : ["tag1"],
  images : ["image1.jpg"]
}

const userProduct1 = {
  name : "KIM",
  description : "sprint-5기",
  tags : ["tag1"],
  images : ["image1.jpg"]
}

// Ariticle test
getArticleList(1, 100, 'EX').then((articles) => console.log(articles));
getAriticle(1).then((article) => console.log(article));
createArticle(userArticle).then((newArticle) => console.log(newArticle));
patchArticle(1, userArticle1).then((updatedArticle) => console.log(updatedArticle));
deleteArticle(1).then(() => console.log('deleted'));

// Product test
const productTest = async () => {
const productList = await getProductList(1, 100, 'EX');
console.log(productList);

const product = await getProduct(1);
console.log(product);

const newProduct = await createProduct(userProduct);
console.log(newProduct);

const updateProduct = await patchProduct(1,userProduct1);
console.log(updateProduct);

await deleteProduct(1);
console.log('deleted');
}

productTest();