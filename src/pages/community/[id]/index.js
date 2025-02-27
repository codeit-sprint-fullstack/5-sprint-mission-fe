import axios from "@/lib/axios";
import CommentItem from "@components/CommentItem";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;

  let article;
  try {
    const res = await axios.get(`/articles/${id}`);
    article = res.data;
  } catch (err) {
    return {
      notFound: true,
    };
  }

  let comments;
  try {
    const res = await axios.get(`/articles/${id}/comments`);
    comments = res.data.list;
  } catch (err) {
    comments = [];
  }

  return {
    props: {
      article,
      comments,
    },
  };
}

const Post = ({ article, comments: initialComments }) => {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [commentValue, setCommentValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [articleKebabActive, setArticleKebabActive] = useState(false);

  const handleCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await axios.post(`/articles/${article.id}/comments`, {
      userId: "user",
      content: commentValue,
    });
    const newComment = res.data;
    setComments((prev) => [newComment, ...prev]);
    setCommentValue("");
  };

  const handleArticleKebab = () => {
    setArticleKebabActive((prev) => !prev);
  };

  const handleClickUpdateArticle = () => {
    router.push(`/community/write/${article.id}`);
  };

  const handleDeleteArticle = async () => {
    try {
      await axios.delete(`articles/${article.id}`);
      router.push(`/community`);
    } catch (err) {}
  };

  const handleDeleteComment = async (articleId, commentId) => {
    try {
      await axios.delete(`/articles/${articleId}/comments/${commentId}`);
      setComments((prev) => prev.filter((item) => item.id !== commentId));
    } catch (err) {}
  };

  const handleUpdateComment = async (newComment) => {
    setComments((prev) =>
      prev.map((item) => (item.id !== newComment.id ? item : { ...newComment }))
    );
  };

  useEffect(() => {
    setIsActive(commentValue.trim().length > 0);
  }, [commentValue]);

  return (
    <div>
      <div className="pb-4 border-b-[1px] border-b-[#E5E7EB]">
        <div className="flex justify-between relative">
          <div className="text-xl text-[#1F2937] font-bold w-[80%]">
            {article.title}
          </div>
          <div className="absolute right-0 flex flex-col items-end">
            <button onClick={handleArticleKebab} className="relative w-6 h-6">
              <Image src="/ic_kebab.png" fill />
            </button>
            <div
              className={clsx(
                "border-[1px] border-[#D1D5DB] rounded-lg flex flex-col items-center bg-white z-[100]",
                {
                  ["visible"]: articleKebabActive,
                  ["hidden"]: !articleKebabActive,
                }
              )}
            >
              <button
                onClick={handleClickUpdateArticle}
                className="px-6 md:px-10 py-4"
              >
                수정하기
              </button>
              <button
                onClick={handleDeleteArticle}
                className="px-6 md:px-10 py-4"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="flex gap-3 items-center pr-4 md:pr-8 mr-4 md:mr-8 border-r-[1px] border-r-[#E5E7EB]">
            <div className="relative w-10 h-10">
              <Image src={"/ic_profile.png"} fill />
            </div>
            <div className="text-sm text-[#4B5563] font-medium">
              {article.nickname}
            </div>
            <div className="text-sm text-[#9CA3AF] font-normal">
              {dayjs(article.createdAt).format("YYYY-MM-DD")}
            </div>
          </div>
          <div className="flex items-center gap-2 h-10 px-3 rounded-[35px] border-[#E5E7EB] border-[1px]">
            <div className="relative w-8 h-8">
              <Image src="/ic_heart.png" fill />
            </div>
            <div>{article.likeCnt}</div>
          </div>
        </div>
      </div>

      <div className="pt-6 pb-8 text-lg text-[#1F2937] font-normal">
        {article.content}
      </div>

      <div className="mb-[80px]">
        <div className="text-base text-[#111827] font-semibold mb-2">
          댓글달기
        </div>
        <textarea
          value={commentValue}
          onChange={handleCommentValue}
          className="w-full min-h-[104px] rounded-xl px-6 py-4 bg-[#F3F4F6] mb-4"
          placeholder="댓글을 입력해주세요"
        />
        <div className="relative">
          <button
            onClick={handleSubmit}
            className={clsx(
              "text-base text-[#F3F4F6] font-semibold w-[74px] h-[42px] rounded-lg absolute right-0",
              {
                ["bg-[#9CA3AF]"]: !isActive,
                ["bg-[#3692FF]"]: isActive,
              }
            )}
          >
            등록
          </button>
        </div>
      </div>

      <div>
        {comments.length > 0 &&
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
            />
          ))}
        {comments.length === 0 && (
          <div className="flex flex-col items-center">
            <div className="relative w-[140px] h-[140px]">
              <Image src="/img_reply_empty.png" fill />
            </div>
            <div className="text-base text-[#9CA3AF] font-normal text-center mt-2">
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </div>
            <Link
              href="/community"
              className="bg-[#3692FF] flex gap-3 items-center px-8 h-12 rounded-[40px] mt-10"
            >
              <div className="text-lg text-[#F3F4F6]">목록으로 돌아가기</div>
              <div className="relative w-6 h-6">
                <Image src="/btn_medium.png" fill />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
