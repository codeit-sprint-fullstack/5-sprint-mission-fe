import { notFound } from "next/navigation";
import { fetchData } from "@/lib/apis/service.ts";
import type { PageIdParams, Article } from "@/types";
import Image from "next/image";
import iconBack from "@/assets/icons/ic_back.png";
import iconProfile from "@/assets/icons/ic_profile.png";
import dateFormatter from "@/utils/dateFormatter";
import Like from "@/components/shared/Like";
import EmptyComment from "@/components/article/comment/EmptyComment";
import CommentItem from "@/components/article/comment/CommentItem";
import ButtonRound from "@/components/button/ButtonRound";
import CommentForm from "@/components/article/comment/CommentForm";
import Link from "next/link";

export default async function Page({ params }: PageIdParams) {
  const { id } = await params;
  const article = await fetchData<Article>(`/article/${id}`, {
    next: { tags: [`article-${id}`] },
  });

  if (!article) {
    notFound();
  }

  const { author, title, content, comments, createdAt } = article;
  const isEmpty = comments?.length === 0;

  return (
    <>
      <section className="border-b border-gray-200 mb-4 xl:mb-6">
        <h1 className="font-bold text-xl text-gray-800 whitespace-pre-line">
          {title}
        </h1>
        <div className="my-4 text-sm flex items-center">
          <Image src={iconProfile} alt="profile" width={40} height={40} />
          <span className="ml-4 flex gap-2">
            <p className="text-gray-600">{author}</p>
            <p className="text-gray-400">{dateFormatter(createdAt)}</p>
          </span>
          <div className="h-[34px] w-[1px] bg-gray-200 mx-8"></div>
          <Like likes={article.likes} />
        </div>
      </section>

      <p className="text-gray-800 text-base font-normal whitespace-pre-line">
        {content}
      </p>

      <CommentForm articleId={id} />

      {isEmpty && <EmptyComment />}
      <section className="flex flex-col gap-6">
        {!isEmpty &&
          comments?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </section>

      <Link href="/article">
        <ButtonRound>
          <p>목록으로 돌아가기</p>
          <Image
            src={iconBack}
            alt="목록으로 돌아가기"
            width={24}
            height={24}
          />
        </ButtonRound>
      </Link>
    </>
  );
}
