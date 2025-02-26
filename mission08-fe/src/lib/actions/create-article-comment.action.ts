import { postData } from "../apis/service.ts";

export default async function CreateArticleCommentAction(
  _: unknown,
  formData: FormData
) {
  const articleId = formData.get("articleId") as string;
  const comment = formData.get("comment") as string;

  if (!comment) {
    return {
      status: false,
      message: "댓글 내용이 없습니다.",
    };
  }

  const isSuccess = await postData(
    `/article/${articleId}/comment`,
    { content: comment },
    [`article-${articleId}`]
  );

  return {
    status: isSuccess,
    message: isSuccess ? "댓글이 등록되었습니다." : "댓글 등록에 실패했습니다.",
  };
}
