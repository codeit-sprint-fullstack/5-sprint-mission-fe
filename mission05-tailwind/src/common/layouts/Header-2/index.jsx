import Button from "../../components/Button";
import logoImage from "../../../assets/logo/logo-img.png";
import logoTitle from "../../../assets/logo/logo-title.png";

const NAV_ITEM = {
  BOARD: "자유게시판",
  FLEA_MARKET: "중고마켓",
};

const navItems = {
  [NAV_ITEM.BOARD]: "/board",
  [NAV_ITEM.FLEA_MARKET]: "/items",
};

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-300 sticky top-0 z-10">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-[24px] py-[12px] md:px-[16px]">
        <section className="flex gap-[24px] tb:gap-[20px] md:gap-[8px]">
          {/* logo */}
          <div className="flex items-center gap-[8px]">
            <img
              src={logoImage}
              alt="판다마켓"
              className="w-[40px] h-[40px] cursor-pointer md:hidden"
            />
            <img
              src={logoTitle}
              alt="판다마켓"
              className="w-auto h-[36px] cursor-pointer"
            />
          </div>

          {/* nav bar */}
          <nav className="flex items-center">
            <ul className="flex p-0 gap-[30px] mx-[15px] list-none md:gap-[8px] md:m-0">
              {Object.keys(navItems).map((navItem, idx) => (
                <li
                  key={idx}
                  className="text-gray-600 text-lg font-bold leading-[26px]  cursor-pointer md:text-base"
                >
                  {navItem}
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* button */}
        <Button>로그인</Button>
      </div>
    </header>
  );
}
