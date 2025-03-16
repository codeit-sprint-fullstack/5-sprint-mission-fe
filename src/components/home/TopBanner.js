import Link from "next/link";
import Image from "next/image";
import TopBannerImg from "@images/home-image/TopBannerImg.png";

export default function TopBanner() {
  return (
    <div className="flex  bg-custom-color-bg-blue">
      <div className="flex flex-col justify-between items-center  gap-20 pt-20 md:pt-36 md:gap-0  max-w-6xl mx-auto md:flex-row md:justify-baseline md:items-end">
        <div className="flex flex-col  pb-0 md:pb-18">
          <h1 className="text-4xl font-bold whitespace-nowrap leading-tight mb-8 max-md:mb-0">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>

          <Link
            href={"/items"}
            className="flex justify-center items-center bg-custom-color-blue text-white font-bold rounded-full px-24  py-4 text-2xl "
          >
            구경하러 가기
          </Link>
        </div>
        <Image
          className="w-full md:w-3/5 "
          src={TopBannerImg}
          alt="상단 배너 이미지"
        />
      </div>
    </div>
  );
}
