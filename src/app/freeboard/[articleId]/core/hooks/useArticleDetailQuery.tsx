import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getArticleDetailAPI } from "../service/getArticleDetailApi";
import { Article } from "@/shared/type";
import { articleKeys } from "@/app/freeboard/core/hooks/useArticleListQuery";

export const useArticleDetail = () => {
  const { articleId } = useParams();

  if (typeof articleId === "string") {
    const { data, isLoading } = useQuery<Article>({
      queryKey: articleKeys.detail(articleId),
      queryFn: () => getArticleDetailAPI({ articleId: articleId }),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

    return {
      data: {
        id: data?.id ?? "",
        title: data?.title ?? "",
        content: data?.content ?? "",
        image: data?.image ?? "",
        favoritesCount: data?.favoritesCount ?? 0,
        createdAt: data?.createdAt ?? "",
        updatedAt: data?.updatedAt ?? "",
      },
      isLoading,
    };
  }

  return {
    data: null,
    isLoading: false,
  };
};
