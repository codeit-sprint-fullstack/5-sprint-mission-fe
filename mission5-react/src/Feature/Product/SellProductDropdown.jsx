import React, { useState, useEffect } from "react";
import "./Product.css";
import IconDown from "../../Assets/Ic_down.png";

export function ProductDropdown({ orderBy, onOrderChange }) {
  const [selectedOption, setSelectedOption] = useState(orderBy); // orderBy를 props로 받아 초기값으로 설정

  const handleDropdown = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue); // 드롭다운 값 변경
    onOrderChange(newValue); // 부모 컴포넌트(SellProduct)에 전달
  };

  useEffect(() => {
    setSelectedOption(orderBy); // orderBy 값이 변경될 때마다 selectedOption을 업데이트
  }, [orderBy]); // orderBy 값이 변경될 때마다 실행

  return (
    <div className="dropdownSellProduct">
      <select
        value={selectedOption}
        onChange={handleDropdown}
        className="dropdownSelect"
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
}
