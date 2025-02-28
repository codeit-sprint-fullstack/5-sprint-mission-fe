import styled from "styled-components";
import LandingImg from "../../assets/images/homeImage/Img_home_landing.png";
import HotItemImg from "../../assets/images/homeImage/Img_home_01.png";
import SearchImg from "../../assets/images/homeImage/Img_home_02-1.png";
import RegisterImg from "../../assets/images/homeImage/Img_home_03.png";
import HomeImg from "../../assets/images/homeImage/Img_home_04.png";
import { colors } from "../../assets/theme";
import { useIsMobile, useIsTablet } from "../../components/hooks/useSizes";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <MainContainer>
      <Landing>
        <LandingContainer>
          <Top>
            <Title>
              {isTablet ? (
                <p>일상의 모든 물건을 거래해 보세요</p>
              ) : (
                <>
                  <p>일상의 모든 물건을</p>
                  <p>거래해 보세요</p>
                </>
              )}
            </Title>
            <StyledLink to="/items">구경하러가기</StyledLink>
          </Top>
          <LandingImage src={LandingImg} alt="helloing panda image" />
        </LandingContainer>
      </Landing>
      {/* Hot Item Section */}
      <HomeSection>
        <Card>
          <CardImage src={HotItemImg} alt="green shirt and hearts" />
          <CardBox>
            <Badge>Hot item</Badge>
            <CardTitle>
              {isTablet || isMobile ? (
                <p>인기 상품을 확인해 보세요</p>
              ) : (
                <>
                  <p>인기 상품을</p>
                  <p>확인해 보세요</p>
                </>
              )}
            </CardTitle>
            <CardText>
              <p>가장 HOT한 중고거래 물품을</p>
              <p>판다 마켓에서 확인해 보세요</p>
            </CardText>
          </CardBox>
        </Card>
      </HomeSection>
      ;
      <HomeSection>
        <Card>
          {isTablet || isMobile ? (
            <>
              <CardImage src={SearchImg} alt="green shirt and hearts" />
              <CardBox>
                <Badge>Search</Badge>
                <CardTitle>
                  <p>구매를 원하는 상품을 검색하세요</p>
                </CardTitle>
                <CardText>
                  <p>구매하고 싶은 물품은 검색해서</p>
                  <p>쉽게 찾아보세요</p>
                </CardText>
              </CardBox>
            </>
          ) : (
            <>
              <CardBox>
                <Badge>Search</Badge>
                <CardTitle>
                  <p>구매를 원하는</p>
                  <p>상품을 검색하세요</p>
                </CardTitle>
                <CardText>
                  <p>구매하고 싶은 물품은 검색해서</p>
                  <p>쉽게 찾아보세요</p>
                </CardText>
              </CardBox>
              <CardImage src={SearchImg} alt="green shirt and hearts" />
            </>
          )}
        </Card>
      </HomeSection>
      <HomeSection>
        <Card>
          <CardImage src={RegisterImg} alt="green shirt and hearts" />
          <CardBox>
            <Badge>Register</Badge>
            <CardTitle>
              {isTablet || isMobile ? (
                <p>판매를 원하는 상품을 등록하세요</p> // 모바일 및 태블릿에서 한 줄로 표시
              ) : (
                <>
                  <p>판매를 원하는</p>
                  <p>상품을 등록하세요</p>
                </>
              )}
            </CardTitle>
            <CardText>
              <p>어떤 물건이든 판매하고 싶은 상품을</p>
              <p>쉽게 등록하세요</p>
            </CardText>
          </CardBox>
        </Card>
      </HomeSection>
      \
      <Landing>
        <LandingContainer>
          <CardBox>
            <CardTitle>
              <p>믿을 수 있는</p> <p>판다마켓 중고 거래</p>
            </CardTitle>
          </CardBox>
          <CardImage src={HomeImg} alt="green shirt and hearts" />
        </LandingContainer>
      </Landing>
    </MainContainer>
  );
};
export default LandingPage;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 138px;
  /* Tablet */
  @media (min-width: 768px) and (max-width: 1199px) {
    gap: 52px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    gap: 40px;
  }
`;
const Landing = styled.section`
  background-color: ${colors.landingBackground};
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;
const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding-top: 200px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 84px;
  }
  @media (max-width: 767px) {
    padding-top: 48px;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    margin-bottom: 200px;
  }
  @media (max-width: 767px) {
    margin-bottom: 132px;
  }
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: ${colors.gray7};
  line-height: 14px;
  text-align: left; /* 기본값: 데스크탑에서 왼쪽 정렬 */

  @media (max-width: 1024px) {
    text-align: center; /* 타블렛과 모바일에서는 가운데 정렬 */
  

  @media (max-width: 767px) {
    font-size: 32px;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  border-radius: 40px;
  width: 357px;
  height: 56px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${colors.buttonBlue};
  color: white;
  text-decoration: none;
  margin-bottom: 60px;
  @media (max-width: 1024px) {
    height: 56px;
    width: 357px;
    font-size: 20px;
  }
  @media (max-width: 767px) {
    width: 240px;
    height: 48px;
    font-size: 18px;
  }
`;

const LandingImage = styled.img`
  height: 340px;
  @media (max-width: 1024px) {
    height: 340px;
    width: auto;
  }
  @media (max-width: 767px) {
    height: 204px;
    width: auto;
  }
`;
const HomeSection = styled.section`
  max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1024px) {
    height: 708px;
  }
  @media (max-width: 767px) {
    height: 417px;
  }
`;

const Card = styled.div`
  width: 50%;
  max-width: 988px; /* 최대 너비 제한 */
  // height: 444px;
  height: auto; /* 높이는 내용에 맞게 조정 */
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  gap: 15px;
  @media (max-width: 1109px) {
    width: 90%;
    flex-direction: column;
  }
  @media (max-width: 767px) {
    width: 90%;
    padding: 0 10px;
  }
`;

const CardImage = styled.img`
  width: 90%;
  height: auto;
  @media (max-width: 1109px) {
    height: 524px;
    width: 100%;
    margin: 24px;
  }
  @media (max-width: 767px) {
    height: 259px;
    margin: 15px;
  }
  }
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 767px) {
    text-align: start;
  }
`;

const Badge = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #3692ff;
`;

const CardTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin: 0.5rem 0;
  white-space: nowrap;
  line-height: 14px;
  @media (max-width: 1024px) {
    font-size: 32px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const CardText = styled.p`
  font-size: 24px;
  white-space: nowrap;
  line-height: 10px;
  color: ${colors.gray7};

  @media (max-width: 1024px) {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
    text-align: left;
    margin-bottom: 20px;
  }
`;
