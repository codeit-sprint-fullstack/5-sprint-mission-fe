import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

/**
 * 검색 박스 컴포넌트
 * @param {function} onClose - 검색 박스를 닫는 함수
 */
const SearchBox = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push({
        pathname: "/article",
        query: { search: searchTerm },
      });
      onClose();
    }
  };

  return (
    <SearchBoxContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <SearchButton type="submit">검색</SearchButton>
        <CloseButton type="button" onClick={onClose}>
          닫기
        </CloseButton>
      </SearchForm>
    </SearchBoxContainer>
  );
};

const SearchBoxContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const SearchForm = styled.form`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #3692ff;
    box-shadow: 0 0 0 3px rgba(54, 146, 255, 0.1);
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #2563eb;
  }
`;

const CloseButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export default SearchBox;
