import { useEffect, useState } from "react";
import { fetchArticleComments } from "../api/articles";
import Image from "next/image";
import DropdownMenu from "./DropDown";
import { updateComment } from "../api/articles";
import axios from "axios";
import { deleteComment } from "../api/articles";
import { useRouter } from "next/router";

export default function CommentsList({ articleId, commentId, comment }) {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (articleId) {
      fetchArticleComments(articleId).then(setComments).catch(console.error);
    }
  }, [articleId]);

  const handleEdit = async (commentId) => {
    const newContent = prompt("댓글 수정 내용을 입력하세요:");
    if (newContent) {
      await updateComment({
        articleId: articleId,
        content: newContent,
        commentId: commentId,
      });
      alert("댓글 수정 완료");
      const updatedComments = await fetchArticleComments(articleId);
      setComments(updatedComments);
    }
  };

  const handleDelete = async (commentId) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteComment({
          articleId: articleId,
          commentId: commentId,
        });
        alert("댓글이 삭제되었습니다.");
        // 삭제 후 댓글 리스트 다시 불러오기
        const updatedComments = await fetchArticleComments(articleId);
        setComments(updatedComments);
      } catch (error) {
        console.error(error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="w-full max-w-[1200px] py-8 px-4 ">
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="bg-[#fcfcfc] mb-[24px] border-b">
            <div className="flex justify-between mb-6">
              <div className=" font-normal text-sm text-[#1f2937]">
                {comment.content}
              </div>
              <DropdownMenu
                onEdit={() => handleEdit(comment._id)}
                onDelete={() => handleDelete(comment._id)}
              />
            </div>
            <div className="flex gap-2 pb-3">
              <Image
                src="/profilenone.png"
                alt="user icon"
                width={32}
                height={32}
              />

              <div className="flex flex-col">
                <div className="text-xs text-[#4B5563] font-normal">
                  {comment.username}
                </div>
                <div className="text-xs text-[#9CA3AF] font-normal">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
