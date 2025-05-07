import Link from "next/link";
import { NavMenuProps } from "@/types/components.types";

const NavMenu = ({ children, isActive, to }: NavMenuProps) => {
  return (
    <Link
      href={to}
      className={`px-6 py-5 text-lg font-bold text-gray-700 no-underline transition-colors ${
        isActive ? "text-primary-blue" : "hover:text-primary-blue"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavMenu;
