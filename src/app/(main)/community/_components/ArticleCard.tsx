import Image from "next/image";
import Link from "next/link";
import likeImg from "@/shared/assets/Img/button-image/Like_Icon.png";
import baseImg from "@/shared/assets/Img/base-image/baseImg.png";
import medal from "@/shared/assets/Img/ic_medal.png";
import { formatDay } from "@/lib/utill";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  console.log("article", article);
  return (
    <Link
      href={`/community/${article.id}`}
      className="flex flex-col w-full bg-custom-color-card-gray px-[24px] pb-[16px] gap-[16px]"
    >
      <section className="flex justify-center w-[102px] py-[2px] bg-custom-color-blue rounded-b-2xl gap-[5px]">
        <Image
          src={medal}
          alt="medal Icon"
          className="w-[14px] object-contain"
        />
        <p className="text-base font-semibold text-white">Best</p>
      </section>

      <div className="flex flex-col gap-[40px] xl:gap-[18px]">
        <section className="flex justify-between">
          <p className="text-lg text-custom-text-gray-800 font-semibold">
            {article.title}
          </p>
          <Image
            src={article.imageUrls?.[0] || baseImg}
            alt="상품 Image"
            width={64}
            height={50}
            className="object-cover"
          />
        </section>

        <section className="flex justify-between items-center">
          <div className="flex gap-[8px]">
            <p className="text-sm text-custom-text-gray-400 font-normal">
              {article.user?.nickname ?? "알 수 없음"}
            </p>
            <div className="flex items-center gap-[4px]">
              <Image
                src={likeImg}
                alt="like Icon"
                className="w-[13px] object-contain"
              />
              <p className="text-sm text-custom-text-gray-200 font-normal">
                {(article._count?.favorites ?? 0) + "+"}
              </p>
            </div>
          </div>
          <p className="text-sm text-custom-text-gray-50 font-normal">
            {formatDay(article.createdAt)}
          </p>
        </section>
      </div>
    </Link>
  );
}
