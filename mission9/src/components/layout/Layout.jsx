import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Main = styled.main`
  min-height: calc(
    100vh - 70px - 100px
  ); /* 헤더(70px)와 푸터(100px)를 제외한 높이 */
  padding: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
`;

const Container = styled.div`
  max-width: ${(props) => (props.isFullWidth ? "100%" : "1920px")};
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => (props.isFullWidth ? "0" : "0 20px")};

  @media (max-width: 1600px) {
    max-width: ${(props) => (props.isFullWidth ? "100%" : "1600px")};
  }

  @media (max-width: 744px) {
    padding: ${(props) => (props.isFullWidth ? "0" : "0 16px")};
  }
`;

const Layout = ({ children }) => {
  const router = useRouter();

  // 로그인, 회원가입 페이지인 경우 별도의 레이아웃 적용
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";

  // 메인 페이지인 경우 전체 너비 사용
  const isFullWidth = router.pathname === "/";

  return (
    <>
      <Header />
      <Main>
        <Container isAuthPage={isAuthPage} isFullWidth={isFullWidth}>
          {children}
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
