import Image from "next/image";
import userIcon from "@images/user-icon/ic_profile.png";
import replyImg from "@images/base-image/Img_reply_empty.png";
import backIcon from "@images/button-image/ic_back.png";
import CommentModifySelect from "./CommentModifySelect";
import CommentForm from "./CommentForm";
import { fromNow } from "@/lib/day";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CommentList({ articles }) {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchComments = async () => {
    const id = articles.id;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/comments/articles/${id}`
      );
      if (!res.ok) throw new Error("댓글 불러오기 실패");

      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdate = async (commentId, originalContent) => {
    const updatedContent = editContent.trim() || originalContent;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/comments/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: updatedContent }),
        }
      );
      if (!res.ok) throw new Error("댓글 수정 실패");

      setEditingId(null);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <CommentForm articles={articles} CommentAdd={fetchComments} />
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col w-full gap-6 bg-custom-color-list-gray border-b border-custom-color-border-gray pb-[12px]"
            >
              <section className="flex justify-between gap-[24px]">
                {editingId === comment.id ? (
                  <input
                    type="text"
                    value={editContent}
                    placeholder="수정 내용을 입력해주세요"
                    onChange={(e) => setEditContent(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleUpdate(comment.id, comment.content)
                    }
                    className="text-sm font-normal w-full border-b border-red-500 bg-custom-color-list-gray px-2 py-1 focus:outline-none"
                  />
                ) : (
                  <p className="text-sm font-normal text-custom-text-black-800">
                    {comment.content}
                  </p>
                )}
                <CommentModifySelect
                  commentId={comment.id}
                  onUpdate={fetchComments}
                  onEdit={() => handleEdit(comment)}
                />
              </section>

              <section className="flex gap-2">
                <Image
                  src={userIcon}
                  className="w-[32px] object-contain"
                  alt="user Icon"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium text-custom-text-gray-400">
                    물렁한 판다
                  </p>
                  <p className="text-xs font-normal text-custom-text-gray-50">
                    {fromNow(comment.createdAt)}
                  </p>
                </div>
              </section>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src={replyImg}
              alt="no comment img"
              className="w-[140px] object-contain"
            />
            <p className="text-base font-normal text-center text-custom-text-gray-50">
              아직 댓글이 없어요,
              <br /> 지금 댓글을 달아보세요!
            </p>
          </div>
        )}
        <section className="flex justify-center">
          <Link
            href={"/article"}
            className="flex items-center px-6 py-2 gap-2 text-nowrap bg-custom-color-blue text-lg text-white font-semibold rounded-4xl"
          >
            <p>목록으로 돌아가기</p>
            <Image
              src={backIcon}
              alt="back Icon"
              className="w-[24px] pt-0.5 object-contain"
            />
          </Link>
        </section>
      </div>
    </>
  );
}
