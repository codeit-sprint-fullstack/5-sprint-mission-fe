import { useState } from "react";
import Image from "next/image";
import DropdownMenu from "./DropDown";
import { updateComment, deleteComment } from "../api/articles";
import Link from "next/link";

export default function CommentsList({ articleId, comments, refreshComments }) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

  const handleEditSubmit = async (commentId) => {
    if (editContent.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      await updateComment({
        articleId,
        content: editContent,
        commentId,
      });
      alert("댓글 수정 완료");
      setEditingCommentId(null);
      setEditContent("");
      await refreshComments();
    } catch (error) {
      console.error(error);
      alert("댓글 수정에 실패했습니다.");
    }
  };
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };
  const handleDelete = async (commentId) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteComment({ articleId, commentId });
        alert("댓글이 삭제되었습니다.");
        await refreshComments();
      } catch (error) {
        console.error(error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-[1200px] py-8 ">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-[#fcfcfc] mb-[24px] border-b">
              <div className="flex justify-between mb-6">
                {editingCommentId === comment._id ? (
                  <textarea
                    className="w-full resize-none outline-none border-none px-6 py-4 bg-[#f3f4f6] rounded-xl"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                ) : (
                  <div className="font-normal text-sm text-[#1f2937]">
                    {comment.content}
                  </div>
                )}
                {editingCommentId !== comment._id && (
                  <DropdownMenu
                    onEdit={() => handleEdit(comment)}
                    onDelete={() => handleDelete(comment._id)}
                  />
                )}
              </div>
              {editingCommentId === comment._id && (
                <div className="flex justify-end mb-4 gap-1">
                  <button
                    onClick={handleCancelEdit}
                    className="py-2 px-3 text-[#737373] font-semibold"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleEditSubmit(comment._id)}
                    className="border rounded-lg py-1 px-4 text-white bg-[#3692ff]"
                  >
                    수정 완료
                  </button>
                </div>
              )}
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
          ))
        ) : (
          <div className="flex flex-col items-center text-center text-[#9CA3AF] text-sm">
            <div>
              <Image
                src="/Img_reply_empty.png"
                alt="noooo"
                width={100}
                height={100}
              />
            </div>
            <div>
              아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!
            </div>
          </div>
        )}
      </div>
      <Link href="/articles">
        <div className="flex gap-2 rounded-[40px] py-[11px] px-[42px] border-none bg-[#3692ff] text-white items-center">
          목록으로 돌아가기
          <Image src="/ic_back.png" alt="user icon" width={24} height={24} />
        </div>
      </Link>
    </>
  );
}
