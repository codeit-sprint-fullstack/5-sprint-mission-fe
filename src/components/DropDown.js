import { useState } from "react";
import Image from "next/image";
import iconDropDown from "@/assets/images/ic-kebab.svg";

function DropDown({ onEditClick, onDeleteClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <Image src={iconDropDown} alt="dropDown" width={24} height={24} />
      </button>
      {isOpen && (
        <div className="absolute top-[25px] right-0 z-50 w-[130px] h-[42px] rounded-[12px]">
          <button
            className="flex justify-center items-center gap-[24px] w-[130px] h-[42px] rounded-t-[12px] bg-white border border-gray-200"
            onClick={() => {
              onEditClick();
              setIsOpen(false);
            }}
          >
            수정하기
          </button>
          <button
            className="flex justify-center items-center gap-[24px] w-[130px] h-[42px] rounded-b-[12px] border-b border-r border-l border-gray-200 bg-white"
            onClick={() => {
              onDeleteClick();
              setIsOpen(false);
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDown;
