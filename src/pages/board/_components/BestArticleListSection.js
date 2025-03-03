import { useBestArticleList } from "@/lib/queries/articles";
import { BEST_ARTICLE_LIMIT } from "@/constants";
import BestArticleCard from "./BestArticleCard";

export default function BestArticleListSection() {
  const { data: bestArticleList, isLoading } =
    useBestArticleList(BEST_ARTICLE_LIMIT);

  // 1. 로딩 처리
  if (isLoading) return <div>로딩 중...</div>;

  // 2. 데이터 없음 처리
  if (!bestArticleList.data) return null;

  return (
    <section>
      <h1 className="text-[18px] md:text-[20px] font-[700] text-gray-800">
        베스트 게시글
      </h1>
      <ul className="flex gap-[24px] items-center pt-[16px]">
        {bestArticleList.data.slice(0, 3).map((article, index) => (
          <BestArticleCard article={article} index={index} key={article.id} />
        ))}
      </ul>
    </section>
  );
}
