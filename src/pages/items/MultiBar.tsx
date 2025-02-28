import styled from "styled-components";
import Button from "../../components/Button";
import React from "react";
import SearchBar from "../../components/Searchbar";
import Filter from "../../components/Filter";

interface MultiBarProps {
  isMobile: boolean;
  searchTerm: string; //검색어 값을 관리
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; //검색어 변경 이벤트 핸들러
  setDropDownVisible: (visible: boolean) => void; //필터 드롭다운의 가시성을 제어
  dropDownVisible: boolean;
}

const MultiBar: React.FC<MultiBarProps> = ({
  isMobile,
  searchTerm,
  onSearchChange,
  setDropDownVisible,
  dropDownVisible,
}) => {
  return isMobile ? (
    <>
      <BarContainer>
        <TitleWrapper>
          <Title>판매중인 상품</Title>
          <RegisterButton as="a" href="/registration">
            상품 등록하기
          </RegisterButton>
        </TitleWrapper>

        <SearchBarWrapper>
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <Filter
            isMobile={isMobile}
            dropDownVisible={dropDownVisible}
            setDropDownVisible={setDropDownVisible}
          />
        </SearchBarWrapper>
      </BarContainer>
    </>
  ) : (
    <>
      <BarContainer>
        <TitleWrapper>
          <Title>판매중인 상품</Title>
        </TitleWrapper>

        <SearchBarWrapper>
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <RegisterButton as="a" href="registration">
            상품 등록하기
          </RegisterButton>
          <FilterWrapper>
            <Filter
              isMobile={isMobile}
              dropDownVisible={dropDownVisible}
              setDropDownVisible={setDropDownVisible}
            />
          </FilterWrapper>
        </SearchBarWrapper>
      </BarContainer>
    </>
  );
};
export default MultiBar;

const BarContainer = styled.div`
  display: flex;
  padding: 26px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  /* Tablet/Desktop */
  @media (min-width: 768px) {
    margin-top: 17px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* Tablet/Desktop */
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    gap: 10px;
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 12px;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;
const RegisterButton = styled(Button)`

  padding: 12px 23px;
  text-decoration: none;
  /* Mobile */
  @media (max-width: 767px) {
    margin-right: 46px;
  
  }
  
  }
`;
