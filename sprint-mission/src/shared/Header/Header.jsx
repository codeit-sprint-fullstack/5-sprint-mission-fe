import "./Header.css";
import { HeaderLogo } from "./ui/HeaderLogo";
import { HeaderLink } from "./ui/HeaderLink";
import { HeaderUser } from "./ui/HeaderUser";
import { useState } from "react";

export function Header() {
  //TODO: 추후 유저데이터 관련 API 추가할 때 다시 수정. 지금은 임시로 버튼 클릭만 하면 로그인/로그아웃 전환되는 상태.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClickUserBtn = () => {
    setIsLoggedIn((prev) => !prev); //로그인 여부 토글
  };

  return (
    <header>
      <nav>
        <div className="nav-menu">
          <HeaderLogo />
          <HeaderLink />
        </div>

        <div className="header-user">
          <HeaderUser
            isLoggedIn={isLoggedIn}
            handleClick={handleClickUserBtn}
          />
        </div>
      </nav>
    </header>
  );
}
