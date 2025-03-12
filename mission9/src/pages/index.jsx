import React from "react";
import styled from "@emotion/styled";
import HeroBanner from "@/components/home/HeroBanner";
import FeatureList from "@/components/home/FeatureList";
import TestimonialSection from "@/components/home/TestimonialSection";

/**
 * 메인 페이지 컴포넌트
 */
const HomePage = () => {
  return (
    <PageContainer>
      <HeroBanner />
      <FeatureList />
      <TestimonialSection />
    </PageContainer>
  );
};

// 페이지 컨테이너 스타일
const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export default HomePage;
