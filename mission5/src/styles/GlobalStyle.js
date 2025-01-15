import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Pretendard 폰트 설정 */
  body {
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: border-box; /* 모든 요소에 border-box 적용 */
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Pretendard', sans-serif;
    margin: 0;
  }

  p, a, button, input {
    font-family: 'Pretendard', sans-serif;
  }
`;

export default GlobalStyle;
