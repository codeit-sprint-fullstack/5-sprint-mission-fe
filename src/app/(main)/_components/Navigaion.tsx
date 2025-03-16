import { Button } from "../../../components/Button";
import Logo from "./Logo";
import NavigationMenu from "./NavigaionMenu";
import NavigationUser from "./NavigationUser";

export default function Navigation() {
  return (
    <div className="fixed top-0 left-0 right-0 px-4 border-b border-gray-200 bg-white">
      <div className="flex flex-row gap-4 items-center max-w-[1520px] mx-auto">
        <Logo />
        <NavigationMenu />
        <div className="flex-grow" />
        <NavigationUser />
      </div>
    </div>
  );
}
