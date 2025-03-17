import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/header.module.css";

interface User {
  nickname: string;
  profileImg: string | null;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log("user", storedUser);
      }
    }
  }, []);

  return (
    <header id={styles.header}>
      <div id={styles.header_left}>
        <Link href={"/"}>
          <div id={styles.header_img}>
            <Image
              src={"/assets/header-panda.svg"}
              alt={"headerPandaImg"}
              width={153}
              height={51}
            />
          </div>
        </Link>
        <Link href={"/bulletin-board"}>
          <p className={styles.header_text}>자유게시판</p>
        </Link>
        <Link href={"/items"}>
          <p className={styles.header_text}>중고마켓</p>
        </Link>
      </div>
      <div id={styles.header_right}>
        {user ? (
          <div className={styles.userInfo}>
            <Image
              src={user.profileImg ? user.profileImg : "/assets/basic_img.svg"}
              alt="프로필"
              width={40}
              height={40}
            />
            <span>{user.nickname}</span>
          </div>
        ) : (
          <Link href={"/login"}>
            <p>로그인</p>
          </Link>
        )}
      </div>
    </header>
  );
}
