import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";
import { hasToken, logout, getUserInfo } from "@/services/authService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 헤더 컴포넌트
 */
const Header = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const queryClient = useQueryClient();

  // 사용자 정보 조회
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: isClient && hasToken(),
    retry: false,
    onSuccess: (data) => {
      console.log("사용자 정보 조회 성공:", data);
    },
    onError: (error) => {
      // 토큰이 유효하지 않은 경우 로그아웃 처리
      console.error("사용자 정보 조회 실패:", error);
      logout();
      console.log("토큰 유효하지 않음으로 인한 로그아웃 처리");
    },
  });

  useEffect(() => {
    setIsClient(true);

    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      console.log("Header 마운트: 로그인 상태 확인");
      console.log("토큰 존재 여부:", hasToken());
    }
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

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    // 토큰이 있지만 유효하지 않은 경우(만료된 경우)를 대비해 로컬 스토리지의 토큰을 제거
    logout();

    // React Query 캐시 초기화
    queryClient.removeQueries({ queryKey: ["user"] });
    queryClient.clear();

    // 로그인 페이지로 이동
    router.push("/login");
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭됨");

    // 로그아웃 함수 호출
    logout();

    // React Query 캐시 초기화
    queryClient.removeQueries({ queryKey: ["user"] });
    queryClient.clear();

    console.log("React Query 캐시 정리됨");

    // 로그아웃 메시지 표시
    setShowLogoutMessage(true);

    // 3초 후 메시지 숨기기
    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);

    // 홈페이지로 이동
    router.push("/");
  };

  // 프로필 드롭다운 토글
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // 프로필 이미지 클릭 시 이벤트 핸들러
  const handleProfileClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    toggleProfileDropdown();
  };

  // 드롭다운 외부 클릭 시 닫기 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = () => {
      if (showProfileDropdown) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfileDropdown]);

  return (
    <HeaderContainer>
      <HeaderInner>
        {/* 로고와 네비게이션 메뉴 */}
        <LogoNavContainer>
          <LogoContainer>
            <Link href="/" passHref legacyBehavior>
              <LogoLink>
                <img src="/panda-logo.svg" alt="판다마켓 로고" />
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

        {/* 로그인 상태에 따라 프로필 또는 로그인 버튼 표시 */}
        {isClient && (
          <>
            {user ? (
              <ProfileContainer>
                <ProfileImage
                  src="/ic_profile.svg"
                  alt="프로필"
                  onClick={handleProfileClick}
                />
                {showProfileDropdown && (
                  <ProfileDropdown onClick={(e) => e.stopPropagation()}>
                    <DropdownContent>
                      <ProfileInfo>
                        <ProfileImageSmall src="/ic_profile.svg" alt="프로필" />
                        <UserName>{user.nickname}</UserName>
                      </ProfileInfo>
                      <DropdownDivider />
                      <DropdownItem onClick={handleLogout}>
                        로그아웃
                      </DropdownItem>
                    </DropdownContent>
                  </ProfileDropdown>
                )}
              </ProfileContainer>
            ) : (
              <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
            )}
          </>
        )}
      </HeaderInner>

      {/* 로그아웃 메시지 */}
      {showLogoutMessage && <LogoutMessage>로그아웃 되었습니다.</LogoutMessage>}
    </HeaderContainer>
  );
};

// 헤더 컨테이너 스타일
const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

// 헤더 내부 레이아웃을 위한 새로운 컴포넌트
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1600px) {
    max-width: 1600px;
  }

  @media (max-width: 744px) {
    padding: 0 16px;
  }
`;

// 로고와 네비게이션 컨테이너
const LogoNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 39px;
`;

// 로고 컨테이너
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

  img {
    width: 153px;
    height: auto;
  }

  @media (max-width: 744px) {
    img {
      width: 120px;
    }
  }
`;

// 로고 텍스트 숨김 처리
const LogoText = styled.span`
  display: none; // 텍스트 대신 로고 이미지를 사용하므로 텍스트는 숨김
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

// 사용자 프로필 스타일
const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// 작은 프로필 이미지 스타일 (드롭다운 내부용)
const ProfileImageSmall = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

// 프로필 드롭다운 메뉴 스타일
const ProfileDropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  width: 200px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 드롭다운 내용 컨테이너
const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
`;

// 프로필 정보 영역
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
`;

// 드롭다운 항목 스타일
const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 12px 16px;
  color: #4b5563;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #3692ff;
  }
`;

// 드롭다운 구분선
const DropdownDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
`;

// 사용자 이름 스타일
const UserName = styled.span`
  font-weight: 600;
  color: #4b5563;
`;

// 로그아웃 메시지 스타일
const LogoutMessage = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(54, 146, 255, 0.9);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

export default Header;
