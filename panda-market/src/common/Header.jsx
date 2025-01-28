import { Link, NavLink } from "react-router-dom";
import icLogo from "../assets/logo/ic_panda.png";
import nameLogo from "../assets/logo/name_panda.png";
import Button from "../common/Button.jsx";

function Header({ isMenuVisible }) {
  const menus = [
    {
      title: "자유게시판",
      path: "/board",
    },
    {
      title: "중고마켓",
      path: "/items",
    },
  ];

  function getLinkStyle({ isActive }) {
    return {
      color: isActive ? "#3692FF" : undefined,
    };
  }

  return (
    <header
      className={`flex w-full h-[70px] border-b-[1px] border-[#DFDFDF] ${
        isMenuVisible
          ? "pc:px-[200px] tablet:px-[20px] mobile: px-[20px]"
          : "pc:px-[400px] tablet:px-[50px] mobile: px-[50px]"
      }`}
    >
      <div className="flex w-full justify-between items-center sticky">
        <section className="flex items-center gap-[24px]">
          <Link to="/">
            <figure className="flex gap-[4.5px] items-center">
              <img
                src={icLogo}
                alt="🐼"
                className="w-[40px] h-[40px] tablet:block mobile:hidden"
              />
              <img
                src={nameLogo}
                alt="판다마켓"
                className="w-[110px] h-[28px]"
              />
            </figure>
          </Link>
          {isMenuVisible && (
            <nav className="flex">
              {menus.map((menu) => (
                <NavLink
                  to={menu.path}
                  key={menu.title}
                  style={getLinkStyle}
                  className="px-[15px] py-[21px] text-[18px] font-[700] leading-[26px] text-secondary-600"
                >
                  {menu.title}
                </NavLink>
              ))}
            </nav>
          )}
        </section>
        <Button
          classNames={`${
            isMenuVisible ? "w-[88px] h-[42px]" : "w-[128px] h-[48px]"
          } rounded-[8px] text-[16px] font-[600]`}
        >
          로그인
        </Button>
      </div>
    </header>
  );
}

export default Header;
