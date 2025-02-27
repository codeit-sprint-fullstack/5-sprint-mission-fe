"use client";

import Button from "@/components/button/ButtonRectangle";
import Link from "next/link";
import Filter from "@/components/shared/Filter";
import Search from "@/components/shared/Search";
import type { Article, Query } from "@/types";
import ArticleItem from "./ArticleItem";
import { fetchData } from "@/lib/apis/service.ts";
import { useMemo, useRef, useState, useEffect } from "react";
import EmptyArticle from "@/components/empty/EmptyArticle";
import { useInfiniteQuery } from "@tanstack/react-query";
import SkeletonArticleItem from "@/components/skeleton/skeleton-article-item";

interface FetchCursorData {
  articleList: Article[]; // 게시글 목록
  hasNextPage: boolean; // 다음 페이지 존재 여부
  nextCursor: string | undefined; // 다음 페이지 커서
}

const LIMIT_COUNT = 8; // 한 번에 가져올 게시글 수

export default function ArticleList() {
  const sentinelRef = useRef<HTMLDivElement | null>(null); // IntersectionObserver 감지 요소
  const observerRef = useRef<IntersectionObserver | null>(null); // IntersectionObserver
  const [query, setQuery] = useState<Query>({
    limit: LIMIT_COUNT,
    keyword: "",
    sortBy: "latest",
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchCursorData>({
    queryKey: ["articles", query.keyword, query.sortBy], // 동적 쿼리 키
    queryFn: ({ pageParam }) =>
      fetchData<FetchCursorData>("/article", undefined, {
        limit: LIMIT_COUNT,
        keyword: query.keyword,
        sortBy: query.sortBy,
        cursorId: pageParam as string | undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });

  const articleList = useMemo(
    () => data?.pages.flatMap((page) => page.articleList) ?? [],
    [data]
  );

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return; // sentinelRef가 없거나 다음 페이지가 없는 경우

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" } // 스크롤이 sentinelRef보다 100px 위에서 감지됨
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <section className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-gray-800 font-bold text-xl">게시글</h1>
        <Link href="/article/create">
          <Button isActive={true}>글쓰기</Button>
        </Link>
      </section>

      <section className="flex gap-4 mb-4 md:mb-6">
        <Search
          onSearch={(keyword) =>
            setQuery((prev) => ({ ...prev, keyword, cursorId: undefined }))
          }
        />
        <Filter
          sortBy={query.sortBy}
          onSort={(sortBy) =>
            setQuery((prev) => ({ ...prev, sortBy, cursorId: undefined }))
          }
        />
      </section>

      {/* 페치 에러일 경우 */}
      {isError && <p>Error: {error?.message}</p>}

      {/* 검색 결과 또는 게시글이 없는 경우 */}
      {!isPending && articleList.length < 1 && (
        <div className="flex flex-row mx-auto my-20">
          <EmptyArticle keyword={query.keyword} />
        </div>
      )}

      {/* 로딩 중인 경우 */}
      {isPending && articleList.length < 1 && (
        <section className="flex flex-col gap-6">
          {Array.from({ length: LIMIT_COUNT }, (_, index) => (
            <SkeletonArticleItem key={`article-${index}`} />
          ))}
        </section>
      )}

      {/* 게시글 목록 */}
      {!isPending && (
        <section className="flex flex-col gap-6">
          {articleList.map((article) => (
            <Link href={`/article/${article.id}`} key={`article-${article.id}`}>
              <ArticleItem article={article} />
            </Link>
          ))}
        </section>
      )}

      {/* IntersectionObserver 감지 요소 */}
      <div ref={sentinelRef} className="h-10"></div>

      {/* 더 이상 페칭될 데이터가 없을 때 표시 */}
      {!isFetchingNextPage && !hasNextPage && (
        <div className="text-center text-gray-500 mt-4">
          더 이상 게시글이 없습니다.
        </div>
      )}

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
