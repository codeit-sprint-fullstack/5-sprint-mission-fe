import React from "react";
import searchImg from "../assets/images/ic_search.png";
import styled from "styled-components";
import { colors } from "../assets/theme";

//검색 기능 추가해야함
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <SearchBarContainer>
      <SearchForm>
        <SearchIcon src={searchImg} alt="Search Icon" />
        <SearchInputForm
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="검색할 상품을 입력해주세요"
        />
      </SearchForm>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
  }
`;

const SearchForm = styled.form`
  position: relative;
  width: 100%;
  /* Desktop */
  @media (min-width: 1024px) {
    width: 325px;
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 270px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    width: 288px;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 0.75rem;
  top: 0.5rem;
  width: 24px;
  height: 24px;
`;
const SearchInputForm = styled.input`
  width: 100%; // 기본적으로 100% 너비
  padding: 12px;

  padding-left: 2.5rem; // 아이콘 공간 확보 (아이콘 크기에 맞춰)
  box-sizing: border-box;
  font-size: 16px;
  background-color: ${colors.gray2};
  border: none;
  border-radius: 10px;

  &::placeholder {
    color: ${colors.gray5};
  }
`;
