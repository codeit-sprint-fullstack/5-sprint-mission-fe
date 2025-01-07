import styled from "styled-components";
import imgSearch from "../../assets/img/search/ic_search copy.png";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

export default function Search({ children, setKeyword }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setKeyword(debouncedValue);
  }, [debouncedValue, setKeyword]);

  const handleChange = (e) => {
    setInputValue(e.target.value); // 입력값을 즉각 업데이트
  };

  return (
    <InputContainer>
      <Img src={imgSearch} alt="검색" />
      <Input placeholder={children} onChange={handleChange} />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  background-color: #f3f4f6;

  border: none;
  border-radius: 12px;
  padding: 9px 16px;

  display: flex;
  align-items: center;
  gap: 4px;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
`;

const Input = styled.input`
  all: unset; /* 모든 기본 스타일 제거 */
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 26px;
`;
