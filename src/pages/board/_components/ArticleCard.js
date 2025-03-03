import Link from "next/link";
import Image from "next/image";
import defaultPostImage from "@/assets/images/laptop.svg";
import defaultUserImage from "@/assets/images/ic-profile.svg";
import heartImage from "@/assets/images/ic-heart.svg";
import { formatDate } from "@/utils/dateFormat";

function ArticleCard({ article }) {
  const imageUrl = {
    article: article.images[0] || defaultPostImage,
    user: defaultUserImage,
  };

  return (
    <li key={article.id}>
      <Link href={`/board/${article.id}`}>
        <div className="flex flex-col gap-[16px] justify-between border-b border-[#DFDFDF] bg-[#FCFCFC] p-[25px]">
          <div className="flex justify-between items-start gap-[8px]">
            <p className="text-[18px] md:text-[20px] font-[600] text-gray-800">
              {article.title}
            </p>
            <div className="w-[72px] min-width-[72px] h-[72px] relative flex-shrink-0">
              <Image src={imageUrl.article} alt="laptop" fill={true} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-[8px] text-gray-600 text-[14px] font-[400]">
              <div className="flex items-center gap-[8px]">
                <Image
                  src={imageUrl.user}
                  alt="profile"
                  width={24}
                  height={24}
                />
                <span>{article.username}</span>
              </div>
              <span className="text-gray-400 text-[14px] font-[400]">
                {formatDate(article.createdAt)}
              </span>
            </div>
            <div className="flex justify-center items-center gap-[4px] w-[70px]">
              <Image src={heartImage} alt="heart" width={16} height={16} />
              <span className="text-[16px] font-[400] text-gray-500">
                {article.likeCount >= 10000 ? "9999+" : article.likeCount}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ArticleCard;
