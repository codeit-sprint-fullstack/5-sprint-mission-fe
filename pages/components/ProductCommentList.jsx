import { useState, useEffect } from "react";
import Image from "next/image";
import DropdownMenu from "./DropDown";
import { updateProductComment, deleteProductComment } from "../api/products"; // ✅ 상품 댓글 API로 변경
import { fetchProductComments } from "../api/products"; // ✅ 상품 댓글 불러오기 API
import RelativeTime from "./relativeTime";

export default function ProductCommentList({ productId, refreshComments }) {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSubmit = async (commentId) => {
    if (editContent.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      await updateProductComment({
        // ✅ 상품 댓글 수정 API 사용
        productId,
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
        await deleteProductComment({ productId, commentId }); // ✅ 상품 댓글 삭제 API 사용
        alert("댓글이 삭제되었습니다.");
        await refreshComments();
      } catch (error) {
        console.error(error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    if (!productId) {
      return;
    }

    const loadComments = async () => {
      try {
        const fetchedComments = await fetchProductComments(productId); // ✅ 상품 댓글 불러오기 API 사용
        setComments(fetchedComments.list || []);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    loadComments();
  }, [productId]);

  return (
    <div className="w-full max-w-[1200px] py-8">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="bg-[#fcfcfc] mb-[24px] border-b">
            <div className="flex justify-between mb-6">
              {editingCommentId === comment.id ? (
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
              {editingCommentId !== comment.id && (
                <DropdownMenu
                  onEdit={() => handleEdit(comment)}
                  onDelete={() => handleDelete(comment.id)}
                />
              )}
            </div>
            {editingCommentId === comment.id && (
              <div className="flex justify-end mb-4 gap-1">
                <button
                  onClick={handleCancelEdit}
                  className="py-2 px-3 text-[#737373] font-semibold"
                >
                  취소
                </button>
                <button
                  onClick={() => handleEditSubmit(comment.id)}
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
                  {comment.writer?.nickname || "익명"}
                </div>
                <div className="text-xs text-[#9CA3AF] font-normal">
                  <RelativeTime timestamp={comment.createdAt} />
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
              alt="no comments"
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
  );
}
