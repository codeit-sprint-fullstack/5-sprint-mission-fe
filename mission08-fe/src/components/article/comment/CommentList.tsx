"use client";

import EmptyComment from "@/components/empty/EmptyComment";
import CommentItem from "@/components/article/comment/CommentItem";
import { useArticle } from "@/contexts/readonly-context-factory";

export default function CommentList() {
  const { value: article } = useArticle();
  const { comments } = article;

  if (!comments || comments.length === 0) {
    return <EmptyComment />;
  }

  return (
    <>
      <section className="flex flex-col gap-6">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </section>
    </>
  );
}
