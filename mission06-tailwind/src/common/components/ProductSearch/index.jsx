import { useEffect, useState } from "react";
import searchIcon from "../../../assets/search/ic_search.png";
import useDebounce from "../../hooks/useDebounce";
import "../../../css/all-unset.css";

export default function ProductSearch({ onUpdate }) {
  const [inputValue, setInputValue] = useState(null);
  const debouncedKeyword = useDebounce(inputValue, 600);

  useEffect(() => {
    onUpdate((prevQuery) => ({
      ...prevQuery,
      keyword: debouncedKeyword,
    }));
  }, [debouncedKeyword, onUpdate]);

  const handleChange = (e) => {
    setInputValue(e.target.value); // 상태를 업데이트
  };

  return (
    <section className="bg-gray-100 rounded-[12px] py-[9px] px-[16px] flex items-center gap-[4px]">
      <img src={searchIcon} alt="검색" className="w-[24px] h-[24px]" />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleChange}
        className="all-unset w-full max-w-[325px] text-base font-normal leading-[26px] bg-transparent border-none focus:ring-0"
      />
    </section>
  );
}
