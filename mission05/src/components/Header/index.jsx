import { styled } from "styled-components";
import logoImg from "../../assets/img/logo/logo-img.png";
import logoTitle from "../../assets/img/logo/logo-title.png";
import Nav from "./Nav";
import AuthItem from "./AuthItem";

export default function Header() {
  return (
    <HeaderContainer>
      <Content>
        <LogoNavContainer>
          <LogoWrapper>
            <LogoIMG src={logoImg} alt="판다마켓" />
            <LogoTitle src={logoTitle} alt="판다마켓" />
          </LogoWrapper>
          <Nav />
        </LogoNavContainer>
        <AuthItem />
      </Content>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;

  position: sticky;
  top: 0;

  z-index: 10;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 0 24px;

  width: 100%;
  max-width: 1200px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 744px) {
    padding: 0 16px;
  }
`;

const LogoNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 1200px) {
    gap: 20px;
  }

  @media (max-width: 744px) {
    gap: 8px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
`;

const LogoIMG = styled.img`
  width: auto;
  height: 40px;

  @media (max-width: 744px) {
    display: none;
  }
`;

const LogoTitle = styled.img`
  width: auto;
  height: 35px;
`;
