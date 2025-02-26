import BestArticles from "@/components/article/best/BestArticles";
import ArticleList from "@/components/article/list/ArticleList";
import { fetchData } from "@/lib/apis/service.ts";
import { Post } from "@/types";

export default async function Article() {
  const top3 = await fetchData<Post[]>("/post/best", {
    next: { revalidate: 3 },
  });

  return (
    <>
      <BestArticles top3={top3 || []} />
      <ArticleList />
    </>
  );
}
