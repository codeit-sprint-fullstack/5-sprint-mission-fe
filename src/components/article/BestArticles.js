import ArticleCard from "@/components/article/ArticleCard";
import { useState, useEffect } from "react";

export default function BestArticle({ articles }) {
  const [maxArticles, setMaxArticles] = useState(1);

  useEffect(() => {
    const updateMaxArticles = () => {
      if (window.innerWidth >= 1280) setMaxArticles(3);
      else if (window.innerWidth >= 768) setMaxArticles(2);
      else setMaxArticles(1);
    };

    updateMaxArticles();
    window.addEventListener("resize", updateMaxArticles);
    return () => window.removeEventListener("resize", updateMaxArticles);
  }, []);

  const bestArticles = [...articles]
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, maxArticles);

  return (
    <>
      <div className="flex flex-col items-start gap-[24px]">
        <section>
          <p className="text-xl text-custom-text-black-800 font-bold">
            베스트 게시글
          </p>
        </section>

        <section className="flex w-full md:gap-[16px] xl:gap-[24px]">
          {bestArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </section>
      </div>
    </>
  );
}
