import "./style.css";
import icFacebook from "shared/assets/images/ic_facebook.png";
import icTwitter from "shared/assets/images/ic_twitter.png";
import icYoutube from "shared/assets/images/ic_youtube.png";
import icInstagram from "shared/assets/images/ic_instagram.png";

const FooterSnsLink = () => {
  return (
    <div className="sns-link">
      <a href="https://www.facebook.com" target="_blank">
        <img src={icFacebook} alt="페이스북 아이콘"></img>
      </a>
      <a href="https://www.twitter.com" target="_blank">
        <img src={icTwitter} alt="트위터 아이콘"></img>
      </a>
      <a href="https://www.youtube.com" target="_blank">
        <img src={icYoutube} alt="유튜브 아이콘"></img>
      </a>
      <a href="https://www.instagram.com" target="_blank">
        <img src={icInstagram} alt="인스타그램 아이콘"></img>
      </a>
    </div>
  );
};

export default FooterSnsLink;
