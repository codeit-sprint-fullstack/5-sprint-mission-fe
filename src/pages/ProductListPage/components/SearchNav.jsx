import { useWindowWidth } from "../../../shared/hooks/useWindowWidth.js";
import { useNavigate } from "react-router-dom";


export default function SearchNav({ value, onChange }) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  const moveOnRegistration = () => {
    navigate("/registration");
  }
  return (
    <>
      {windowWidth === "mobile" && (
        <div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-[20px]">판매 중인 상품</p>
            <button onClick={moveOnRegistration} className="px-[23px] py-[8px] bg-[#3692FF] rounded-lg text-white font-bold">
              상품 등록하기
            </button>
          </div>
          <div className="flex justify-end items-center mt-[10px] gap-[14px]">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="py-[9px] pl-[16px] w-full bg-[#F3F4F6] rounded-lg xl:pr-[107px]"
              value={value}
              onChange={onChange}
            />
            <select
              className="px-[20px] py-[12px] bg-[#F3F4F6] rounded-lg"
            >
              <option value="recent">최신순</option>
              <option value="favorite">인기순</option>
            </select>
          </div>
        </div>
      )}
      {(windowWidth === "tablet" || windowWidth === "desktop") && (
        <div className="flex justify-between items-center">
          <p className="font-bold text-[20px]">판매 중인 상품</p>
          <div className="flex justify-between h-[42px] gap-[12px]">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="py-[8px] pl-[16px] pr-[70px] bg-[#F3F4F6] rounded-lg xl:pr-[107px]"
              value={value}
              onChange={onChange}
            />
            <button onClick={moveOnRegistration} className="px-[23px] py-[8px] bg-[#3692FF] rounded-lg text-white font-bold">
              상품 등록하기
            </button>
            <select
              className="px-[20px] py-[12px] bg-[#F3F4F6] rounded-lg"
            >
              <option value="recent">최신순</option>
              <option value="favorite">인기순</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}