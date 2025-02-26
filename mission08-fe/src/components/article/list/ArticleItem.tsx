import dateFormatter from "@/utils/dateFormatter";
import titleFormatter from "@/utils/titleFormatter";
import Image from "next/image";
import iconProfile from "@/assets/icons/ic_profile.png";
import iconHeart from "@/assets/icons/ic_heart.png";
import defaultImage from "@/assets/images/default.png";
import { Post } from "@/types";

export default function ArticleItem({ post }: { post: Post }) {
  const { title, likes, author, updatedAt } = post;

  return (
    <article className="bg-gradient-to-t from-[#FCFCFC] to-white hover:from-gray-100 border-b border-gray-200 flex flex-col gap-4">
      <section className="flex items-start justify-between">
        <h1 className="flex-1 min-w-0 font-semibold text-xl text-gray-800">
          {titleFormatter(title)}
        </h1>
        <div className="bg-white w-20 aspect-square p-3 border border-gray-200 rounded-md">
          <Image src={defaultImage} alt="기본 이미지" width={64} height={64} />
        </div>
      </section>

      <section className="flex items-center justify-between">
        <div className="flex gap-2 text-sm font-normal">
          <Image
            src={iconProfile}
            alt={`${author}의 프로필 사진`}
            width={24}
            height={24}
          />
          <p className="text-gray-600">{author}</p>
          <p className="text-gray-400">{dateFormatter(updatedAt)}</p>
        </div>

        <div className="flex gap-2 mb-6">
          <Image
            src={iconHeart}
            alt={`좋아요 개수는 ${likes}개 입니다.`}
            width={24}
            height={24}
          />
          <p className="text-base text-gray-500 font-normal">
            {likes > 9999 ? "9999+" : likes}
          </p>
        </div>
      </section>
    </article>
  );
}
