import { useState } from "react";
import styled from "styled-components";
import dropDownBtn from "../assets/images/ic_arrow_down.png";
import React from "react";

const Select = styled.select`
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 42px;
  padding: 0.5rem 2.25rem 0.5rem 1rem;
  font-size: 1rem;
  background-image: url(${dropDownBtn});
  background-position: right 10px center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

type SortOrder = "recent" | "favorite";

interface SortDropDownProps {
  setSortOrder: (order: SortOrder) => void;
}
const SortDropDown: React.FC<SortDropDownProps> = ({ setSortOrder }) => {
  const [order, setOrder] = useState("recent");

  const handleSelectChange = (e) => {
    const selectedOrder = e.target.value === "최신순" ? "recent" : "favorite";
    setOrder(e.target.value);
    setSortOrder(selectedOrder);
  };

  return (
    <Select onChange={handleSelectChange} value={order}>
      <option value="최신순">최신순</option>
      <option value="좋아요순">좋아요순</option>
    </Select>
  );
};

export default SortDropDown;
