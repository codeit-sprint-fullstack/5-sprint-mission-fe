import React from "react";
import styled from "@emotion/styled";

/**
 * 메인 페이지 신뢰성 강조 섹션 컴포넌트
 */
const TestimonialSection = () => {
  return (
    <SectionWrapper>
      <CardContainer>
        <TextContainer>
          <Title>
            믿을 수 있는 <br />
            판다마켓 중고 거래
          </Title>
        </TextContainer>
        <Image
          src="https://i.imgur.com/FWurokO.png"
          alt="Trustworthy Trading"
        />
      </CardContainer>
    </SectionWrapper>
  );
};

// 배경색을 가진 전체 너비 래퍼
const SectionWrapper = styled.div`
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
const CardContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 540px;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 1199px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 0 20px;
  }
`;

const Image = styled.img`
  max-width: 746px;
  margin-left: 69px;
  object-fit: contain;

  @media (max-width: 1199px) {
    width: 100%;
    margin-left: 0px;
    margin-top: 217px;
  }

  @media (max-width: 743px) {
    margin-top: 131px;
  }
`;

const TextContainer = styled.div`
  text-align: left;

  @media (max-width: 743px) {
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 172.5px;
  margin-top: 0;

  @media (max-width: 1199px) {
    margin-top: 100px;
    margin-bottom: 0px;
  }
`;

export default TestimonialSection;
