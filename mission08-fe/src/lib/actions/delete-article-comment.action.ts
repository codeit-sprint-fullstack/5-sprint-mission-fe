import { deleteData } from "@/lib/apis/service.ts";

export default async function deleteArticleCommentAction(
  _: unknown,
  formData: FormData
) {
  const articleId = formData.get("articleId");
  const commentId = formData.get("commentId");

  const isSuccess = await deleteData(`/article/comment/${commentId}`, [
    `article-detail-${articleId}`,
  ]);

  return {
    status: isSuccess,
    message: isSuccess ? "댓글이 삭제되었습니다." : "댓글 삭제에 실패했습니다.",
  };
}
