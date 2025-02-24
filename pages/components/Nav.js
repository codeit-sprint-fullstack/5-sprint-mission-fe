"use client";

import Image from "next/image";
import Link from "next/link";
import panda from "../../assets/Group 19.png";
import login from "../../assets/로그인.png";
import loginImg from "../../assets/Frame2609463.png";

export default function Nav() {
  return (
    <nav className="bg-white sticky top-0 z-10 border-b mb-6">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-4 md:px-6 lg:px-10">
        <div className="flex items-center gap-10 text-gray-600 text-lg">
          <Link href="/">
            <Image src={panda} alt="Panda Market" width={100} height={40} />
          </Link>
          <Link href="/articles" className="hover:text-blue-500">
            자유게시판
          </Link>
          <Link href="/market" className="hover:text-blue-500">
            중고마켓
          </Link>
        </div>
        <Link href="/">
          <picture className="cursor-pointer">
            <source
              media="(min-width: 375px) and (max-width: 1199px)"
              srcSet={loginImg.src}
            />
            <Image src={login} alt="로그인" width={80} height={30} />
          </picture>
        </Link>
      </div>
    </nav>
  );
}
