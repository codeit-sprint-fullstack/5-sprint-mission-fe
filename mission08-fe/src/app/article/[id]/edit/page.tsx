"use client";

import ArticleForm from "@/components/article/ArticleForm";
import { useArticle } from "../layout";

export default function Page() {
  const { value: article } = useArticle();
  return (
    <>
      <ArticleForm action="update" value={article} />
    </>
  );
}
