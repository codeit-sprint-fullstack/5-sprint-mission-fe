import React from "react";
import styled from "styled-components";
import HamburgerIcon from "../assets/images/ic_sort.png";
import SortDropDown from "./SortDropDown";

interface FilterProps {
  isMobile: boolean;
  dropDownVisible: boolean;
  setDropDownVisible: (visible: boolean) => void;
}
const Filter: React.FC<FilterProps> = ({
  isMobile,
  dropDownVisible,
  setDropDownVisible,
}) => {
  const toggleMenu = () => {
    setDropDownVisible(!dropDownVisible); //by flipping the value of dropDownVisible.
  };

  return (
    <FilterContainer>
      {isMobile && (
        <>
          <HamburgerButton onClick={toggleMenu}>
            <img src={HamburgerIcon} alt="햄버거 메뉴" />
          </HamburgerButton>
        </>
      )}
      {(!isMobile || dropDownVisible) && (
        <DropDownMenu>
          <SortDropDown setSortOrder={(order: string) => console.log(order)} />
        </DropDownMenu>
      )}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  position: relative;
`;

const HamburgerButton = styled.button`
  display: block;
  width: 42px;
  height: 42px;
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const DropDownMenu = styled.div`


  @media (max-width: 767px) {
  top: 100%;
    position: absolute;}
    right: 0;
}
`;

export default Filter;
