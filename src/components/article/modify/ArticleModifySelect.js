import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import kebabIcon from "@images/dropdown-icon/ic_kebab.png";

export default function ArticleDropdownBar({ articles }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const articleId = articles.id;

  const handleModify = () => {
    router.push(`/article/modify/${articleId}`);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/articles/${articleId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("게시글 삭제 실패");
      router.push("/article");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="relative group " onClick={() => setIsOpen(!isOpen)}>
      <Image src={kebabIcon} alt="옵션" className="w-[24px] object-contain" />
      {isOpen && (
        <ul className="absolute w-[102px] md:w-[139px] border border-custom-color-border-gray rounded-xl bg-white right-0  top-6 z-9">
          <li
            className="px-5 py-3 text-nowrap border-b border-custom-color-border-gray cursor-pointer"
            onClick={handleModify}
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
