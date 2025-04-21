import { useMutation } from "@tanstack/react-query";
import { createArticle, fetchArticleById, updateArticle } from "./articleApi";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "./articleApi";
import { Article } from "@/types";
interface ArticlesResponse {
  articles: Article[];
}

export const useArticles = () =>
  useQuery<ArticlesResponse>({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

export const useArticleById = (id?: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id as string),
    enabled: !!id,
  });
};

export const useCreateArticle = (onSuccess?: (id: string) => void) =>
  useMutation({
    mutationFn: createArticle,
    onSuccess: (data) => {
      onSuccess?.(data.id);
    },
  });

export const useUpdateArticle = (onSuccess?: (id: string) => void) =>
  useMutation({
    mutationFn: updateArticle,
    onSuccess: (data) => {
      onSuccess?.(data.id);
    },
  });
