/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";

export default function Skeleton({ width, height }) {
  return <SkeletonDiv width={width} height={height}></SkeletonDiv>;
}

// 애니메이션 정의
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// SkeletonDiv 컴포넌트
const SkeletonDiv = styled.div`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100px"};
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border: none;
  border-radius: 12px;
`;
