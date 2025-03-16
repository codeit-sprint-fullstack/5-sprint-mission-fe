import Image from "next/image";
import userIcon from "@images/user-icon/ic_profile.png";
import inquireImg from "@images/base-image/none_inquire.png";
import backIcon from "@images/button-image/ic_back.png";
import InquireForm from "./InquireForm";
import { fromNow } from "@/lib/day";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import InquireModifySelect from "./InquireModifySelect";
import { useState } from "react";
import Link from "next/link";

export default function InquireList({ product }) {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const { data: inquires = [], refetch } = useQuery({
    queryKey: ["inquires", product.id],
    queryFn: async () => {
      if (!product?.id) throw new Error("🚨 product.id가 존재하지 않습니다.");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ARL_PANDA_URL}/products/${product.id}/comments`
      );
      return res.data.list || [];
    },
    enabled: !!product?.id,
  });

  const { mutate: updateInquire, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ inquireId, content }) => {
      return axios.patch(
        `${process.env.NEXT_PUBLIC_ARL_PANDA_URL}/comments/${inquireId}`,
        { content }
      );
    },
    onSuccess: () => {
      refetch();
      setEditingId(null);
    },
    onError: () => {
      alert("문의 수정 실패");
    },
  });

  const handleEdit = (inquire) => {
    setEditingId(inquire.id);
    setEditContent(inquire.content);
  };

  const handleUpdate = (inquireId, originalContent) => {
    const updatedContent = editContent.trim() || originalContent;
    updateInquire({ inquireId, content: updatedContent });
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <InquireForm productId={product.id} onAdd={refetch} />
        {inquires.length > 0 ? (
          inquires.map((inquire) => (
            <div
              key={inquire.id}
              className="flex flex-col w-full gap-6 bg-custom-color-list-gray border-b border-custom-color-border-gray pb-[12px]"
            >
              <section className="flex justify-between gap-[24px]">
                {editingId === inquire.id ? (
                  <input
                    type="text"
                    value={editContent}
                    placeholder="개인정보를 공유 및 요청하거나 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                    onChange={(e) => setEditContent(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleUpdate(inquire.id, inquire.content)
                    }
                    className="text-sm font-normal w-full border-b border-red-500 bg-custom-color-list-gray px-2 py-1 focus:outline-none"
                  />
                ) : (
                  <p className="text-sm font-normal text-custom-text-black-800">
                    {inquire.content}
                  </p>
                )}
                <InquireModifySelect
                  commentId={inquire.id}
                  onUpdate={refetch}
                  onEdit={() => handleEdit(inquire)}
                />
              </section>

              <section className="flex gap-2">
                <Image
                  src={userIcon}
                  className="w-[32px] object-contain"
                  alt="user Icon"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium text-custom-text-gray-400">
                    물렁한 판다
                  </p>
                  <p className="text-xs font-normal text-custom-text-gray-50">
                    {fromNow(inquire.createdAt)}
                  </p>
                </div>
              </section>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src={inquireImg}
              alt="no inquire img"
              className="w-[140px] object-contain"
            />
            <p className="text-base font-normal text-center text-custom-text-gray-50">
              아직 문의가 없어요
            </p>
          </div>
        )}
        <section className="flex justify-center">
          <Link
            href={"/items"}
            className="flex items-center px-6 py-2 gap-2 text-nowrap bg-custom-color-blue text-lg text-white font-semibold rounded-4xl"
          >
            <p>목록으로 돌아가기</p>
            <Image
              src={backIcon}
              alt="back Icon"
              className="w-[24px] pt-0.5 object-contain"
            />
          </Link>
        </section>
      </div>
    </>
  );
}
