import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem;
  width: 100%;
  background: #111827;
  margin-top: 2rem;
  height: 160px;
  color: #9ca3af;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 200px;

  @media (max-width: 1199px) and (min-width: 744px) {
    padding: 0 100px;
  }

  @media (max-width: 743px) {
    align-items: center;
    justify-content: center;
    height: auto;
    gap: 1rem;
    padding: 1rem 20px;
  }
`;

const LinksContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 743px) {
    justify-content: center;
  }
`;

const LinkItem = styled.a`
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  &:hover {
    color: #ffffff;
  }
`;

const SocialIcons = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 743px) {
    justify-content: center;
  }
`;

const IconLink = styled.a`
  color: #9ca3af;
  font-size: 1.25rem;
  &:hover {
    color: #ffffff;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; Codeit - 2024</p>
      <LinksContainer>
        <LinkItem href="/privacy">Privacy Policy</LinkItem>
        <LinkItem href="/faq">FAQ</LinkItem>
      </LinksContainer>
      <SocialIcons>
        <IconLink
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://i.imgur.com/72YKihL.png"
            alt="Facebook"
            style={{ width: "20px" }}
          />
        </IconLink>
        <IconLink
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://i.imgur.com/EjCQMDP.png"
            alt="Twitter"
            style={{ width: "20px" }}
          />
        </IconLink>
        <IconLink
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://i.imgur.com/7NDJvBu.png"
            alt="YouTube"
            style={{ width: "20px" }}
          />
        </IconLink>
        <IconLink
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://i.imgur.com/LkNjYZv.png"
            alt="Instagram"
            style={{ width: "20px" }}
          />
        </IconLink>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
