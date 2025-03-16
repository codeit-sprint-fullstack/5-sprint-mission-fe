import Image from "next/image";
import medal from "@/assets/icons/ic_medal.svg";
import macbook from "@/assets/images/macbook.png";
import heartIcon from "@/assets/icons/ic_heart.svg";

export default function BestBoardCard() {
  return (
    <div className="w-[340px] h-[198px] md:w-[384px] md:h-[169px] bg-[#F9FAFB] rounded-2xl px-6 pb-4">
      <BestBadge />
      {/* 콘탠츠 영역 */}
      <div className="w-full h-[136px] md:h-[110px] mt-4 flex flex-col">
        {/* 상단 */}
        <div className="flex gap-10 md:gap-2">
          <p className="text-lg md:text-xl text-gray-700 font-semibold">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </p>
          <Image src={macbook} width={72} height={72} alt="best-board-card" />
        </div>
        <div className="flex-grow" />
        {/* 하단 */}
        <div className="flex text-gray-500 text-sm gap-2">
          <p>총명한 판다</p>
          <div className="flex gap-1">
            <Image src={heartIcon} alt="heart" width={16} height={16} />
            <p>9999+</p>
          </div>
          <div className="flex-grow" />
          <p className="text-gray-400">2025. 02. 23</p>
        </div>
      </div>
    </div>
  );
}

function BestBadge() {
  return (
    <div className="flex items-center justify-center gap-1 w-[102px] h-[30px] bg-primary rounded-b-2xl">
      <Image src={medal} alt="medal" width={16} height={16} />
      <p className="font-semibold text-base text-white">Best</p>
    </div>
  );
}
