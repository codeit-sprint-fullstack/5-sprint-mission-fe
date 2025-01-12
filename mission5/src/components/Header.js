import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 12.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;

  @media (max-width: 1199px) and (min-width: 744px) {
    padding: 1rem 4rem;
  }

  @media (max-width: 743px) {
    flex-direction: row;
    align-items: center;
    padding: 1rem 2rem;
    gap: 0.5rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  h1 {
    font-size: 1.5rem;
    color: #007bff;
    font-weight: bold;
    margin: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    text-decoration: none;
    color: #4b5563;
    font-weight: 700;
    font-size: clamp(1vw, 18px); /* 반응형 폰트 크기 적용 */
    line-height: 26px;
    &:hover {
      color: #007bff;
    }
  }

  @media (max-width: 743px) {
    gap: 1rem;
  }
`;

const LogoNavContainer = styled.div`
  gap: 24px;
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  background-color: #3692ff;
  color: #f3f4f6;
  border: none;
  padding: 12px 23px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 743px) {
    width: auto;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoNavContainer>
        <LogoContainer>
          <img src="https://i.imgur.com/iUEWHTG.png" alt="Logo" />
        </LogoContainer>

        <Nav>
          <a href="#freeboard">자유게시판</a>
          <a href="#market">중고마켓</a>
        </Nav>
      </LogoNavContainer>
      <LoginButton>로그인</LoginButton>
    </HeaderContainer>
  );
};

export default Header;
