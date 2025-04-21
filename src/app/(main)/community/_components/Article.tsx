"use client";

import BestArticles from "./BestArticles";
import ArticleContainer from "./ArticleContainer";
import { useArticles } from "@/api/article/articleHook";

export default function Article() {
  const { data, isPending, error } = useArticles();
  const articles = data?.articles ?? [];
  if (error) {
    return (
      <p className="text-center text-red-500">
        데이터를 불러오는 데 실패했습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <BestArticles articles={articles} isPending={isPending} />
      <ArticleContainer articles={articles} isPending={isPending} />
    </div>
  );
}
