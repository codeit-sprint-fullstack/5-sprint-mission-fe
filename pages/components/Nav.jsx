"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import panda from "../../assets/Group 19.png";
import login from "../../assets/로그인.png";
import loginImg from "../../assets/Frame2609463.png"; // 기본 프로필 이미지
import { useEffect, useState } from "react";

export default function Nav() {
  const { user, logout, loading } = useAuth();
  const [displayUser, setDisplayUser] = useState(null);

  // user 상태가 변경될 때 displayUser 상태도 업데이트
  useEffect(() => {
    setDisplayUser(user);
  }, [user]);

  if (loading) {
    return null; // 로딩 중이면 아무것도 표시 안 함
  }

  return (
    <nav className="bg-white sticky top-0 z-10 border-b mb-6">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-4 md:px-6 lg:px-10">
        <div className="flex items-center gap-10 text-gray-600 text-lg">
          <Link href="/">
            <Image src={panda} alt="Panda Market" width={153} height={51} />
          </Link>
          <Link href="/articles" className="hover:text-blue-500 font-bold">
            자유게시판
          </Link>
          <Link href="/products" className="hover:text-blue-500 font-bold">
            중고마켓
          </Link>
        </div>

        {displayUser ? (
          <div className="flex items-center gap-2">
            <Image
              src={displayUser.image || loginImg}
              alt="프로필 이미지"
              width={42}
              height={42}
              className="rounded-full cursor-pointer"
              unoptimized
            />

            <div>{displayUser.nickname}</div>
            <button onClick={logout} className="text-blue-500">
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/login">
            <picture className="cursor-pointer">
              <Image src={login} alt="로그인" width={88} height={42} />
            </picture>
          </Link>
        )}
      </div>
    </nav>
  );
}
