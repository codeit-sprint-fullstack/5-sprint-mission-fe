import InstaIcon from "../../img/InstaG.png";
import FaceBIcon from "../../img/facebook.png";
import TwitterIcon from "../../img/Twitter.png";
import YoutubeIcon from "../../img/Youtube.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 flex justify-center px-20 pt-8 pb-28">
      <div className="flex justify-between items-center w-[1520px] h-[20px]">
        <div>©codeit - 2024</div>
        <div className="flex gap-12">
          <div to="/privacy">Privacy Policy</div>
          <div to="/faq">FAQ</div>
        </div>
        <div className="flex gap-2">
          <img className="w-5 object-contain " src={FaceBIcon} alt="facebook" />
          <img className="w-5 object-contain" src={TwitterIcon} alt="twitter" />
          <img className="w-5 object-contain" src={YoutubeIcon} alt="Youtube" />
          <img className="w-5 object-contain" src={InstaIcon} alt="instar" />
        </div>
      </div>
    </footer>
  );
}
