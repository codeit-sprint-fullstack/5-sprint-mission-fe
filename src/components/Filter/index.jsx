import { useState } from "react";
import HamburgerIcon from "../../assets/img/ic_sort.png";
import SetOrder from "../feature/SetOrder";

export default function Filter() {
  const [dropDownVisible, setDropDownVisible] = useState(false); //햄버거버튼
  const [order, setOrder] = useState("recent");
  // 햄버거 메뉴 토글
  const toggleMenu = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const [orderBy, setOrderBy] = useState("recent"); // 상태 변경
  return (
    <>
      <div
        className={`${
          dropDownVisible ? "absolute" : "hidden"
        } col-span-1 sm:order-4 sm:block sm:relative md:justify-self-end sm:justify-self-end`}
      >
        <SetOrder
          setSortOrder={setOrderBy}
          dropDownVisible={dropDownVisible}
          setDropDownVisible={setDropDownVisible}
          className="w-[130px] mr-3"
        />
      </div>
      <button
        onClick={toggleMenu}
        className="col-span-1 order-4 border border-gray-300 w-[42px] h-[42px] p-2 rounded-xl ml-auto sm:hidden justify-self-end"
      >
        <img src={HamburgerIcon} alt="드롭다운햄버거" className="w-6 h-6" />
      </button>
    </>
  );
}
