import styled from "styled-components";
import InstaIcon from "./img/InstaG.png";
import FaceBIcon from "./img/facebook.png";
import TwitterIcon from "./img/Twitter.png";
import YoutubeIcon from "./img/Youtube.png";

export function Footer({ source, policy, faq }) {
  return (
    <Container>
      <FooterContent>
        <FooterSource>{source}</FooterSource>

        <FooterTextService>
          <FooterTextBtn>{policy}</FooterTextBtn>
          <FooterTextBtn>{faq}</FooterTextBtn>
        </FooterTextService>

        <FooterImgBtn>
          <FooterImg src={FaceBIcon} alt="facebook" />
          <FooterImg src={TwitterIcon} alt="twiteer" />
          <FooterImg src={YoutubeIcon} alt="youtube" />
          <FooterImg src={InstaIcon} alt="instargram" />
        </FooterImgBtn>
      </FooterContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #111827; 
width:100%;
padding: 32px 200px 108px;
bottom:0;
}
`;

const FooterContent = styled.div`
  width: 1520px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  @media (max-width: 743px)
  gap: 2rem;
}
`;

const FooterSource = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
`;

const FooterTextService = styled.div`
  display: flex;
  gap: 30px;
`;

const FooterTextBtn = styled.button`
  display: flex;
  gap: 20px;
  font-size: 16px;
  color: #e5e7eb;
  background-color: #111827;
  text-decoration: none;
  border: none;
`;

const FooterImgBtn = styled.button`
  display: flex;
  background-color: #111827;
  border: none;
  gap: 7px;
`;
const FooterImg = styled.img`
  width: 20px;
  height: 20px;
`;
