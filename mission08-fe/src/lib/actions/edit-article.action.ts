import type { Article } from "@/types.js";
import { patchData } from "../apis/service.ts";

export default async function editArticleAction(
  _: unknown,
  formData: FormData
) {
  const article = JSON.parse(formData.get("article") as string) as Article;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const { id, title: originTitle, content: originContent } = article;

  if (!title || !content) {
    return {
      status: false,
      message: "제목과 내용이 없습니다.",
    };
  }

  if (title === originTitle && content === originContent) {
    return {
      status: false,
      message: "변경된 내용이 없습니다.",
    };
  }

  const isSuccess = await patchData(`/article/${id}`, { title, content });

  return {
    status: isSuccess,
    message: isSuccess
      ? "게시글이 수정되었습니다."
      : "게시글 수정에 실패했습니다.",
  };
}
