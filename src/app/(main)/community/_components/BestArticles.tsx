"use client";

import { useState, useEffect, useCallback } from "react";
import BestSkeleton from "./BestSkeleton";
import { Article } from "@/types";
import ArticleCard from "./ArticleCard";

interface BestArticlesProps {
  articles: Article[];
  isPending?: boolean;
}

export default function BestArticles({
  articles = [],
  isPending = false,
}: BestArticlesProps) {
  const [maxArticles, setMaxArticles] = useState(1);

  const updateMaxArticles = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1280) setMaxArticles(3);
    else if (width >= 768) setMaxArticles(2);
    else setMaxArticles(1);
  }, []);

  useEffect(() => {
    updateMaxArticles();
    window.addEventListener("resize", updateMaxArticles);
    return () => window.removeEventListener("resize", updateMaxArticles);
  }, [updateMaxArticles]);

  const bestArticles = Array.isArray(articles)
    ? [...articles]
        .sort((a, b) => (b._count?.favorites ?? 0) - (a._count?.favorites ?? 0))
        .slice(0, maxArticles)
    : [];

  console.log("bestArticles", bestArticles);
  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-xl text-custom-text-black-800 font-bold">
        베스트 게시글
      </h2>

      <div className="flex w-full md:gap-4 xl:gap-6">
        {isPending
          ? Array.from({ length: maxArticles }).map((_, i) => (
              <BestSkeleton key={i} />
            ))
          : bestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
      </div>
    </div>
  );
}
