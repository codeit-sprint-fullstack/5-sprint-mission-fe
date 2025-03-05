import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import Footer from "./Footer";

const Main = styled.main`
  min-height: 100vh;
  padding: 2rem;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
