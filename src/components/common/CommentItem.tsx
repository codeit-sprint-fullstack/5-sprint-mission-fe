import { useState, useEffect } from "react";
import Image from "next/image";
import { updateComment, deleteComment } from "@/services/comments";
import { formatRelativeTime } from "@/utils/date";
import ContextMenu from "./ContextMenu";
import { Comment } from "@/types/comments.types";

interface CommentItemProps {
  comment: Comment;
  articleId: string;
  onCommentUpdated: () => void;
}

const CommentItem = ({
  comment,
  articleId,
  onCommentUpdated,
}: CommentItemProps) => {
  // 콘솔로 실제 댓글 데이터 구조 확인
  console.log("댓글 컴포넌트 데이터:", comment);
  console.log("댓글 user 속성:", comment.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인한 사용자 정보 확인을 위한 상태
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserNickname, setCurrentUserNickname] = useState<string>("");

  // 로그인한 사용자 정보 확인
  useEffect(() => {
    try {
      const userInfoStr = localStorage.getItem("userInfo");
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        setCurrentUserId(userInfo.id || null);
        setCurrentUserNickname(userInfo.nickname || "");
        console.log("현재 로그인한 사용자:", userInfo);
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
    }
  }, []);

  // 모든 가능한 작성자 닉네임 소스 중에서 가장 적절한 것을 선택
  const getDisplayNickname = () => {
    // user 속성에 nickname이 있으면 사용
    if (comment.user?.nickname) {
      return comment.user.nickname;
    }

    // 기본값
    return "작성자";
  };

  // 자신의 댓글인지 확인
  const isMyComment = () => {
    // userId와 currentUserId 비교
    if (comment.userId && currentUserId) {
      return comment.userId === currentUserId;
    }

    return false;
  };

  const handleMenuSelect = async (value: string) => {
    if (value === "edit") {
      setIsEditing(true);
    } else if (value === "delete") {
      if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
        try {
          console.log(
            `댓글 삭제: 게시글 ID ${articleId}, 댓글 ID ${comment.id}`
          );
          await deleteComment(comment.id);
          alert("댓글이 삭제되었습니다.");
          onCommentUpdated();
        } catch (err) {
          console.error("댓글 삭제에 실패했습니다.", err);
          alert("댓글 삭제에 실패했습니다.");
        }
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateComment(comment.id, editContent);
      setIsEditing(false);
      onCommentUpdated();
    } catch (err) {
      console.error("댓글 수정에 실패했습니다.", err);
      alert("댓글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <Image src="/icons/Avatar.png" alt="profile" width={24} height={24} />
          <span className="ml-2 text-sm text-gray-600">
            {getDisplayNickname()}
          </span>
        </div>
        <span className="mx-2 text-gray-400">·</span>
        <span className="text-sm text-gray-400">
          {formatRelativeTime(comment?.createdAt || "")}
        </span>
        {isMyComment() && (
          <div className="ml-auto">
            <ContextMenu
              options={[
                { value: "edit", label: "수정하기" },
                { value: "delete", label: "삭제하기" },
              ]}
              onSelect={handleMenuSelect}
              trigger={
                <Image
                  src="/icons/ic_kebab.png"
                  alt="edit-delete"
                  width={24}
                  height={24}
                />
              }
            />
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="mt-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            disabled={isSubmitting}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-primary-blue text-white rounded-md"
              disabled={isSubmitting}
            >
              수정
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-800">{comment?.content || ""}</p>
      )}
    </div>
  );
};

export default CommentItem;
