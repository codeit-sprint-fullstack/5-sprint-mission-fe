import CommentsList from "./commentsList";
import Image from "next/image";

export default function ArticleDetail({ article }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[1200px]">
        <div className="flex justify-between">
          <div>{article.title}</div>
          <div>수정 · 삭제</div>
        </div>
        <div className="flex justify-between max-w-[354px]">
          <div className="flex space-x-2">
            <Image
              src="/profilenone.png"
              alt="user icon"
              width={32}
              height={32}
            />
            <div>{article.username}</div>
            <div>{new Date(article.createdAt).toLocaleDateString()}</div>
          </div>
          <div>{article.likeCount} 좋아요</div>
        </div>
      </div>

      <CommentsList articleId={article._id} />
    </div>
  );
}
