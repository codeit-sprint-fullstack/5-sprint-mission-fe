import logoImg from "../assets/img/logo1.png";
import userCon from "../assets/img/usercon.png";
function Header() {
  return (
    <header className="bg-white sticky top-8.5 flex justify-between items-center w-full mx-auto px-4 sm:px-8 md:px-8 lg:px-60  h-[70px] lg:h-[68px] border-b border-[#dfdfdfdf]">
      <div className="flex items-center  ">
        <a href="/">
          <img
            className="w-28 h-10 mr-6 sm:w-32 sm:h-12 lg:w-38 lg:h-13"
            src={logoImg}
            alt="logo image"
          />
        </a>
        <nav className="text-lg font-bold flex items-center text-[#4b5563]">
          <a href="">
            <h4 className="m-4 text-sm sm:text-base lg:text-lg whitespace-nowrap">
              자유게시판
            </h4>
          </a>
          <a href="">
            <h4 className="m-4 text-sm sm:text-base lg:text-lg whitespace-nowrap">
              중고마켓
            </h4>
          </a>
        </nav>
      </div>
      <a
        className="hidden md:block button text-base sm:px-6 px-3 py-2 my-3 sm:block whitespace-nowrap"
        href="\login.html"
      >
        로그인
      </a>
      <img className="block md:hidden" src={userCon} alt="유저기본이미지" />
    </header>
  );
}
export default Header;
