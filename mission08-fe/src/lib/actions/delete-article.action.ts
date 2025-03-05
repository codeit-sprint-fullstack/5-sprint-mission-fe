import { deleteData } from "../apis/service.ts";

export default async function deleteArticleAction(
  _: unknown,
  formData: FormData
) {
  const articleId = formData.get("articleId") as string;

  if (!articleId) {
    return {
      status: false,
      message: "게시글이 없습니다.",
    };
  }

  const isSuccess = await deleteData(`/article/${articleId}`);

  return {
    status: isSuccess,
    message: isSuccess
      ? "게시글이 삭제되었습니다."
      : "게시글 삭제에 실패했습니다.",
  };
}
