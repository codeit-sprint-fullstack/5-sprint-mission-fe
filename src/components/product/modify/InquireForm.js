import axios from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function InquireForm({ productId, onAdd }) {
  const [inquire, setInquire] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ content }) => {
      const token = localStorage.getItem("accessToken");
      console.log("inquire", inquire);
      console.log("token", token);
      return axios.post(
        `${process.env.NEXT_PUBLIC_ARL_URL}/products/${productId}/comments`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      setInquire("");
      onAdd();
    },
    onError: () => {
      alert("문의 등록 중 오류가 발생했습니다.");
    },
  });

  const buttonStyle = {
    base: "mt-4 px-6 py-2 text-nowrap text-base font-semibold text-white rounded-lg",
    disabled: "bg-custom-text-gray-50",
    enabled: "bg-custom-color-blue",
  };

  return (
    <>
      <div className="flex flex-col gap-[9px]">
        <p className="text-base font-semibold text-custom-text-black-900 ">
          문의 작성
        </p>
        <div className="flex flex-col items-end">
          <textarea
            placeholder="개인정보를 공유 및 요청하거나 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            className="w-full h-[104px] px-[24px] py-[16px] bg-custom-input-gray-100 rounded-xl focus:outline-none resize-none"
            value={inquire}
            onChange={(e) => setInquire(e.target.value)}
            disabled={isLoading}
          />
          <button
            className={`${buttonStyle.base} ${
              !inquire.trim() || isLoading
                ? buttonStyle.disabled
                : buttonStyle.enabled
            }`}
            onClick={() => mutate({ content: inquire })}
            disabled={!inquire.trim() || isLoading}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}
