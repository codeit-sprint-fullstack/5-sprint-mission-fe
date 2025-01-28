import icFacebook from "../assets/icon/ic_facebook.png";
import icTwitter from "../assets/icon/ic_twitter.png";
import icYoutube from "../assets/icon/ic_youtube.png";
import icInstagram from "../assets/icon/ic_instagram.png";

function Footer() {
  return (
    <footer className="flex w-full h-[160px] p-[32px] justify-center bg-[#111827]">
      <div className="flex justify-between w-[1520px]">
        <div className="text-[#9CA3AF] font-[400]">@codeit-2024</div>
        <div className="flex gap-[30px] text-[#E5E7EB] font-[400]">
          <a>Privacy Policy</a>
          <a>FAQ</a>
        </div>
        <div className="flex gap-[12px]">
          <a>
            <img
              src={icFacebook}
              alt="Facebook"
              className="w-[20px] h-[20px]"
            />
          </a>
          <a>
            <img src={icTwitter} alt="Twitter" className="w-[20px] h-[20px]" />
          </a>
          <a>
            <img src={icYoutube} alt="Youtube" className="w-[20px] h-[20px]" />
          </a>
          <a>
            <img
              src={icInstagram}
              alt="Instagram"
              className="w-[20px] h-[20px]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
