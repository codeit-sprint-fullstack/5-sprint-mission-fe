import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

/* 기능: 상세 페이지 네비게이션 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.href - 이동할 페이지 경로
 * @param {string} props.text - 버튼 텍스트
 * @param {('article'|'product')} props.type - 컨텐츠 타입
 */
const DetailNavigationButton = ({
  href = "/",
  text = "목록으로 돌아가기",
  type = "article",
}) => (
  <ButtonWrapper>
    <Link href={href} passHref legacyBehavior>
      <NavigationButton>← {text}</NavigationButton>
    </Link>
  </ButtonWrapper>
);

/* 스타일: 버튼 컴포넌트 */
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
  border-radius: 0.375rem;
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
