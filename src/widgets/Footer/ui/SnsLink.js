import ic_facebook from "shared/assets/icon/ic_facebook.png";
import ic_instagram from "shared/assets/icon/ic_instagram.png";
import ic_twitter from "shared/assets/icon/ic_twitter.png";
import ic_youtube from "shared/assets/icon/ic_youtube.png";
import "./SnsLink.css";

const SnsLink = () => {
  return (
    <div className="footer__sns-link">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={ic_facebook} alt="facebook" />
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={ic_twitter} alt="twitter" />
      </a>
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={ic_youtube} alt="youtube" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={ic_instagram} alt="instagram" />
      </a>
    </div>
  );
};

export default SnsLink;
