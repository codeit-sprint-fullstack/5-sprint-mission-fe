import React from "react";
import styled from "@emotion/styled";

const FeatureCard = ({ image, blueTitle, title, description, reverse }) => {
  // reverse prop에 따라 이미지와 텍스트의 순서가 변경됨
  return (
    <CardContainer reverse={reverse}>
      <ImageContainer reverse={reverse}>
        <CardImage src={image} alt={title} />
      </ImageContainer>
      <TextContainer reverse={reverse}>
        <CardBlueTitle>{blueTitle}</CardBlueTitle>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  max-width: 988px;
  display: flex;
  align-items: center;
  background-color: #fcfcfc;
  gap: 64px;
  margin-top: 138px;
  margin-bottom: 138px;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};

  @media (max-width: 1199px) {
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 743px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${(props) => (props.reverse ? "flex-end" : "flex-start")};
`;

const CardImage = styled.img`
  max-width: 588px;
  max-height: 444px;
  border-radius: 8px;

  @media (max-width: 1199px) {
    width: 100%;
  }

  @media (max-width: 743px) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.reverse ? "flex-end" : "flex-start")};
  text-align: ${(props) => (props.reverse ? "right" : "left")};
`;

const CardBlueTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  color: #3692ff;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1.5rem;
  color: #374151;
  font-weight: 500;
  line-height: 32px;
`;

export default FeatureCard;
