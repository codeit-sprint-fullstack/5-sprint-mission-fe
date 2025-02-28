import "./style.css";
import { Button } from "shared/ui";
import { Text } from "shared/ui";
import { LogoButton } from "features";

const Header = ({ children }) => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="header">
          <div className="header-container">
            <LogoButton />
            {children}
          </div>
          <Button size={"sm48"}>
            <Text size={"lg"} weight={"semibold"} style={{ color: "#f3f4f6" }}>
              로그인
            </Text>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
