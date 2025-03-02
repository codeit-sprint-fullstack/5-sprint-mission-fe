"use client";

import Image from "next/image";
import iconProfile from "@/assets/icons/ic_profile.png";
import dateFormatter from "@/utils/dateFormatter";
import Like from "@/components/shared/Like";
import Control from "@/components/shared/Control";
import { useRouter } from "next/navigation";
import { useArticle } from "@/app/article/[id]/layout";
import { useActionState, useEffect, useRef } from "react";
import deleteArticleAction from "@/lib/actions/delete-article.action";
import { useQueryClient } from "@tanstack/react-query";

export default function ArticleDetail() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { value: article } = useArticle();
  const { id, author, title, content, createdAt } = article;
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(deleteArticleAction, null);

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      // 게시글 삭제 성공 시
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.replace("/article");
    } else {
      // 게시글 삭제 실패 시
      alert(`게시글 삭제: ${state.message}`);
    }
  }, [state, router, queryClient]);

  return (
    <>
      <form action={formAction} ref={formRef} className="hidden">
        <input name="articleId" value={id} hidden readOnly />
      </form>

      <section className="border-b border-gray-200 mb-4 xl:mb-6 relative">
        <Control
          onDelete={() => {
            formRef.current?.requestSubmit();
          }}
          onEdit={() => router.push(`/article/${article.id}/edit`)}
        />
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
    </>
  );
}
