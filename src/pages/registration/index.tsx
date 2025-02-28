import React from "react";
import { styled } from "styled-components";
import { colors } from "../../assets/theme";
import PostForm from "./PostForm";

//입력값 유효성 검증 및 에러메시지 처리 추가 필요

const RegistrationPage: React.FC = () => {
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault(); //폼 기본 제출 동작 방지
    // PostForm의 form태그 제출 강제
    (document.getElementById("post-form") as HTMLFormElement)?.requestSubmit(); //requestSubmit() ->특정 폼을 Javascript로 제출할 때 사용하는 메서드
  };
  return (
    <PageContainer>
      <TitleSection>
        <Title>상품 등록하기</Title>
        <Button onClick={handleSubmit}>등록</Button>
        {/* <Button onSubmit={submit}>등록</Button> */}
      </TitleSection>
      <PostForm />
    </PageContainer>
  );
};
export default RegistrationPage;
const PageContainer = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 696px;
  }

  @media (max-width: 696px) {
    max-width: 344px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.gray8};
  margin-bottom: 20px;
`;
const Section = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.p`
  white-space: nowrap;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  height: 42px;
  padding: 8px 23px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${colors.gray5};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #3078d1;
  }
`;

const TagWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 5px 12px;
  background-color: #f1f1f1;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  gap: 8px;
`;
