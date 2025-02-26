import iconHeart from "@/assets/icons/ic_heart.png";
import Image from "next/image";

export default function Like({ likes }: { likes: number }) {
  return (
    <div className="flex items-center gap-1 border border-gray-200 px-3 py-1 rounded-3xl">
      <Image src={iconHeart} alt="좋아요" width={32} height={32} />
      <p className="text-gray-500 font-medium text-base">{likes}</p>
    </div>
  );
}
