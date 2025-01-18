import logo from "../../assets/images/header/pandaLogo.png";
import title from "../../assets/images/header/titleOnly.png";
import Button from "../../shared/components/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const moveOnLandingPage = () => {
    navigate("/");
  }

  return (
    <div className="fixed top-0 w-full bg-white border-b">
      <div className="mx-auto flex h-[70px] max-w-[1150px] items-center justify-between px-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={moveOnLandingPage}>
          <img src={logo} alt="logo" className="hidden md:block" />
          <img src={title} alt="title" />
        </div>
        <Button>로그인</Button>
      </div>
    </div>
  );
}
