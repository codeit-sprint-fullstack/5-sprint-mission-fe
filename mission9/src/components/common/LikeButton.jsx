import React from "react";
import styled from "@emotion/styled";

/* 기능: 좋아요 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {number} props.likeCount - 좋아요 수
 * @param {boolean} props.isLiked - 현재 사용자의 좋아요 상태
 * @param {function} props.onClick - 좋아요 버튼 클릭 핸들러
 * @param {boolean} props.isLoading - 로딩 상태
 */
const LikeButton = ({
  likeCount = 0,
  isLiked = false,
  onClick,
  isLoading = false,
}) => (
  <LikeSection>
    <StyledLikeButton
      onClick={onClick}
      isLiked={isLiked}
      disabled={isLoading}
      title={isLiked ? "좋아요 취소하기" : "좋아요 추가하기"}
    >
      <LikeIcon src={isLiked ? "/like_pink.svg" : "/like.svg"} alt="좋아요" />
      <LikeCount>{likeCount}</LikeCount>
    </StyledLikeButton>
  </LikeSection>
);

/* 스타일: 좋아요 버튼 레이아웃 */
const LikeSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

/* 스타일: 좋아요 버튼 */
const StyledLikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ isLiked }) => (isLiked ? "#FFF5F9" : "none")};
  border: 1px solid ${({ isLiked }) => (isLiked ? "#FF68CC" : "#e5e7eb")};
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  color: ${({ isLiked }) => (isLiked ? "#FF68CC" : "#6B7280")};
  font-weight: ${({ isLiked }) => (isLiked ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ isLiked }) => (isLiked ? "#FFF0F8" : "#f3f4f6")};
    border-color: ${({ isLiked }) => (isLiked ? "#FF68CC" : "#d1d5db")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      background-color: ${({ isLiked }) =>
        isLiked ? "#FFF5F9" : "transparent"};
    }
  }
`;

/* 스타일: 좋아요 아이콘 */
const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
`;

/* 스타일: 좋아요 카운트 */
const LikeCount = styled.span`
  font-size: 1rem;
  min-width: 1rem;
  text-align: left;
`;

export default LikeButton;
