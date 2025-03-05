import React from "react";
import styled from "@emotion/styled";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

export default function Home() {
  return <HomeContainer>빈 페이지</HomeContainer>;
}
