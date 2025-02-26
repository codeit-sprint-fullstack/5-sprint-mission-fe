"use client";

import type { Article } from "@/types";
import Link from "next/link";
import BestPostItem from "./BestArticleItem";
import { useEffect, useState } from "react";
import useDeviceType from "@/hooks/useDeviceType";

const COUNT_BY_DEVICE_TYPE = {
  PC: 3,
  Tablet: 2,
  Mobile: 1,
};

export default function BestArticles({ top3 }: { top3: Article[] }) {
  const deviceType = useDeviceType() as keyof typeof COUNT_BY_DEVICE_TYPE;
  const [count, setCount] = useState<number>(
    COUNT_BY_DEVICE_TYPE[deviceType] || 1
  );

  useEffect(() => {
    const count = COUNT_BY_DEVICE_TYPE[deviceType];
    if (count) {
      setCount(count);
    }
  }, [deviceType]);

  return (
    <section className="flex flex-col gap-4 md:gap-6 mb-6 xl:mb-10">
      <h1 className="text-gray-800 font-bold text-xl">베스트 게시글</h1>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-6">
        {top3?.slice(0, count).map((post) => (
          <Link href={`/article/${post.id}`} key={post.id}>
            <BestPostItem post={post} />
          </Link>
        ))}
      </div>
    </section>
  );
}
