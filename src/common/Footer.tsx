import styled from "styled-components";
import facebookIcon from "../assets/images/ic_facebook.png";
import twitterIcon from "../assets/images/ic_twitter.png";
import youtubeIcon from "../assets/images/ic_youtube.png";
import instagramIcon from "../assets/images/ic_instagram.png";
import React from "react";
type StyledFooterProps = {
  $isMobile: boolean;
};
const socialLinks = [
  { href: "https://m.facebook.com/", src: facebookIcon, alt: "facebook" },
  { href: "https://twitter.com/?lang=en", src: twitterIcon, alt: "twitter" },
  { href: "https://www.youtube.com", src: youtubeIcon, alt: "youtube" },
  { href: "https://www.instagram.com/", src: instagramIcon, alt: "instagram" },
];

export const SocialLinks = () => {
  return (
    <SocialIcons>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon src={link.src} alt={link.alt} />
        </a>
      ))}
    </SocialIcons>
  );
};
export const FooterMark = () => {
  return (
    <MarkWrapper>
      <p>©codeit - 2025</p>
    </MarkWrapper>
  );
};

export const FooterLinks = () => {
  return (
    <LinkGroup>
      <FooterLink href="privacy_policy.html" target="_blank">
        Privacy Policy
      </FooterLink>
      <FooterLink href="FAQ.html" target="_blank">
        FAQ
      </FooterLink>
    </LinkGroup>
  );
};

type FooterProps = {
  $isMobile: boolean;
};

const Footer: React.FC<FooterProps> = ({ $isMobile }) => {
  return (
    <FooterWrapper $isMobile={$isMobile}>
      <StyledFooter $isMobile={$isMobile}>
        {$isMobile ? (
          <>
            <FooterContainer>
              <FooterLinks />
              <SocialLinks />
            </FooterContainer>
            <FooterMark />
          </>
        ) : (
          <>
            <FooterContainer>
              <FooterMark />
              <FooterLinks />
              <SocialLinks />
            </FooterContainer>
          </>
        )}
      </StyledFooter>
    </FooterWrapper>
  );
};
export default Footer;

const FooterWrapper = styled.div<{ $isMobile: boolean }>`
  background-color: #111827;
  overflow-x: hidden;
`;
const StyledFooter = styled.footer<StyledFooterProps>`
  background-color: #111827;
  text-align: center;
  width: 90vw;
  height: 10rem;
  font-size: 1rem;
  font-weight: normal;

  @media (max-width: 1024px) {
    padding: 2rem 0;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  width: 90vw;
  margin: 0 auto;

  @media (max-width: 767px) {
    /* 모바일에서는 세로로 정렬 */
    margin-bottom: 1.5rem;
    gap: 1rem;
    padding: 0 1rem; /* 모바일에서 여백을 좁힘 */
  }
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  white-space: nowrap;

  @media (min-width: 375px) and( max-width: 743px) {
    order: 0;
  }
`;

const FooterLink = styled.a`
  color: #e5e7eb;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MarkWrapper = styled.div`
  /* 변경된 이름 */
  color: #9ca3af;
  display: flex;
  justify-content: start;
  padding-left: 2rem;
  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;

  /* Mobile 스타일 적용 */
  @media (min-width: 375px) and( max-width: 743px) {
    order: 1;
  }
`;

const SocialIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;
