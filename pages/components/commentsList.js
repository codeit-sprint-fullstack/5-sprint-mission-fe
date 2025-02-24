import Image from "next/image";
import DropdownMenu from "./DropDown";
import { updateComment, deleteComment } from "../api/articles";
import Link from "next/link";

export default function CommentsList({ articleId, comments, refreshComments }) {
  const handleEdit = async (commentId) => {
    const newContent = prompt("댓글 수정 내용을 입력하세요:");
    if (newContent) {
      await updateComment({
        articleId,
        content: newContent,
        commentId,
      });
      alert("댓글 수정 완료");
      await refreshComments();
    }
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
      <div className="w-full max-w-[1200px] py-8 px-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-[#fcfcfc] mb-[24px] border-b">
              <div className="flex justify-between mb-6">
                <div className="font-normal text-sm text-[#1f2937]">
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
          ))
        ) : (
          <div className="flex flex-col items-center mt-2 mb-4">
            <Image
              src="/Img_reply_empty.png"
              alt="nooooooooooooo"
              width={140}
              height={140}
            />
            <div className="font-normal text-[#9ca3af]">
              아직 댓글이 없어요,
              <br /> 지금 댓글을 달아보세요
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
