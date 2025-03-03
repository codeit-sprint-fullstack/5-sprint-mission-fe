import Image from "next/image";
import sortIcon from "../../assets/icons/ic_sort.svg";
import ArrowDownIcon from "../../assets/icons/ic_arrow_down.svg";

export default function SortSelection() {
  return (
    <div className="w-[42px] h-[42px] sm:w-[130px] rounded-xl border border-gray-300 p-2 sm:px-5 sm:py-2 cursor-pointer">
      {/* 모바일 - 이미지 */}
      <Image
        className="sm:hidden"
        src={sortIcon}
        alt="sort"
        width={24}
        height={24}
      />
      {/* 데스크탑 - 텍스트 + 아이콘 */}
      <div className="hidden sm:block">
        <div className="flex justify-between">
          <p className="text-base font-normal">최신순</p>
          <Image src={ArrowDownIcon} alt="arrow-down" width={24} height={24} />
        </div>
      </div>
    </div>
  );
}
