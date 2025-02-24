import CommentsList from "./commentsList";
import Image from "next/image";

export default function ArticleDetail({ article }) {
  return (
    <div className="flex flex-col items-center w-full ">
      <div className="w-full max-w-[1200px] border-b pb-4 mb-6">
        <div className="flex justify-between">
          <div className="text-xl font-bold mb-4">{article.title}</div>
          <div>수정 · 삭제</div>
        </div>
        <div className="flex justify-between max-w-[354px]  ">
          <div className="flex space-x-2 items-center gap-2">
            <Image
              src="/profilenone.png"
              alt="user icon"
              width={32}
              height={32}
            />
            <div className="ml-4 mr-2">{article.username}</div>
            <div>{new Date(article.createdAt).toLocaleDateString()}</div>
          </div>
          <div className="flex items-center border rounded-[35px] px-3 py-1 gap-1">
            <Image
              src="/mediumHeart.png"
              alt="user icon"
              width={26}
              height={24}
            />
            {article.likeCount}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] text-[18px] font-normal mb-9">
        {article.content}
      </div>
      <div className="w-full max-w-[1200px] ">
        <div className="font-semibold mb-[9px]">댓글 달기</div>
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="w-full bg-gray-100 p-4 rounded-lg outline-none"
        />
      </div>
      <div className="w-full max-w-[1200px] flex justify-end">
        <div className="border rounded-lg py-2 px-[23px] mt-4 text-white bg-[#9ca3af] ">
          등록
        </div>
      </div>

      <CommentsList articleId={article._id} />
    </div>
  );
}
