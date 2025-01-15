import facebookIcon from "../assets/img/ic_facebook.png";
import twitterIcon from "../assets/img/ic_twitter.png";
import youtubeIcon from "../assets/img/ic_youtube.png";
import instagramIcon from "../assets/img/ic_instagram.png";

function Footer() {
  return (
    <footer className="block text-center bg-[#111827] h-40 text-base font-normal">
      <div className="flex justify-between max-w-[1400] w-[90vw] h-auto px-2 mx-auto mr-auto">
        <div className="text-[#9CA3AF] mt-8">codeit © 2024</div>
        <div className="flex justify-center gap-8 mt-8">
          <a
            className="text-[#E5E7EB] text-base no-underline"
            href="privacy_policy.html"
            target="_blank"
          >
            Privacy Policy
          </a>
          <a
            className="text-[#E5E7EB] text-base no-underline"
            href="FAQ.html"
            target="_blank"
          >
            FAQ
          </a>
        </div>
        <div className="flex justify-between gap-3 mt-8 ">
          <a href="https://m.facebook.com/" target="_blank">
            <img className="w-5 h-5" src={facebookIcon} alt="facebook" />
          </a>
          <a href="https://twitter.com/?lang=en" target="_blank">
            <img className="w-5 h-5" src={twitterIcon} alt="twitter" />
          </a>
          <a href="https://www.youtube.com" target="_blank">
            <img className="w-5 h-5" src={youtubeIcon} alt="youtube" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img className="w-5 h-5" src={instagramIcon} alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
