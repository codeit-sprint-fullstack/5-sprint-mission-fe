import React from "react";
import styled from "@emotion/styled";

/**
 * 상세 페이지 컨테이너 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {ReactNode} props.children - 자식 컴포넌트
 * @param {string} props.type - 타입 (article 또는 product)
 */
const DetailContainer = ({ children, type = "article" }) => {
  return (
    <Container>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ContentContainer = styled.article`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export default DetailContainer;
