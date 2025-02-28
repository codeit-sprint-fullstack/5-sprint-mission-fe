"use client";

import Image from "next/image";
import iconProfile from "@/assets/icons/ic_profile.png";
import dateFormatter from "@/utils/dateFormatter";
import Like from "@/components/shared/Like";
import Control from "@/components/shared/Control";
import { useRouter } from "next/navigation";
import { useArticle } from "@/app/article/[id]/layout";

export default function ArticleDetail() {
  const router = useRouter();
  const { value: article } = useArticle();
  const { author, title, content, createdAt } = article;

  return (
    <>
      <section className="border-b border-gray-200 mb-4 xl:mb-6 relative">
        <Control
          onDelete={() => {
            router.push("/article");
          }}
          onEdit={() => router.push(`/article/${article.id}/edit`)}
        />
        <h1 className="font-bold text-xl text-gray-800 whitespace-pre-line">
          {title}
        </h1>
        <div className="my-4 text-sm flex items-center">
          <Image src={iconProfile} alt="profile" width={40} height={40} />
          <span className="ml-4 flex gap-2">
            <p className="text-gray-600">{author}</p>
            <p className="text-gray-400">{dateFormatter(createdAt)}</p>
          </span>
          <div className="h-[34px] w-[1px] bg-gray-200 mx-8"></div>
          <Like likes={article.likes} />
        </div>
      </section>

      <p className="text-gray-800 text-base font-normal whitespace-pre-line">
        {content}
      </p>
    </>
  );
}
