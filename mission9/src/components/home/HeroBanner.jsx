import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

/**
 * 메인 페이지 히어로 배너 컴포넌트
 */
const HeroBanner = () => {
  const router = useRouter();

  return (
    <BannerWrapper>
      <BannerContainer>
        <TextContainer>
          <Title>
            일상의 모든 물건을 <br />
            거래해 보세요
          </Title>
          <Button onClick={() => router.push("/items")}>구경하러 가기</Button>
        </TextContainer>
        <Image src="https://i.imgur.com/XfCM0MF.png" alt="Hero Banner" />
      </BannerContainer>
    </BannerWrapper>
  );
};

// 배경색을 가진 전체 너비 래퍼
const BannerWrapper = styled.div`
  background-color: #cfe5ff;
  margin: 0;
  padding: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position: relative;
  box-sizing: border-box;
`;

// 내용을 담는 컨테이너
const BannerContainer = styled.div`
  height: 540px;
  display: flex;
  justify-content: center;
  align-items: end;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 1199px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    gap: 211px;
    padding: 0 20px;
  }

  @media (max-width: 743px) {
    gap: 132px;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 100px;
  margin-right: 7px;

  @media (max-width: 1199px) {
    margin: 0;
    text-align: center;
    margin-top: 84px;
  }

  @media (max-width: 743px) {
    margin-top: 48px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 56px;
  color: #374151;
  margin: 0 0 2rem 0;

  @media (max-width: 1199px) {
    font-size: 2rem;
    line-height: 48px;
  }

  @media (max-width: 743px) {
    font-size: 1.5rem;
    line-height: 36px;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  width: 357px;
  height: 56px;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 40px;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 743px) {
    width: 240px;
    height: 48px;
    font-size: 16px;
  }
`;

const Image = styled.img`
  @media (max-width: 1199px) {
    width: 80%;
  }

  @media (max-width: 743px) {
    width: 100%;
  }
`;

export default HeroBanner;
