import React from "react";
import styled from "@emotion/styled";

/**
 * 게시글 카드 스켈레톤 UI 컴포넌트
 * 데이터 로딩 중에 표시되는 로딩 상태의 시각적 표현
 *
 * @param {Object} props 컴포넌트 속성
 * @param {boolean} props.isBest 베스트 게시글 여부
 * @returns {JSX.Element} 스켈레톤 UI 컴포넌트
 */
const ArticleSkeletonCard = ({ isBest }) => {
  return (
    <SkeletonCard isBest={isBest}>
      <SkeletonHeader>
        <SkeletonTitle />
        <SkeletonAuthor />
      </SkeletonHeader>
      <SkeletonImage />
      <SkeletonFooter>
        <SkeletonText />
      </SkeletonFooter>
    </SkeletonCard>
  );
};

// 스켈레톤 카드 컨테이너
const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  padding: 1rem;
  gap: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: ${(props) =>
    props.isBest ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"};
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

// 스켈레톤 헤더 영역
const SkeletonHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// 스켈레톤 제목
const SkeletonTitle = styled.div`
  height: 1.5rem;
  width: 80%;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

// 스켈레톤 작성자 정보
const SkeletonAuthor = styled.div`
  height: 1rem;
  width: 50%;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

// 스켈레톤 이미지
const SkeletonImage = styled.div`
  height: 180px;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 8px;
`;

// 스켈레톤 푸터 영역
const SkeletonFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 스켈레톤 텍스트
const SkeletonText = styled.div`
  height: 1rem;
  width: 30%;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

export default ArticleSkeletonCard;
