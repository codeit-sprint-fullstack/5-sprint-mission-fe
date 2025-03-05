import { postData } from "../apis/service.ts";

export default async function createArticleAction(
  _: unknown,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return {
      status: false,
      message: "제목과 내용이 없습니다.",
    };
  }

  const isSuccess = await postData("/article", { title, content });

  return {
    status: isSuccess,
    message: isSuccess
      ? "게시글이 등록되었습니다."
      : "게시글 등록에 실패했습니다.",
  };
}
