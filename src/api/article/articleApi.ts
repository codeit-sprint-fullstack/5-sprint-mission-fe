import { Article } from "@/types";
import { customFetch } from "../url";

export const fetchArticles = async (): Promise<{ articles: Article[] }> => {
  const res = await customFetch("/articles", {
    method: "GET",
  });

  if (!res.ok) throw new Error("게시글 조회 실패");
  return res.json();
};

export const fetchArticleById = async (id: string): Promise<Article> => {
  const res = await customFetch(`/articles/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("서버 fetch 실패", errorText);
    throw new Error("게시글 조회 실패");
  }

  return res.json();
};

export const createArticle = async (
  formData: FormData
): Promise<{ id: string }> => {
  const res = await customFetch("/articles", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("게시글 생성 실패");
  return res.json();
};

export const updateArticle = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}): Promise<{ id: string }> => {
  const res = await customFetch(`/articles/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error("게시글 수정 실패");
  return res.json();
};

export const deleteArticle = async ({
  id,
}: {
  id: string;
}): Promise<{ id: string }> => {
  const res = await customFetch(`/articles/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("게시글 수정 실패");
  return res.json();
};
