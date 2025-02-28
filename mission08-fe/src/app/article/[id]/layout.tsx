// app/article/[id]/layout.tsx
import { fetchData } from "@/lib/apis/service.ts";
import { Article } from "@/types";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  ArticleProvider,
  useArticle,
} from "@/contexts/readonly-context-factory";

export { ArticleProvider, useArticle };

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { id } = await params;
  const article = await fetchData<Article>(`/article/${id}`, {
    next: { tags: [`article-detail-${id}`] },
  });

  if (!article) {
    notFound();
  }

  return <ArticleProvider value={article}>{children}</ArticleProvider>;
}
