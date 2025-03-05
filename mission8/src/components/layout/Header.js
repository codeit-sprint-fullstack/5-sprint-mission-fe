import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";

/**
 * 헤더 컴포넌트
 */
const Header = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 자유게시판 링크 클릭 시 처리를 위한 핸들러
  const handleArticleClick = (e) => {
    e.preventDefault(); // 기본 이벤트 방지

    // 페이지 이동
    router.push("/article", undefined, { shallow: false, scroll: false });
  };

  const toggleSearchBox = () => {
    setSearchBoxVisible(!searchBoxVisible);
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        {/* 로고와 네비게이션 메뉴 */}
        <LogoNavContainer>
          <LogoContainer>
            <Link href="/" passHref legacyBehavior>
              <LogoLink>
                <img src="/panda_face.svg" alt="판다마켓 로고" />
                <LogoText>판다마켓</LogoText>
              </LogoLink>
            </Link>
          </LogoContainer>

          {/* 네비게이션 메뉴 */}
          <Nav>
            <StyledLink
              onClick={handleArticleClick}
              href="/article"
              isActive={router.pathname.startsWith("/article")}
            >
              자유게시판
            </StyledLink>
            <Link href="/items" passHref legacyBehavior>
              <StyledLink isActive={router.pathname === "/items"}>
                중고마켓
              </StyledLink>
            </Link>
          </Nav>
        </LogoNavContainer>

        {/* 로그인 버튼 */}
        <LoginButton>로그인</LoginButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

// 헤더 컨테이너 스타일
const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

// 헤더 내부 레이아웃을 위한 새로운 컴포넌트
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 1200px) {
    padding: 1rem 4rem;
  }
`;

// 로고와 네비게이션 컨테이너
const LogoNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 39px;

  @media (max-width: 743px) {
    gap: 8px;
  }
`;

// 로고 컨테이너 스타일
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

// 로고 링크 스타일
const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

// 로고 텍스트 스타일
const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3692ff;
`;

// 네비게이션 메뉴 스타일
const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 743px) {
    gap: 1rem;
  }
`;

// 네비게이션 링크 스타일
const StyledLink = styled.a`
  text-decoration: none;
  color: ${(props) => (props.isActive ? "#3692ff" : "#4b5563")};
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 26px;
  cursor: pointer;

  &:hover {
    color: #3692ff;
  }
`;

// 로그인 버튼 스타일
const LoginButton = styled.button`
  background-color: #3692ff;
  color: #f3f4f6;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 743px) {
    width: auto;
  }
`;

export default Header;
