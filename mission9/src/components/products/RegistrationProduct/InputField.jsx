import React, { useState } from "react";
import styled from "@emotion/styled";

// 재사용 가능한 입력 필드 컴포넌트: 일반 입력창과 텍스트영역 지원
const InputField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  required,
  isTextarea,
  isError,
}) => {
  // 입력 필드의 터치 상태 관리
  const [isTouched, setIsTouched] = useState(false);

  // 포커스가 벗어날 때 터치 상태 업데이트
  const handleBlur = (e) => {
    setIsTouched(true);
    onBlur && onBlur(e);
  };

  // 텍스트영역 또는 입력창 렌더링
  return isTextarea ? (
    <StyledTextarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      required={required}
      isError={isError}
      isTouched={isTouched}
    />
  ) : (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      required={required}
      isError={isError}
      isTouched={isTouched}
    />
  );
};

const commonStyles = `
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f3f4f6;

  &:focus {
    outline: none;
    border: 1px solid #3692ff;
  }
`;

const StyledInput = styled.input`
  ${commonStyles}
  border: ${({ isTouched, isError }) =>
    isTouched ? (isError ? "1px solid #f74747" : "1px solid #ccc") : "none"};
`;

const StyledTextarea = styled.textarea`
  ${commonStyles}
  height: 282px;
  resize: none;
  border: ${({ isTouched, isError }) =>
    isTouched ? (isError ? "1px solid #f74747" : "1px solid #ccc") : "none"};
`;

export default InputField;
