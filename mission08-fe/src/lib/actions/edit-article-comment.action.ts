import { patchData } from "../apis/service.ts";
import type { ArticleComment } from "@/types";

export default async function editArticleCommentAction(
  _: unknown,
  formData: FormData
) {
  const originComment = formData.get("originComment") as string;
  const comment = formData.get("comment") as string;
  const commentId = formData.get("commentId") as string;
  const articleId = formData.get("articleId") as string;

  if (!comment || comment.trim() === "") {
    return {
      status: false,
      message: "댓글 내용이 없습니다.",
    };
  }

  if (comment === originComment) {
    return {
      status: false,
      message: "변경된 내용이 없습니다.",
    };
  }

  const isSuccess = await patchData<ArticleComment>(
    `/article/comment/${commentId}`,
    { content: comment },
    [`article-detail-${articleId}`]
  );

  return {
    status: isSuccess,
    message: isSuccess ? "댓글이 수정되었습니다." : "댓글 수정에 실패했습니다.",
  };
}
