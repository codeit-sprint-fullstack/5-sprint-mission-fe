import kebabImg from "@/public/imgs/ic_kebab.png";
import Image from "next/image";
import profileImg from "@/public/imgs/ic_profile.png";
import { CommentCard } from "@/types/ArticleCard";
import { timeAgo } from "@/functions/timeAgo";
import { useEffect, useState } from "react";
import Button from "./common/Button";
import api from "@/utils/axiosInstance";
import { useRouter } from "next/router";

interface CommentProps {
  comment: CommentCard;
}

export default function Comment({ comment }: CommentProps) {
  const [isMenuBar, setIsMenuBar] = useState(false);
  const [isEditMod, setIsEditMod] = useState(false);
  const [commentVal, setCommentVal] = useState(comment.content);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(()=> {
    if(commentVal === "") setIsVerified(false);
    else setIsVerified(true);
  },[commentVal])

  const router = useRouter();

  function handleMenu() {
    setIsMenuBar((prev) => !prev);
  }

  function handleEditMod() {
    setIsMenuBar(false);
    setIsEditMod(true);
  }

  function handleCancel() {
    setIsEditMod(false);
  }

  function handleCommentVal (e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setCommentVal(value);
  }



  async function patchComment () {
    setIsEditMod(false);
    await api.patch(`/comment/${comment.id}`, {
      content: commentVal,
    })
    router.replace(router.asPath);
  }

  async function deleteComment () {
    setIsMenuBar(false);
    await api.delete(`/comment/${comment.id}`);
    router.replace(router.asPath);
  }

  return (
    <div className="bg-[#FCFCFC] flex flex-col gap-6 border-b pb-3">
      <div className="flex justify-between">
        {!isEditMod ? (
          <>
            <div>{comment.content}</div>
            <div className="relative">
              <div
                className="relative w-[24px] h-[24px] cursor-pointer"
                onClick={handleMenu}
              >
                <Image
                  src={kebabImg}
                  fill
                  alt="댓글 관리 메뉴"
                  objectFit="cover"
                  unoptimized
                />
              </div>
              {isMenuBar && (
                <div className="absolute right-2">
                  <div
                    className="bg-white border border-[#D1D5DB] pt-[16px] pb-[12px] w-[102px] rounded-tl-lg rounded-tr-lg flex justify-center text-[#6B7280] z-50 cursor-pointer hover:bg-slate-50"
                    onClick={handleEditMod}
                  >
                    수정하기
                  </div>
                  <div className="bg-white border-x border-b border-[#D1D5DB] pt-[16px] pb-[12px] w-[102px] rounded-bl-lg rounded-br-lg flex justify-center text-[#6B7280] z-50 cursor-pointer hover:bg-slate-50" onClick={deleteComment}>
                    삭제하기
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-[100%]">
            <textarea
              className="focus:outline-[#3692FF] bg-[#F3F4F6] w-[100%] rounded-xl px-[24px] py-[16px] h-[80px] resize-none"
              defaultValue={comment.content}
              onChange={handleCommentVal}
            />
          </div>
        )}
      </div>
      {isEditMod ? (
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="relative w-[40px] h-[40px]">
              <Image
                src={profileImg}
                fill
                alt="프로필 이미지"
                objectFit="cover"
                unoptimized
              />
            </div>
            <div>
              <div className="text-[#4B5563]">익명</div>
              <div className="text-[#9CA3AF]">{timeAgo(comment.createdAt)}</div>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="cursor-pointer" onClick={handleCancel}>취소</div>
            <Button name="수정 완료"  disabled={!isVerified} click={patchComment}/>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="relative w-[40px] h-[40px]">
            <Image
              src={profileImg}
              fill
              alt="프로필 이미지"
              objectFit="cover"
              unoptimized
            />
          </div>
          <div>
            <div className="text-[#4B5563]">익명</div>
            <div className="text-[#9CA3AF]">{timeAgo(comment.createdAt)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
