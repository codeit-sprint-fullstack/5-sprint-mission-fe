/*
SSR 컴포넌트
  - 서버에서 데이터 프리페치 후 클라이언트에 전달
  - 1분 지나면 데이터 stale 상태, 5분 지나면 캐시 사라짐

ArticleListSection 컴포넌트
  - 초기 렌더링: 서버에서 데이터 프리페치(SSR)
  - 사용자 상호작용(정렬, 검색, 페이지네이션)으로 데이터 재요청: CSR
*/

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getBestArticleList } from "@/lib/apis/articles";
import { getArticleList } from "@/lib/apis/articles";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { BEST_ARTICLE_LIMIT, ARTICLE_PAGE_LIMIT } from "@/constants";

import Head from "next/head";
import BestArticleListSection from "./_components/BestArticleListSection";
import ArticleListSection from "./_components/ArticleListSection";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // 서버에서 인기 게시글 목록 데이터 프리페치
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.Articles.best(BEST_ARTICLE_LIMIT),
    queryFn: () => getBestArticleList({ limit: BEST_ARTICLE_LIMIT }),
  });

  // 서버에서 게시글 목록 데이터 프리페치
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.Articles.list({
      offset: 0,
      limit: ARTICLE_PAGE_LIMIT,
      sort: "recent",
      keyword: "",
    }),
    queryFn: () =>
      getArticleList({
        offset: 0,
        limit: ARTICLE_PAGE_LIMIT,
        sort: "recent",
        keyword: "",
      }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Board() {
  return (
    <>
      <Head>
        <title>판다마켓 | 중고 거래 플랫폼 - 자유게시판</title>
      </Head>
      <main className="flex flex-col gap-[24px]">
        <BestArticleListSection />
        <ArticleListSection />
      </main>
    </>
  );
}
