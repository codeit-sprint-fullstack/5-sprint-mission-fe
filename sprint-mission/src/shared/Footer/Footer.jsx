import "./Footer.css";
import facebookIcon from "../../shared/assets/facebook_icon.png";
import twitterIcon from "../../shared/assets/twitter_icon.png";
import youtubeIcon from "../../shared/assets/youtube_icon.png";
import instaIcon from "../../shared/assets/insta_icon.png";
import { FooterLink } from "./ui/FooterLink";
import { FooterSns } from "./ui/FooterSns";
import { Typo, typoStyles } from "../Typo/Typo";

const SNS_LINK_LIST = [
  {
    snsName: "페이스북",
    href: "https://www.facebook.com/",
    src: facebookIcon,
  },
  {
    snsName: "트위터",
    href: "https://x.com/",
    src: twitterIcon,
  },
  {
    snsName: "유튜브",
    href: "https://www.youtube.com/",
    src: youtubeIcon,
  },
  {
    snsName: "인스타그램",
    href: "https://www.instagram.com/",
    src: instaIcon,
  },
];

export function Footer() {
  return (
    <footer>
      <div className="content">
        <div id="addr">
          <Typo className={typoStyles.textLgRegular} content="©codeit - 2024" />
        </div>

        <FooterLink />

        <div className="sns-box">
          {SNS_LINK_LIST.map((sns, idx) => (
            <FooterSns sns={sns} key={idx} />
          ))}
        </div>
      </div>
    </footer>
  );
}
