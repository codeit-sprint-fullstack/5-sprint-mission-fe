import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import useCustomMediaQuery from "@hooks/useCustomMediaQuery";
import { usePathname } from "next/navigation";
import { useAuth } from "@contexts/AuthProvider";

const Header = ({ variant = "full" }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "자유게시판", path: "/community" },
    { name: "중고마켓", path: "/items" },
  ];

  const { user, setUser } = useAuth();
  const isMobile = useCustomMediaQuery("(max-width: 743px)"); //
  const homeImgSource = isMobile ? "/home_logo_text.png" : "/home_logo.png";

  return (
    <header className="sticky top-0 z-50 w-full px-4 md:px-6 py-[15px] md:py-[10px] border-b-[1px] border-[#dfdfdf] bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className={clsx("relative cursor-pointer", {
            ["w-[153px] h-[51px]"]: !isMobile,
            ["w-[81px] h-[40px]"]: isMobile,
          })}
        >
          <Image
            src={homeImgSource}
            fill
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {variant === "full" && (
          <nav className="flex-grow ml-3 md:ml-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  "px-1 md:px-5 font-bold text-base md:text-lg",
                  pathname === item.path ? "text-[#3692FF]" : "text-[#4B5563]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image src={user.image || "/ic_profile.png"} fill />
            </div>
            <div className="hidden lg:block text-lg text-[#4B5563] font-normal">
              {user.nickname}
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="w-[88px] h-[42px] bg-[#3692FF] rounded-lg text-base font-semibold text-[#ffffff] flex items-center justify-center"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
