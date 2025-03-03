import Post from "@/components/Post";
import { useArticle } from "@/lib/queries/articles";

export default function PostSection({ articleId }) {
  const { data: article, isLoading } = useArticle({ articleId });

  // 1. 로딩 처리
  if (isLoading) return <div>로딩 중...</div>;

  // 2. 데이터 없음 처리
  if (!article) return null;

  return (
    <section>
      <Post post={article.data} />
    </section>
  );
}
