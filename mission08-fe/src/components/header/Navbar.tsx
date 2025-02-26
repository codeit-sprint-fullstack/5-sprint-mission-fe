"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    name: "자유게시판",
    href: "/article",
  },
  {
    name: "중고마켓",
    href: "/product",
  },
];

export default function NavBar() {
  const pathName = usePathname();

  return (
    <ul className="flex items-center gap-2 md:gap-10">
      {menu.map((item) => {
        const isActive = item.href === pathName;
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`font-bold text-base md:text-lg 
                ${isActive ? "text-primary-100" : "text-gray-600"}`}
            >
              <p className="transition-transform duration-300 ease-in-out hover:scale-110">
                {item.name}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
