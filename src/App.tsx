import React from "react";
import Header from "./common/Header";
import LandingHeader from "./common/LandingHeader";
import Footer from "./common/Footer";
import { useIsMobile } from "./components/hooks/useSizes";
import { styled } from "styled-components";

type AppProps = {
  children?: React.ReactNode;
};
const App: React.FC<AppProps> = ({ children }) => {
  const isLandingPage = window.location.pathname === "/";
  const isMobile = useIsMobile();
  return (
    <AppContainer>
      {isLandingPage ? <LandingHeader /> : <Header />}
      <MainContent className="body">{children}</MainContent>
      <Footer $isMobile={isMobile} />
    </AppContainer>
  );
};

export default App;
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 */
  overflow-x: hidden; /* 가로 스크롤 방지 */
`;

// 본문 스타일
const MainContent = styled.div`
  flex: 1; /* 본문 영역을 푸터 위로 확장 */
  display: flex;
  flex-direction: column;
`;
