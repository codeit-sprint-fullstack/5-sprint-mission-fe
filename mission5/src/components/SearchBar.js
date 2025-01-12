import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: auto;
  width: 325px;
  height: 42px;
  display: flex;

  @media (max-width: 1199px) and (min-width: 744px) {
    width: 242px;
  }

  @media (max-width: 743px) {
    max-width: 288px;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem; /* Adjust padding for the icon */
  margin-bottom: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #f3f4f6;
  &:focus {
    outline: none;
    border-color: #3692ff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchIcon src="https://i.imgur.com/OFHdvJP.png" alt="search icon" />
        <SearchInput
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={query}
          onChange={handleSearch}
        />
      </SearchWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
