import Image from "next/image";
import userIcon from "@images/user-icon/ic_profile.png";
import likeIcon from "@images/button-image/Like_Icon.png";

import { formatDay } from "@/lib/day";
import ArticleDropdownBar from "./ArticleModifySelect";

export default function DetailArticle({ articles }) {
  return (
    <>
      <div>
        <div className="flex flex-col gap-4 pb-4 border-b border-custom-color-border-gray">
          <section className="flex justify-between">
            <p className="text-xl font-bold text-custom-text-black-800">
              {articles.title}
            </p>
            <ArticleDropdownBar articles={articles} />
          </section>

          <section>
            <div className="flex gap-4 ">
              <Image
                src={userIcon}
                alt="user Icon"
                className="w-[40px] object-contain"
              />
              <div className="flex items-center gap-2 pr-4 md:pr-8 border-r border-custom-color-border-gray">
                <p className="text-sm font-medium text-custom-text-gray-400">
                  움직인판다
                </p>
                <p className="text-sm font-normal text-custom-text-gray-50">
                  {formatDay(articles.createdAt)}
                </p>
              </div>
              <button className="flex items-center gap-1 border border-custom-color-border-gray ml-4 md:ml-8 px-3 py-1 rounded-4xl">
                <Image
                  src={likeIcon}
                  alt="like Icon"
                  className="w-[26px] object-contain"
                />
                <p>{articles.likes?.length || 0}</p>
              </button>
            </div>
          </section>
        </div>

        <section>
          <p className="text-lg font-normal text-custom-text-black-800 pt-[24px]">
            {articles.content}
          </p>
        </section>
      </div>
    </>
  );
}
