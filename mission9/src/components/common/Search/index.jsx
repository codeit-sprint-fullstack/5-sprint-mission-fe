import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

/**
 * 검색 입력 컴포넌트
 * 검색어 입력, 제출, 초기화 기능을 제공
 *
 * @param {Function} onSearch - 검색어 제출 시 호출될 콜백 함수
 * @param {string} initialValue - 초기 검색어 값
 * @param {string} placeholder - 입력 필드에 표시될 안내 텍스트
 */
const Search = ({
  onSearch,
  initialValue = "",
  placeholder = "검색어를 입력하세요",
}) => {
  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // props의 initialValue가 변경되면 검색어 상태 업데이트
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  /**
   * 검색어 입력 값 변경 핸들러
   */
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * 검색 폼 제출 핸들러
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 검색어가 변경된 경우에만 검색 실행
    if (searchTerm !== initialValue) {
      onSearch(searchTerm);
    }
  };

  /**
   * 엔터 키 입력 처리 핸들러
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(e);
    }
  };

  /**
   * 검색어 초기화 핸들러
   */
  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      {/* 검색 아이콘 */}
      <SearchIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </SearchIcon>

      {/* 검색어 입력 필드 */}
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />

      {/* 검색어 지우기 버튼 (검색어가 있을 때만 표시) */}
      <SearchButton
        type="button"
        onClick={handleClear}
        visible={searchTerm.length > 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </SearchButton>
    </SearchContainer>
  );
};

/* -------------- 스타일 컴포넌트 -------------- */

// 검색 컨테이너 - 전체 검색 UI를 감싸는 컨테이너
const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 100%;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

// 검색 입력 필드 - 사용자 입력을 받는 인풋 요소
const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 0.875rem;
  width: 100%;
  height: 42px;
  outline: none;
  transition: border-color 0.2s;
  background-color: #f3f4f6;

  &:focus {
    border-color: #3692ff;
    background-color: white;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

// 검색 아이콘 - 입력 필드 왼쪽에 위치하는 아이콘
const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 검색어 지우기 버튼 - 입력 필드 오른쪽에 위치하는 X 버튼
const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export default Search;
