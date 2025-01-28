import dropdownArrowIcon from "../../../assets/icon/ic_dropdown_arrow.png";

function DropdownList({
  currentOrder = "recent",
  isActive = true,
  onClick,
  onClickOrderButton,
}) {
  const orderKor = {
    recent: "최신순",
    favorite: "좋아요순",
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-[130px] h-[42px] px-[20px] py-[12px] rounded-[12px] border-[1px] border-secondary-200 bg-white"
      >
        <span className="text-[16px] font-[400] text-secondary-800">
          {orderKor[currentOrder]}
        </span>
        <img
          src={dropdownArrowIcon}
          alt="▼"
          className="w-[15.7px] h-[7.42px]"
        />
      </button>
      {isActive && (
        <figure className="flex flex-col absolute mt-[8px]">
          <button
            onClick={() => onClickOrderButton("recent")}
            className="flex justify-center items-center w-[130px] h-[42px] px-[20px] py-[12px] rounded-tl-[12px] rounded-tr-[12px] border-[1px] border-secondary-200 text-[16px] font-[400] text-secondary-800 bg-white text-center"
          >
            최신순
          </button>
          <button
            onClick={() => onClickOrderButton("favorite")}
            className="flex justify-center items-center w-[130px] h-[42px] px-[20px] py-[12px] rounded-bl-[12px] rounded-br-[12px] border-[1px] border-t-0 border-secondary-200 text-[16px] font-[400] text-secondary-800 bg-white"
          >
            좋아요순
          </button>
        </figure>
      )}
    </div>
  );
}

export default DropdownList;
