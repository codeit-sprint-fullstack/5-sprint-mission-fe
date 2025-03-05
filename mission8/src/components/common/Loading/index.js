import React from "react";
import styled from "@emotion/styled";

const LoadingContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingSkeleton = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  margin-bottom: 1rem;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      {[1, 2, 3].map((i) => (
        <LoadingSkeleton key={i} />
      ))}
    </LoadingContainer>
  );
};

export default Loading;
