import Comment from "@/components/Comment";
import { useArticleComments } from "@/lib/queries/articles";

export default function CommentsSection({ articleId }) {
  const { data: comments, isLoading } = useArticleComments({ articleId });

  if (isLoading) return <div>로딩 중...</div>;

  // 2. 데이터 없음 처리
  if (!comments.data) return null;

  return (
    <section>
      <ul className="flex flex-col gap-[24px]">
        {comments.data.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} articleId={articleId} />
          </li>
        ))}
      </ul>
    </section>
  );
}
