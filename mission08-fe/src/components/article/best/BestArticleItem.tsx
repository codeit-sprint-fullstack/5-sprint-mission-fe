import Image from "next/image";
import defaultImage from "@/assets/images/default.png";
import iconHeart from "@/assets/icons/ic_heart.png";
import titleFormatter from "@/utils/titleFormatter";
import dateFormatter from "@/utils/dateFormatter";
import type { Article } from "@/types";
import Badge from "./Badge";

export default function BestArticleItem({ post }: { post: Article }) {
  const { title, author, likes, createdAt } = post;

  return (
    <div className="group bg-gray-50 rounded-lg px-6 pb-4 transition-transform duration-300 hover:scale-105">
      <Badge />

      <section className="flex items-start justify-between mt-4 mb-10 xl:mb-5">
        <h1 className="flex-1 min-w-0 font-semibold text-xl text-gray-800">
          {titleFormatter(title)}
        </h1>
        <div className="bg-white w-20 aspect-square p-3 border border-gray-200 rounded-md">
          <Image src={defaultImage} alt="기본 이미지" width={64} height={64} />
        </div>
      </section>

      <section className="flex items-center justify-between font-normal text-sm">
        <div className="flex items-center gap-2">
          <p className="text-gray-600">{author}</p>

          <div className="flex items-center gap-1">
            <Image
              src={iconHeart}
              alt={`좋아요 개수는 ${likes}개 입니다`}
              width={16}
              height={16}
            />
            <p className="text-gray-500">{likes > 9999 ? "9999+" : likes}</p>
          </div>
        </div>

        <p className="text-gray-400">{dateFormatter(createdAt)}</p>
      </section>
    </div>
  );
}
