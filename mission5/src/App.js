import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductManager from "./components/ProductManager";

const AppContainer = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <ProductManager />
        <Footer />
      </AppContainer>
    </>
  );
};

export default App;
