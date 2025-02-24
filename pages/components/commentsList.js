import { useEffect, useState } from "react";
import { fetchArticleComments } from "../api/articles";
import Image from "next/image";

export default function CommentsList({ articleId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (articleId) {
      fetchArticleComments(articleId).then(setComments).catch(console.error);
    }
  }, [articleId]);

  return (
    <div className="w-full max-w-[1200px] py-8 px-4 ">
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="bg-[#fcfcfc] mb-[24px] border-b">
            <div className="flex justify-between mb-6">
              <div className=" font-normal text-sm text-[#1f2937]">
                {comment.content}
              </div>
              <div>수정삭제</div>
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
                  몇 시간전
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
