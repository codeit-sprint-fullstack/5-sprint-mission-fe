import { useRouter } from "next/router";
import CommentsList from "../components/commentsList";

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>{id}번 게시글</div>
      <CommentsList />
    </>
  );
}
