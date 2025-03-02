"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationMenu() {
  const pathname = usePathname();
  const menus: { [key: string]: string } = {
    board: "자유게시판",
    market: "중고마켓",
  };

  return (
    <div className="flex flex-row">
      {Object.keys(menus).map((menu) => (
        <Link
          href={`/${menu}`}
          key={menu}
          className="w-[70px] xs:w-[109px] h-[69px] flex items-center justify-center  "
        >
          <p
            className={`${
              pathname === `/${menu}` ? "text-primary" : "text-gray-600"
            } font-bold text-base xs:text-lg`}
          >
            {menus[menu]}
          </p>
        </Link>
      ))}
    </div>
  );
}
