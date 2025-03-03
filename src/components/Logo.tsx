import Image from "next/image";
import logo from "../../assets/icons/panda-logo.svg";
import logoName from "../../assets/icons/panda-name.svg";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 w-[81px] h-[27px] xs:w-[153px] xs:h-[51px]">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="hidden xs:block"
        />
        <Image
          className="w-[81px] h-[27px] xs:w-[103px] xs:h-[35px]"
          src={logoName}
          alt="Logo"
        />
      </div>
    </Link>
  );
}
