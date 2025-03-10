import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CommentsList from "../components/ArticleCommentsList";
import ArticleDetail from "./ArticleDetail";
import { ArticleContext } from "@/context/ArticleContext";
import { fetchArticleById } from "../api/articles";

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { selectedArticle, setSelectedArticle } = useContext(ArticleContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id || id === "undefined") {
        console.warn("Invalid ID detected, skipping API call:", id);
        setLoading(false);
        return;
      }

      setLoading(true);

      // ✅ localStorage에서 데이터 불러오기
      const storedArticle = localStorage.getItem(`article_${id}`);
      if (storedArticle) {
        setSelectedArticle(JSON.parse(storedArticle));
        setLoading(false);
        return;
      }

      try {
        const fetchedArticle = await fetchArticleById(id);
        if (fetchedArticle) {
          setSelectedArticle(fetchedArticle);
          localStorage.setItem(`article_${id}`, JSON.stringify(fetchedArticle));
        } else {
          router.push("/articles");
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
        router.push("/articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]); // ✅ `id`만 의존성 배열에 포함

  if (loading) return <div>로딩 중...</div>;
  if (!selectedArticle) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <ArticleDetail article={selectedArticle} />
    </>
  );
}
