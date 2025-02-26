import BestArticles from "@/components/article/best/BestArticles";
import ArticleList from "@/components/article/list/ArticleList";
import { fetchData } from "@/lib/apis/service.ts";
import type { Article } from "@/types";

export default async function Article() {
  const top3 = await fetchData<Article[]>("/article/best", {
    next: { revalidate: 3 },
  });

  return (
    <>
      <BestArticles top3={top3 || []} />
      <ArticleList />
    </>
  );
}
