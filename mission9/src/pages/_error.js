import React from "react";
import styled from "@emotion/styled";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorTitle = styled.h1`
  color: #ef4444;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  max-width: 800px;
`;

const BackButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

function Error({ statusCode }) {
  return (
    <ErrorContainer>
      <ErrorTitle>
        {statusCode
          ? `${statusCode} - 서버 오류가 발생했습니다`
          : "클라이언트 오류가 발생했습니다"}
      </ErrorTitle>
      <ErrorMessage>
        죄송합니다. 요청을 처리하는 중에 문제가 발생했습니다.
      </ErrorMessage>
      <BackButton onClick={() => (window.location.href = "/")}>
        홈으로 돌아가기
      </BackButton>
    </ErrorContainer>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
