import styled from "styled-components";
import LogImg from "./img/판다 얼굴.png";
import LogText from "./img/판다마켓.png";

export function Header({ freeBoard, usedMarket, loginBtn }) {
  return (
    <>
      <Container>
        <HeadContent>
          <HeadLog>
            <HeadLogImg src={LogImg} alt="market logImg" />
            <HeadTextImg src={LogText} alt="market TextLog" />
            <MenuBtn>{freeBoard}</MenuBtn>
            <MenuBtn>{usedMarket}</MenuBtn>
          </HeadLog>
          <LoginBtn>{loginBtn}</LoginBtn>
        </HeadContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 200px;
  z-index: 10;
  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;

  @media (max-width: 1199px) {
    padding: 0 100px;
  }

  @media (max-width: 743px) {
    padding: 0 50px;
  }
`;

const HeadContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 112rem;

  @media (max-width: 743px) {
    gap: 40px;
  }
`;
const HeadLog = styled.div`
  display: flex;
  align-items: center;
  gap: 8.59px;

  @media (max-width: 1199px) {
    gap: 16px;
  }

  @media (max-width: 743px) {
    gap: 16px;
  }
`;

const HeadLogImg = styled.img`
  width: 40px;
`;

const HeadTextImg = styled.img`
  width: 103px;
`;

const MenuBtn = styled.button`
padding: 21px 15px;
font-size : 18px;
font-weight 700;
color: #4B5563;
background-color: #ffffff;
  text-decoration: none;
  text-align: center;
  border: none;
  white-space: nowrap;
  
  
    @media (max-width: 1199px) {font-size: 16px;}

  @media (max-width: 743px) {
  padding: 0;
  font-size: 14px;}

`;

const LoginBtn = styled.button`
display: flex;
justify-content: center;
  padding: 8px 23px;
  border-radius: 8px;
  background-color: #3692ff;
  font-size: 16px;
  font-weight: 600;
  color: #F3F4F6;
  text-decoration: none;
  white-space: nowrap;
  border : none;
&:hover 
  cursor: pointer;
`;
