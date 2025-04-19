import BottomBannerImg from "@/shared/assets/Img/home-image/bottomBannerImg.png";
import Image from "next/image";

export default function BottomBanner() {
  return (
    <>
      <div className=" flex  bg-custom-color-bg-blue  ">
        <div className="flex flex-col justify-between items-center  gap-20 pt-20 md:pt-36 md:gap-0  max-w-6xl mx-auto md:flex-row md:justify-baseline md:items-end">
          <div className="flex flex-col items-center h-full pt-32 max-md:pt-0">
            <h1 className="text-4xl font-bold leading-tight ">
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h1>
          </div>
          <Image
            className="w-full  md:w-3/5"
            src={BottomBannerImg}
            alt="하단 배너 이미지"
          />
        </div>
      </div>
    </>
  );
}
