"use client";

import ArticleForm from "@/components/form/ArticleForm";
import { useArticle } from "@/contexts/readonly-context-factory";

export default function Page() {
  const { value: article } = useArticle();
  return (
    <>
      <ArticleForm action="edit" article={article} />
    </>
  );
}
