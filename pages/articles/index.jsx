import Image from "next/image";
import BestArticleList from "./BesstArticle";
import ArticleList from "./ArticleList";

export default function MainArticleList() {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <BestArticleList />
        <ArticleList />
      </div>
    </>
  );
}
