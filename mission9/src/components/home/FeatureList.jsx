import React from "react";
import styled from "@emotion/styled";
import FeatureCard from "./FeatureCard";

/**
 * 메인 페이지 특징 목록 컴포넌트
 */
const FeatureList = () => {
  // 검색과 등록 기능 소개 데이터
  const features = [
    {
      image: "https://i.imgur.com/PsMZP3V.png",
      blueTitle: "Hot item",
      title: (
        <>
          인기 상품을 <br /> 확인해 보세요
        </>
      ),
      description: "가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요",
      reverse: false,
    },
    {
      image: "https://i.imgur.com/NwQ2ZYJ.png",
      blueTitle: "Search",
      title: (
        <>
          구매를 원하는 <br /> 상품을 검색하세요
        </>
      ),
      description: "구매하고 싶은 물품은 검색해서 쉽게 찾아보세요",
      reverse: true,
    },
    {
      image: "https://i.imgur.com/nXCtJwC.png",
      blueTitle: "Register",
      title: (
        <>
          판매를 원하는 <br /> 상품을 등록하세요
        </>
      ),
      description: "어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요",
      reverse: false,
    },
  ];

  return (
    <>
      <ListContainer>
        {/* 검색과 등록 기능 소개 카드 렌더링 */}
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            image={feature.image}
            blueTitle={feature.blueTitle}
            title={feature.title}
            description={feature.description}
            reverse={feature.reverse}
          />
        ))}
      </ListContainer>
    </>
  );
};

const ListContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 1199px) {
    padding: 24px;
  }

  @media (max-width: 743px) {
    flex-direction: column;
    padding: 2rem 2rem;
  }
`;

export default FeatureList;
