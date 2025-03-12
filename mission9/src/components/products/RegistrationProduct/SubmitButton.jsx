import React from "react";
import styled from "@emotion/styled";

// 제출 버튼 컴포넌트: 활성화/비활성화 상태에 따라 스타일 변경
const SubmitButton = ({ type, text, disabled }) => {
  return (
    <Button type={type} disabled={disabled}>
      {text}
    </Button>
  );
};

const Button = styled.button`
  width: 74px;
  height: 42px;
  padding: 12px 23px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#3692ff")};
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #2a75cc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default SubmitButton;
