import LoginButton from "./components/LoginButton";
import Logo from "./components/Logo";
import Menu from "./components/Menu";

const Navbar = () => {
  return (
    <nav className="bg-white border-b fixed top-0 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <Menu />
          </div>
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
