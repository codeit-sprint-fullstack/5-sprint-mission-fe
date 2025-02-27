"use client";

import type { Article } from "@/types";
import Link from "next/link";
import BestArticleItem from "./BestArticleItem";
import { useQuery } from "@tanstack/react-query";
import useDeviceType from "@/hooks/useDeviceType";
import SkeletonBestArticleItem from "@/components/skeleton/skeleton-best-article-item";
import EmptyArticle from "@/components/empty/EmptyArticle";
import { fetchData } from "@/lib/apis/service.ts";

const COUNT_BY_DEVICE_TYPE = {
  PC: 3,
  Tablet: 2,
  Mobile: 1,
};

export default function BestArticles() {
  const deviceType = useDeviceType() as keyof typeof COUNT_BY_DEVICE_TYPE;
  const count = COUNT_BY_DEVICE_TYPE[deviceType] || 1;

  // React Query로 데이터 페칭
  const {
    data: bestArticles,
    isPending,
    isError,
  } = useQuery<Article[]>({
    queryKey: ["bestArticles"], // 쿼리 키
    queryFn: async () => await fetchData<Article[]>("/article/best"), // 데이터 페칭 함수
    staleTime: 3 * 1000, // 3초 동안 데이터가 신선(fresh)하다고 간주 // 3초 이후에 다시 데이터를 페칭
  });

  return (
    <section className="flex flex-col gap-4 md:gap-6 mb-6 xl:mb-10">
      <h1 className="text-gray-800 font-bold text-xl">베스트 게시글</h1>

      {isError && (
        <div className="flex flex-row mx-auto">
          <p>데이터를 불러오는 중에 에러가 발생했습니다.</p>
        </div>
      )}

      {!isPending && bestArticles?.length === 0 && (
        <div className="flex flex-row mx-auto">
          <EmptyArticle />
        </div>
      )}

      <div
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-4 xl:gap-6`}
      >
        {isPending &&
          Array.from({ length: count }, (_, index) => (
            <SkeletonBestArticleItem key={`best-article-${index}`} />
          ))}

        {!isPending &&
          bestArticles?.slice(0, count).map((article) => (
            <Link
              href={`/article/${article.id}`}
              key={`best-article-${article.id}`}
            >
              <BestArticleItem article={article} />
            </Link>
          ))}
      </div>
    </section>
  );
}
