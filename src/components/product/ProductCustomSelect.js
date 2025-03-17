import { useState } from "react";
import Image from "next/image";
import sortIcon from "@images/dropdown-icon/ic_sort.png";
import dropArrow from "@images/dropdown-icon/ic_arrow_down.png";

export default function ProductCustomSelect({ sortOrder, setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="relative group flex justify-center md:justify-between w-[42px] md:w-[130px] border rounded-xl border-custom-button-gray-200 md:px-5 md:py-3 text-nowrap"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Image
        src={sortIcon}
        alt="정렬 아이콘"
        className="block md:hidden w-[24px] object-contain"
      />
      <p className="hidden md:block text-base font-normal">
        {sortOrder === "recent" ? "최신순" : "좋아요순"}
      </p>
      <Image
        src={dropArrow}
        alt="드롭다운 화살표"
        className="w-[24px] object-contain hidden md:block"
      />
      {isOpen && (
        <ul className="absolute md:w-[118px] border border-custom-color-border-gray rounded-xl bg-white right-0 top-14 md:left-0 md:top-14">
          <li
            className="px-5 py-3 border-b border-custom-color-border-gray cursor-pointer"
            onClick={() => setSortOrder("recent")}
          >
            최신순
          </li>
          <li
            className="px-5 py-3 cursor-pointer"
            onClick={() => () => setSortOrder("favorite")}
          >
            좋아요순
          </li>
        </ul>
      )}
    </button>
  );
}
