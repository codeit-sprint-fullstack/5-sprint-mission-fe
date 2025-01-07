import {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
} from "./ArticleService.js";
import {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
} from "./ProductService.js";

//    Articles  테스트
getArticleList(1, 20, "가승연").then(console.log);
getArticle(1392).then(console.log);
createArticle("syggaaa", "가승연이오", "하하하하하ㅏ하하하하").then(console.log);
patchArticle(1392, { title: "give me money" }).then(console.log);
deleteArticle(1400).then(console.log);



//   Products  테스트
getProductList(1, 10, "syga").then(console.log);
getProduct(681).then(console.log);
createProduct("syga product", "내꺼야 내꺼야", 9000, ["tag1", "tag2"], ["infinityCastle"]).then(console.log);
patchProduct(681, { name: "sygaaa" }).then(console.log);
deleteProduct(681).then(console.log);
