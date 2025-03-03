/*
SSR 컴포넌트
  - 서버에서 데이터 프리페치 후 클라이언트에 전달
  - 1분 지나면 데이터 stale 상태, 5분 지나면 캐시 사라짐

CreateCommentSection, CommentsSection 컴포넌트
  - 초기 렌더링: 서버에서 데이터 프리페치(SSR)
  - 사용자 상호작용(댓글 작성, 수정, 삭제)으로 데이터 재요청: CSR
*/
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getArticle } from "@/lib/apis/articles";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

import Head from "next/head";
import PostSection from "./_components/postSection";
import CreateCommentSection from "./_components/createCommentSection";
import CommentsSection from "./_components/commentsSection";

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();
  const { id } = params;

  // 서버에서 게시글 데이터 프리페치
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.Articles.detail(id),
    queryFn: () => getArticle({ articleId: id }),
  });

  // 서버에서 댓글 목록 데이터 프리페치
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.Articles.comments.list(id),
    queryFn: () => getArticleComments({ articleId: id }),
  });

  return {
    props: {
      articleId: id,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function ArticleDetail({ articleId }) {
  return (
    <>
      <Head>
        <title>판다마켓 | 중고 거래 플랫폼 - 자유게시판</title>
      </Head>
      <main className="flex flex-col gap-[32px] py-[18px]">
        <PostSection articleId={articleId} />
        <CreateCommentSection articleId={articleId} />
        <CommentsSection articleId={articleId} />
      </main>
    </>
  );
}

export default ArticleDetail;
