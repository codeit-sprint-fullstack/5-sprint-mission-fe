import Image from "next/image";
import iconBack from "@/assets/icons/ic_back.png";
import ButtonRound from "@/components/button/ButtonRound";
import CommentForm from "@/components/form/CommentCreateForm";
import Link from "next/link";
import ArticleDetail from "@/components/article/list/ArticleDetail";
import CommentList from "@/components/article/comment/CommentList";
import type { PageIdParams } from "@/types";

export default async function Page({ params }: PageIdParams) {
  const { id } = await params;

  return (
    <>
      <ArticleDetail />

      <CommentForm articleId={id} />

      <CommentList />

      <ButtonRound>
        <Link href="/article" passHref className="flex items-center gap-2">
          <p>목록으로 돌아가기</p>
          <Image
            src={iconBack}
            alt="목록으로 돌아가기"
            width={24}
            height={24}
          />
        </Link>
      </ButtonRound>
    </>
  );
}
