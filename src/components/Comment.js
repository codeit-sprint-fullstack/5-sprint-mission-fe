import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateComment, useDeleteComment } from "@/lib/queries/articles";
import { formatRelativeTime } from "@/utils/dateFormat";

import Image from "next/image";
import DropDown from "@/components/DropDown";
import defaultUserImage from "@/assets/images/ic-profile.svg";

function Comment({ comment, articleId }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      content: comment.content,
    },
    mode: "onChange",
  });

  const { mutate: updateComment } = useUpdateComment({ articleId });
  const { mutate: deleteComment } = useDeleteComment({ commentId: comment.id });

  const imageUrl = defaultUserImage;

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  // 댓글 수정
  const onSubmit = (data) => {
    updateComment(
      { commentId: comment.id, content: data.content },
      {
        onSuccess: () => {
          setIsEditing(false);
          alert("댓글이 수정되었습니다.");
        },
        onError: (error) => {
          console.error("댓글 수정 실패", error);
          alert("댓글 수정에 실패했습니다.");
        },
      }
    );
  };

  // 댓글 삭제
  const handleDeleteButtonClick = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(
        { commentId: comment.id },
        {
          onSuccess: () => {
            alert("댓글이 삭제되었습니다.");
          },
          onError: (error) => {
            console.error("댓글 삭제 실패", error);
            alert("댓글 삭제에 실패했습니다.");
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col justify-between items-start gap-[16px] w-full border-b border-[#DFDFDF] bg-[#FCFCFC] p-[25px]">
      <div className="flex items-center gap-[8px] w-full text-[14px] font-[400] text-gray-800">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex gap-2">
            <input
              {...register("content", {
                required: true,
                validate: (value) => value.trim().length > 0,
              })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-color-100 focus:border-transparent bg-white"
            />
            <button
              type="submit"
              disabled={!isValid}
              className={`px-3 py-1 rounded ${
                !isValid
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-brand-color-100 text-white hover:bg-brand-color-200"
              }`}
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleEditCancel}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              취소
            </button>
          </form>
        ) : (
          <div className="flex-1">{comment.content}</div>
        )}
        <DropDown
          onEditClick={handleEditButtonClick}
          onDeleteClick={handleDeleteButtonClick}
        />
      </div>
      <div className="flex items-start gap-[8px]">
        <Image src={imageUrl} alt="user" width={32} height={32} />
        <div className="flex flex-col gap-[4px]">
          <span className="text-[12px] font-[400] text-gray-600">
            {comment.username}
          </span>
          <span className="text-[12px] font-[400] text-gray-400">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
