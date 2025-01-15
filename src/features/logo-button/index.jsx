import { NavLink } from "react-router-dom";
import "./style.css";
import logoImg from "shared/assets/images/logo_img_40x40.png";
import logoText from "shared/assets/images/logo_text_103x51.png";
import { useMediaQuery } from "shared/hooks/useMediaQuery";

const LogoButton = () => {
  const media = useMediaQuery();
  const isMobile = media === "mobile";

  return (
    <NavLink to={"/"} className="logo">
      {!isMobile && <img className="logo-img" src={logoImg} alt="" />}
      <img className="logo-text" src={logoText} alt=""></img>
    </NavLink>
  );
};

export default LogoButton;
