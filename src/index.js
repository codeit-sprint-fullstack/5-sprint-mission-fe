import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
box-sizing: border-box;
   font-family: 'Pretendard', sans-serif;
    margin: 0;
    padding: 0;
}

  @media (max-width: 1024px) {
    body {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 12px;
    }
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
