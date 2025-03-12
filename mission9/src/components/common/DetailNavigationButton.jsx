import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

/**
 * 상세 페이지 네비게이션 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.href - 링크 주소
 * @param {string} props.text - 버튼 텍스트
 * @param {string} props.type - 타입 (article 또는 product)
 */
const DetailNavigationButton = ({
  href = "/",
  text = "목록으로 돌아가기",
  type = "article",
}) => {
  return (
    <ButtonWrapper>
      <Link href={href} passHref legacyBehavior>
        <NavigationButton>← {text}</NavigationButton>
      </Link>
    </ButtonWrapper>
  );
};

// 스타일 컴포넌트
const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const NavigationButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export default DetailNavigationButton;
