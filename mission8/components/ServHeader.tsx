import logoImg from "@/public/imgs/panda_logo.png";
import Image from "next/image";
import Button from "./common/Button";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import mobileLogoImg from "@/public/imgs/mobile_logo.png";

export default function ServHeader() {
  const { width, height } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width <= 768) setIsMobile(true);
    else setIsMobile(false);
  }, [width]);

  return (
    <div className="flex items-center border mb-6 h-[70px]">
      <div className="xl:ml-[200px] xl:mr-[200px] flex justify-between w-[100%] md:p-4 p-2">
        <div className="flex items-center">
          {!isMobile ? (
            <div className="relative w-[153px] h-[51px] mr-6">
              <Image
                src={logoImg}
                alt="로고 이미지"
                fill
                priority
              />
            </div>
          ) : (
            <div className="relative w-[81px] h-[40px] mr-6">
              <Image
                src={mobileLogoImg}
                fill
                alt="모바일 로고 이미지"

              />
            </div>
          )}
          <div className="flex gap-4">
            <div className="h-[69px] flex items-center px-2 text-[#4B5563] font-bold">
              자유게시판
            </div>
            <div className="h-[69px] flex items-center px-2 text-[#4B5563] font-bold">
              중고마켓
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button name="로그인" disabled={false} />
        </div>
      </div>
    </div>
  );
}
