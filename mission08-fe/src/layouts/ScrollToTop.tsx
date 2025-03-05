"use client";

import Image from "next/image";
import arrow from "@/assets/icons/ic_arrow_down.png";

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={scrollToTop}
      className="bg-primary-100 fixed bottom-5 right-5 md:bottom-10 md:right-10 rounded-full p-5 cursor-pointer"
    >
      <Image
        src={arrow}
        alt="맨 위로 가기"
        className="transform rotate-180 w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10"
      />
    </div>
  );
}
