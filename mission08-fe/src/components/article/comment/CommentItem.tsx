"use client";

import type { ArticleComment } from "@/types";
import iconProfile from "@/assets/icons/ic_profile.png";
import Image from "next/image";
import timeTracker from "@/utils/timeTracker";
import Control from "@/components/shared/Control";
import { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import { deleteData } from "@/lib/apis/service.ts";

export default function CommentItem({ comment }: { comment: ArticleComment }) {
  const { content, author, articleId, updatedAt } = comment;
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit(true);
  const handleDelete = () =>
    deleteData(`/article/comment/${comment.id}`, [
      `article-detail-${articleId}`,
    ]);

  return (
    <>
      {!isEdit && (
        <article className="bg-[#fcfcfc] border-b border-gray-200 relative">
          <Control onDelete={handleDelete} onEdit={handleEdit} />
          <p className="text-gray-800 mb-6">{content}</p>
          <section className="flex items-center gap-2 mb-2 md:mb-3">
            <Image src={iconProfile} alt="profile" width={40} height={40} />
            <span className="text-xs font-normal">
              <p className="text-gray-600">{author}</p>
              <p className="text-gray-400">{timeTracker(updatedAt)}</p>
            </span>
          </section>
        </article>
      )}

      {isEdit && (
        <CommentEditForm
          articleId={articleId}
          onDone={() => setIsEdit(false)}
        />
      )}
    </>
  );
}
