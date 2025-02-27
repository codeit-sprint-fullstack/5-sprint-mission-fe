import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const BestPostCard = ({ item }) => {
  const createdAt = dayjs(item.createdAt).format("YYYY-MM-DD");

  return (
    <Link
      href={`/community/${item.id}`}
      className="h-[198px] lg:h-[169px] bg-[#F9FAFB] rounded-[8px] px-6 pb-4 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="w-[102px] h-[30px] bg-[#3692FF] rounded-b-2xl flex gap-1 items-center justify-center">
          <div className="w-4 h-4 relative">
            <Image src="/ic_badge.png" fill />
          </div>
          <div className="text-base font-semibold text-white">Best</div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="w-[66%]">
            <div className="text-[#1F2937] text-lg lg:text-xl font-semibold line-clamp-3 lg:line-clamp-2">
              {item.title}
            </div>
          </div>
          <div className="relative w-[72px] h-[72px] bg-white border-[0.75px] border-[#E5E7EB] rounded-lg overflow-hidden">
            <Image src={item.imageUrl || "/img_default.png"} fill />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="text-[#4B5563] text-sm font-normal">
            {item.nickname}
          </div>
          <div className="flex gap-1 items-center">
            <div className="relative w-4 h-4">
              <Image src="/ic_heart.png" fill alt="" />
            </div>
            <div className="text-[#6B7280] text-sm font-normal">
              {item.likeCnt >= 10000 ? "9999+" : item.likeCnt}
            </div>
          </div>
        </div>
        <div className="text-[#9CA3AF] text-sm font-normal">{createdAt}</div>
      </div>
    </Link>
  );
};

export default BestPostCard;
