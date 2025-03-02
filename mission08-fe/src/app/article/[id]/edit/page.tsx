"use client";

import ArticleForm from "@/components/form/ArticleForm";
import { useArticle } from "../layout";

export default function Page() {
  const { value: article } = useArticle();
  return (
    <>
      <ArticleForm action="edit" article={article} />
    </>
  );
}
