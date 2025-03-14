import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import axios from "@/lib/axios";

const CommentItem = ({ comment, handleDeleteComment, handleUpdateComment }) => {
  const [updateActive, setUpdateActive] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isActive, setIsActive] = useState(false);

  const handleKebabActive = () => {
    setIsActive((prev) => !prev);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleReset = () => {
    setContent(comment.content);
    setUpdateActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/comments/${comment.id}`, {
        content: content,
      });
      handleUpdateComment(res.data);
      setUpdateActive(false);
    } catch (err) {}
  };

  return (
    <div className="bg-[#FCFCFC] border-b-[1px] border-b-[#E5E7EB] mb-6 relative">
      <div className={clsx("flex justify-between")}>
        {updateActive ? (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-end"
          >
            <textarea
              value={content}
              onChange={handleChangeContent}
              className="w-full min-h-20 max-h-20 bg-[#F3F4F6] rounded-lg px-2 py-2"
            />
            <div className="mt-4 flex gap-3">
              <button
                type="reset"
                onClick={handleReset}
                className="w-[66px] h-[42px] bg-[#9CA3AF] text-base text-white font-semibold rounded-lg"
              >
                취소
              </button>
              <button
                type="submit"
                className="w-[106px] h-[42px] bg-[#3692FF] text-base text-white font-semibold rounded-lg"
              >
                수정
              </button>
            </div>
          </form>
        ) : (
          <div className="text-sm text-[#1F2937] font-normal w-[80%]">
            {comment.content}
          </div>
        )}

        {!updateActive && (
          <div className="absolute right-0 flex flex-col items-end">
            <button onClick={handleKebabActive} className="relative w-6 h-6">
              <Image src="/ic_kebab.png" fill />
            </button>
            <div
              className={clsx(
                "border-[1px] border-[#D1D5DB] rounded-lg flex flex-col items-center bg-white z-[100]",
                {
                  ["visible"]: isActive,
                  ["hidden"]: !isActive,
                }
              )}
            >
              <button
                onClick={() => {
                  setIsActive(false);
                  setUpdateActive(true);
                }}
                className="px-6 md:px-10 py-4"
              >
                수정하기
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                  handleDeleteComment(comment.id);
                }}
                className="px-6 md:px-10 py-4"
              >
                삭제하기
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6 mb-3 items-center">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image src={comment.writer.image || "/ic_profile.png"} fill />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-sm text-[#4B5563] font-normal">
            {comment.writer.nickname}
          </div>
          <div className="text-xs text-[#9CA3AF] font-normal">
            {dayjs().diff(dayjs(comment.createdAt), "hour")}시간 전
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
