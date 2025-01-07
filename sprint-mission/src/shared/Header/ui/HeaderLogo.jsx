import { Link } from "react-router-dom";
import logoImg from "../../assets/logo_icon.png";
import logoText from "../../assets/logo_text.png";

export function HeaderLogo() {
  return (
    <Link to="/">
      {/* XXX: 모바일 사이즈에서 텍스트만 보이기위해 아이콘/텍스트 분리해서 넣음 */}
      <div id="logo-img">
        <img id="logo-icon" src={logoImg} alt="로고 이미지" />
        <img id="logo-text" src={logoText} alt="로고 텍스트" />
      </div>
    </Link>
  );
}
