import "./style.css";
import { Button } from "shared/ui";
import { Text } from "shared/ui";
import { LogoButton } from "features";

const Header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="header">
          <LogoButton />
          <Button size={"sm48"}>
            <Text size={"lg"} weight={"semibold"} color={"#f3f4f6"}>
              로그인
            </Text>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
