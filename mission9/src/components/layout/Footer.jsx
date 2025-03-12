import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const FooterContainer = styled.footer`
  background-color: #1f2937;
  color: #9ca3af;
  padding: 2rem 0;
  height: 100px;
`;

const FooterContent = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media (max-width: 1600px) {
    max-width: 1600px;
  }

  @media (max-width: 744px) {
    padding: 0 16px;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  @media (max-width: 744px) {
    order: 3;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex: 1;

  @media (max-width: 744px) {
    order: 2;
  }
`;

const LinkItem = styled.div`
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 744px) {
    order: 1;
  }
`;

const IconLink = styled.div`
  color: #9ca3af;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LeftSection>
          <p>&copy; Codeit - 2024</p>
        </LeftSection>
        <LinksContainer>
          <Link href="/privacy" passHref legacyBehavior>
            <LinkItem>Privacy Policy</LinkItem>
          </Link>
          <Link href="/faq" passHref legacyBehavior>
            <LinkItem>FAQ</LinkItem>
          </Link>
        </LinksContainer>
        <SocialIcons>
          <Link href="https://www.facebook.com" passHref legacyBehavior>
            <IconLink>
              <img
                src="https://i.imgur.com/72YKihL.png"
                alt="Facebook"
                style={{ width: "20px" }}
              />
            </IconLink>
          </Link>
          <Link href="https://www.twitter.com" passHref legacyBehavior>
            <IconLink>
              <img
                src="https://i.imgur.com/EjCQMDP.png"
                alt="Twitter"
                style={{ width: "20px" }}
              />
            </IconLink>
          </Link>
          <Link href="https://www.youtube.com" passHref legacyBehavior>
            <IconLink>
              <img
                src="https://i.imgur.com/7NDJvBu.png"
                alt="YouTube"
                style={{ width: "20px" }}
              />
            </IconLink>
          </Link>
          <Link href="https://www.instagram.com" passHref legacyBehavior>
            <IconLink>
              <img
                src="https://i.imgur.com/LkNjYZv.png"
                alt="Instagram"
                style={{ width: "20px" }}
              />
            </IconLink>
          </Link>
        </SocialIcons>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
