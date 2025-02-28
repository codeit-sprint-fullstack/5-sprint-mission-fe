import logoImg from "../assets/images/logo.png";
import styled from "styled-components";
import Button from "../components/Button";
import { colors } from "../assets/theme";
import React, { ReactNode } from "react";

export const LoginButton = ({ children }: { children: ReactNode }) => (
  <Button>{children}</Button>
);

export const LogoSection = () => (
  <a href="/">
    <Logo src={logoImg} alt="logo image" />
  </a>
);
export const NavSection = () => (
  <Nav>
    <NavLink href="/articles">
      <NavText>자유게시판</NavText>
    </NavLink>
    <NavLink href="/items">
      <NavText>중고마켓</NavText>
    </NavLink>
  </Nav>
);

function Header() {
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderLeft>
          <LogoSection />
          <NavSection />
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
  top: 8.5px;
  width: 100vw;

  overflow-x: hidden;
  border-bottom: 1px solid #dfdfdf;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  width: 80vw;
  margin: 0 auto;
  padding: 1rem;
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

const Logo = styled.img`
  width: 112px;
  height: 40px;
  margin-right: 24px;

  @media (min-width: 640px) {
    width: 128px;
    height: 48px;
    margin-right: 24px;
  }

  @media (min-width: 1024px) {
    width: 152px;
    height: 52px;
  }
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  color: gray6;
`;

const NavLink = styled.a`
  margin: 0 16px;
  text-decoration: none;
`;

const NavText = styled.h4`
  font-size: 1rem;
  white-space: nowrap;
  color: ${colors.gray6};
  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
`;
