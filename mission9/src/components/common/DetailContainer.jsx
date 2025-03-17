import React from "react";
import styled from "@emotion/styled";

/* 기능: 상세 페이지 컨테이너 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 * @param {('article'|'product')} props.type - 컨텐츠 타입
 */
const DetailContainer = ({ children, type = "article" }) => (
  <Container>
    <ContentContainer>{children}</ContentContainer>
  </Container>
);

/* 스타일: 레이아웃 컴포넌트 */
const Container = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 2rem;
`;

const ContentContainer = styled.article`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export default DetailContainer;
