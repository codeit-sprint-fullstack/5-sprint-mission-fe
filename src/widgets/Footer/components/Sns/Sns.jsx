import facebook from "../../../../assets/images/footer/facebook.png";
import twitter from "../../../../assets/images/footer/twitter.png";
import youtube from "../../../../assets/images/footer/youtube.png";
import instagram from "../../../../assets/images/footer/instagram.png";

export default function Sns() {
  return (
    <div className="order-3 flex items-start justify-end gap-3">
      <img src={facebook} alt="facebook" />
      <img src={twitter} alt="twiiter" />
      <img src={youtube} alt="youtube" />
      <img src={instagram} alt="instagram" />
    </div>
  );
}
