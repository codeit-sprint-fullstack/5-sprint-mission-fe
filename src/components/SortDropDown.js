import { useState } from "react";
import Image from "next/image";
import sortIcon from "@/assets/images/ic-sort.svg";
import arrowDownIcon from "@/assets/images/ic-arrow-down.svg";

function SortDropDown({ sortValue, onChangeSortValue }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortButtonText = sortValue === "recent" ? "최신순" : "좋아요순";

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSortClick = (sort) => {
    onChangeSortValue(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex md:hidden justify-center items-center p-[9px] rounded-[12px] border border-gray-200"
      >
        <Image src={sortIcon} alt="sort" width={24} height={24} />
      </button>
      <button
        onClick={handleToggle}
        className="hidden md:flex items-center relative w-[130px] h-[42px] rounded-[12px] border border-gray-200"
      >
        <span className="w-full text-center pr-[24px]">{sortButtonText}</span>
        <Image
          src={arrowDownIcon}
          alt="sort"
          width={24}
          height={24}
          className="absolute right-3"
        />
      </button>
      {isOpen && (
        <div className="absolute top-[43px] right-0 md:left-0 z-50 w-[130px] h-[42px] rounded-[12px]">
          <button
            onClick={() => handleSortClick("recent")}
            className="flex justify-center items-center gap-[24px] w-[130px] h-[42px] rounded-t-[12px] bg-white border border-gray-200"
          >
            최신순
          </button>
          <button
            onClick={() => handleSortClick("likeCount")}
            className="flex justify-center items-center gap-[24px] w-[130px] h-[42px] rounded-b-[12px] border-b border-r border-l border-gray-200 bg-white"
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}

export default SortDropDown;
