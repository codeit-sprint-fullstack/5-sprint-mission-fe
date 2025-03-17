import { useState } from "react";

export default function CommentForm({ articles, CommentAdd }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const articleId = articles.id;
    if (!comment.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/comments/articles/${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            articleId,
          }),
        }
      );

      if (!res.ok) throw new Error("댓글 등록 실패");

      setComment("");
      CommentAdd();
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = {
    base: "mt-4 px-6 py-2 text-nowrap text-base font-semibold text-white rounded-lg",
    disabled: "bg-custom-text-gray-50",
    enabled: "bg-custom-color-blue",
  };

  return (
    <>
      <div className="flex flex-col gap-[9px]">
        <p className="text-base font-semibold text-custom-text-black-900 ">
          댓글달기
        </p>
        <div className="flex flex-col items-end">
          <textarea
            placeholder="댓글을 입력해주세요"
            className="w-full h-[104px] px-[24px] py-[16px] bg-custom-input-gray-100 rounded-xl focus:outline-none resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={`${buttonStyle.base} ${
              !comment.trim() || isLoading
                ? buttonStyle.disabled
                : buttonStyle.enabled
            }`}
            onClick={handleSubmit}
            disabled={!comment.trim() || isLoading}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}
