import { article } from "./ArticleService.js";
import { product } from "./ProductService.js";

// 몇개는 왜 안되는거지..

article.getArticleList(1, 1, "윤민호");
article.getArticle(1417);
article.createArticle("이건", "뭐지", "머지는 합병");
article.patchArticle(1417, { title: "이렇게인가?" });
article.deleteArticle(1417);

product.getArticleList(1, 1, "가");
product.getArticle(691);
// 요놈은 저장하면 이렇게 되네
product.createArticle(
  "이름",
  "내용",
  1,
  ["머지는 합병"],
  ["이렇게쓰는게아닌가"]
);
product.patchArticle(691, "이름", "내용", 1, ["머지는 합병"], ["아닌가보네"]);
product.deleteArticle(691);
