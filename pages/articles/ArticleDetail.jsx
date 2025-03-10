import ArticleCommentsList from "../components/ArticleCommentsList";
import Image from "next/image";
import DropdownMenu from "../components/DropDown";
import { createComment, fetchArticleComments } from "../api/articles";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { deleteArticle } from "../api/articles";

export default function ArticleDetail({ article = {} }) {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState(article?.comments ?? []);
  const router = useRouter();
  const { user } = useAuth();

  const refreshComments = async () => {
    const updateComments = await fetchArticleComments(article.id);
    setComments(updateComments);
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    } else {
      if (commentContent.trim().length === 0) {
        alert("댓글을 입력해주세요.");
        return;
      }

      try {
        await createComment({
          articleId: article.id,
          content: commentContent,
        });
        setCommentContent("");
        alert("댓글이 등록되었습니다.");
        await refreshComments();
        router.reload();
      } catch (error) {
        console.error(error);
        alert("댓글 등록에 실패했습니다.");
      }
    }
  };

  const handleEdit = () => {
    router.push(`/articles/${article.id}/edits`); // 수정 페이지 이동예정
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteArticle({ articleId: article.id });
        alert("게시글이 삭제되었습니다.");
        router.push("/articles");
        const updatedComments = await fetchArticleComments(articleId);
        setComments(updatedComments);
      } catch (error) {
        console.error(error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-col items-center w-full px-6 ">
      <div className="w-full max-w-[1200px] border-b pb-4 mb-6">
        <div className="flex justify-between">
          <div className="text-xl font-bold mb-4">{article.title}</div>
          <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div className="flex justify-between max-w-[354px]  ">
          <div className="flex space-x-2 items-center gap-2">
            <Image
              src="/profilenone.png"
              alt="user icon"
              width={32}
              height={32}
            />
            <div className="ml-4 mr-2">{article.writer.nickname}</div>
            <div>{new Date(article.createdAt).toLocaleDateString()}</div>
          </div>
          <div className="flex items-center border rounded-[35px] px-3 py-1 gap-1">
            <Image
              src="/mediumHeart.png"
              alt="user icon"
              width={26}
              height={24}
            />
            {article.likeCount}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] text-[18px] font-normal mb-9">
        {article.content}
      </div>
      <div className="w-full max-w-[1200px] ">
        <div className="font-semibold mb-[9px]">댓글 달기</div>
        <textarea
          placeholder="댓글을 입력해주세요"
          className="w-full h-[104px] bg-[#f3f4f6] p-4 rounded-lg outline-none resize-none"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="w-full max-w-[1200px] flex justify-end">
        <button
          onClick={handleSubmit}
          className="border rounded-lg py-2 px-[23px] mt-4 text-white bg-[#9ca3af] "
        >
          등록
        </button>
      </div>

      <ArticleCommentsList
        articleId={article.id}
        comments={comments}
        refreshComments={refreshComments}
      />
    </div>
  );
}
