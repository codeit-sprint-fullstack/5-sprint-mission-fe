import Image from "next/image";
import BestArticleList from "../components/BesstArticle";
import ArticleList from "../components/articleList";

export default function ProductList() {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <BestArticleList />
        <ArticleList />
      </div>
    </>
  );
}
