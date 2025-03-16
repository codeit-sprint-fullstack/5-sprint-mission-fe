"use client";

import { useAuthStore } from "@/stores/authStore";
import placeholderUser from "@/assets/icons/placeholder-user.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/apiResponse";

export default function NavigationUser() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const getUserInfo = useAuthStore((state) => state.getUserInfo);
  const logout = useAuthStore((state) => state.logout);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      checkAuth();
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
      console.log(isLoggedIn);
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-row gap-1.5 items-center" onClick={logout}>
          <Image
            src={placeholderUser}
            alt="placeholder-user"
            width={40}
            height={40}
          />
          <p className="text-lg font-medium text-gray-600">
            {userInfo?.nickname}
          </p>
        </div>
      ) : (
        <Link href="/login">
          <Button name="로그인" />
        </Link>
      )}
    </>
  );
}
