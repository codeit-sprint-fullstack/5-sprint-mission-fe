import Link from "next/link";
import Image from "next/image";
import iconLogo from "@/assets/logos/panda-market-icon-logo.svg";
import textLogo from "@/assets/logos/panda-market-text-logo.svg";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const NAVIGATION_ITEMS = [
  { href: "/board", label: "자유게시판", key: "board" },
  { href: "/market", label: "중고마켓", key: "market" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-[8.5px]">
      <div className="hidden md:flex justify-center items-center w-[40px] h-[40px] relative">
        <Image src={iconLogo} alt="판다마켓" fill={true} />
      </div>
      <div className="flex justify-center items-center w-[81px] h-[27px] md:w-[103px] md:h-[35px] relative">
        <Image src={textLogo} alt="판다마켓" fill={true} />
      </div>
    </Link>
  );
}

function Navigation({ isActivePages }) {
  return (
    <div className="flex items-center gap-[8px] md:gap-0 text-[16px] md:text-[18px] font-[700] text-gray-600">
      {NAVIGATION_ITEMS.map(({ href, label, key }) => (
        <Link
          key={key}
          href={href}
          className={`w-auto md:w-[109px] h-full ${
            isActivePages[key] ? "text-brand-color-100" : ""
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function Header() {
  const router = useRouter();
  const isActivePages = {
    board: router.asPath.startsWith("/board"),
    market: router.asPath.startsWith("/market"),
  };

  return (
    <header className="flex justify-between items-center w-full px-[16px] xl:px-[200px] py-[13px] border-b border-[#DFDFDF]">
      <div className="flex items-center gap-[16px] md:gap-[32px]">
        <Logo />
        <Navigation isActivePages={isActivePages} />
      </div>
      <Button onClick={() => router.push("/login")}>로그인</Button>
    </header>
  );
}

export default Header;
