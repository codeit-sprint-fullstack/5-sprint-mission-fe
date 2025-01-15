import React from "react";
import styled from "styled-components";

const AddProductButton = styled.button`
  background-color: #3692ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 133px;
  height: 42px;
  font-size: 16px;
  line-height: 26px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddProduct = () => {
  return (
    <div style={{ textAlign: "right", margin: "1rem 0" }}>
      <AddProductButton>상품 등록하기</AddProductButton>
    </div>
  );
};

export default AddProduct;
