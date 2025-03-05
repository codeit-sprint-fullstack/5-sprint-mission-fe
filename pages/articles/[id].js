import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import CommentsList from "../components/commentsList";
import ArticleDetail from "../components/ArticleDetail";
import { ArticleContext } from "@/context/ArticleContext";

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { selectedArticle } = useContext(ArticleContext);

  useEffect(() => {
    if (!selectedArticle || selectedArticle._id !== id) {
      router.push("/articles");
    }
  }, [selectedArticle, id, router]);

  if (!selectedArticle) return <div>로딩 중...</div>;

  return (
    <>
      <ArticleDetail article={selectedArticle} />
    </>
  );
}
