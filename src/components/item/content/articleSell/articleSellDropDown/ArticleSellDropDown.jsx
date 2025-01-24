import { useState } from "react";
import "./articleSellDropDown.css";
export const ArticleSellDropDown = ({ selectedOption, setSelectedOption }) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div
      id="articleSellDropDown"
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <select
        value={selectedOption}
        onChange={handleChange}
        id="orderProductSelect"
        style={{
          backgroundImage: "url(/img/ic_arrow_down.png)",
        }}
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>

      <select
        onChange={handleChange}
        id="orderProductSelectMobile"
        style={{
          backgroundImage: "url(/img/ic_sort.png)",
        }}
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
};
