import logo from "shared/assets/images/logo.png";
import logo_text from "shared/assets/images/logo_text.png";
import { useNavigate } from "react-router";
import "./Logo.css";

const Logo = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <div className="logo" onClick={handleClickLogo}>
      <img className="logo-img" src={logo} alt="logo"></img>
      <img className="logo-text-img" src={logo_text} alt="logo"></img>
    </div>
  );
};

export default Logo;
