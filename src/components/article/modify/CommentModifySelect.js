import { useState } from "react";
import Image from "next/image";
import kebabIcon from "@images/dropdown-icon/ic_kebab.png";

export default function CommentModifySelect({ commentId, onUpdate, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("댓글 삭제 실패");
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="relative group " onClick={() => setIsOpen(!isOpen)}>
      <Image src={kebabIcon} className="w-[24px] object-contain" />
      {isOpen && (
        <ul className="absolute w-[102px] md:w-[139px] border border-custom-color-border-gray rounded-xl bg-white right-0  top-6 z-9">
          <li
            className="px-5 py-3 text-nowrap border-b border-custom-color-border-gray cursor-pointer"
            onClick={onEdit}
          >
            수정하기
          </li>
          <li
            className="px-5 py-3 text-nowrap cursor-pointer"
            onClick={handleDelete}
          >
            삭제하기
          </li>
        </ul>
      )}
    </button>
  );
}
