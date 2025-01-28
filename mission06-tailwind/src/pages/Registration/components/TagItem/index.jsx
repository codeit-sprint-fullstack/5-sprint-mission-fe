import iconX from "../../../../assets/tag/ic_X.png";
import { memo } from "react";

const TagItem = memo(function TagItem({ children, onDelete }) {
  return (
    <div className="inline-flex bg-[#F3F4F6] rounded-[26px] px-[16px] py-[5px] text-[#1F2937] text-[1rem] leading-[26px] font-normal gap-[8px]">
      #{children}
      <img
        src={iconX}
        alt="태그 삭제"
        className="w-[24px] h-[24px] hover:cursor-pointer"
        onClick={onDelete}
      />
    </div>
  );
});

export default TagItem;
