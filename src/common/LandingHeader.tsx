import React from "react";
import { LogoSection } from "./Header";
import { LoginButton } from "./Header";
import styled from "styled-components";
function Header({ showNav = true }) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderLeft>
          <LogoSection />
        </HeaderLeft>
        <HeaderRight>
          <LoginButton>로그인</LoginButton>
        </HeaderRight>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  position: sticky;
  background-color: white;
  top: 0.5px;
  width: 100%;
  border-bottom: 1px solid #dfdfdf;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0 calc(5% + 200px); /* 5%의 동적 여백 + 고정 최소 패딩 */
  box-sizing: border-box;
  /* 반응형 설정 */
  @media (max-width: 1024px) {
    /* Tablet */
    padding: 0 200px; /* 양옆 여백을 줄임 */
  }

  @media (max-width: 760px) {
    /* Mobile */
    padding: 0 40px; /* 모바일에서는 최소 여백 */
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    justify-content: center; /* 모바일에서 중앙 정렬 */
  }
`;
