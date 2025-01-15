import "./style.css";
import { Text } from "shared/ui";
import { FooterNoticeLink, FooterSnsLink } from "features";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer">
          <Text size={"lg"} weight={"regular"} color={"#9ca3af"}>
            @codeit - {currentYear}
          </Text>
          <FooterNoticeLink />
          <FooterSnsLink />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
