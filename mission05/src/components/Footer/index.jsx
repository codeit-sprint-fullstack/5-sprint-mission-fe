import styled from "styled-components";
import iconFacebook from "../../assets/img/sns/ic_facebook.png";
import iconTwitter from "../../assets/img/sns/ic_twitter.png";
import iconYoutube from "../../assets/img/sns/ic_youtube.png";
import iconInstagram from "../../assets/img/sns/ic_instagram.png";

export default function Footer() {
  return (
    <FooterWrapper>
      <Content>
        <Right>©codeit - 2024</Right>
        <Mid>
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </Mid>
        <Left>
          <Img src={iconFacebook} alt="페이스북" />
          <Img src={iconTwitter} alt="트위터" />
          <Img src={iconYoutube} alt="유튜브" />
          <Img src={iconInstagram} alt="인스타그램" />
        </Left>
      </Content>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background-color: #111827;

  font-size: 1rem;
  font-weight: 400;
  line-height: 20px;

  padding-top: 32px;
  padding-bottom: 108px;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 0 24px;

  width: 100%;
  max-width: 1200px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 744px) {
    padding: 0 16px;
  }
`;

const Right = styled.div`
  color: #9ca3af;

  @media (max-width: 420px) {
    order: 3;
  }
`;

const Mid = styled.div`
  color: #e5e7eb;
  display: flex;
  gap: 30px;

  p:hover {
    cursor: pointer;
  }

  @media (max-width: 420px) {
    order: 1;
    margin-bottom: 24px;
  }
`;

const Left = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 420px) {
    order: 2;
    margin-bottom: 24px;
  }
`;

const Img = styled.img`
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`;
