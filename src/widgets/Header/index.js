import Button from "shared/buttons/Button";
import Logo from "./ui/Logo";
import Nav from "./ui/Nav";
import "./index.css";

const Header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="header">
          <div className="header-container">
            <Logo></Logo>
            <Nav></Nav>
          </div>
          <Button size={"sm-42"}>로그인</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
