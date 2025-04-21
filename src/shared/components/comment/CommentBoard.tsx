import Image from "next/image";
import replyImg from "@/shared/assets/Img/base-image/Img_reply_empty.png";
import inquireImg from "@/shared/assets/Img/base-image/none_inquire.png";
import CommentItem from "./CommentItem";
import { Comment } from "@/types";

interface CommentBoardProps {
  comments: Comment[];
  editingId: string | null;
  editContent: string;
  setEditContent: (content: string) => void;
  onEdit: (id: string, content: string) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  type: "article" | "product";
}

export default function CommentBoard({
  comments,
  editingId,
  editContent,
  setEditContent,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
  type,
}: CommentBoardProps) {
  const isProduct = type === "product";

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <Image
          src={isProduct ? inquireImg : replyImg}
          alt="댓글 없음"
          className="w-[140px]"
        />
        <p className="text-base text-center text-custom-text-gray-50">
          {isProduct
            ? "아직 문의가 없어요. 지금 문의를 남겨보세요!"
            : "아직 댓글이 없어요. 지금 댓글을 남겨보세요!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isEditing={editingId === comment.id}
          editContent={editContent}
          setEditContent={setEditContent}
          onEdit={() => onEdit(comment.id, comment.content)}
          onUpdate={() => onUpdate(comment.id)}
          onDelete={() => onDelete(comment.id)}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
