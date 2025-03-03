import Image from "next/image";
import Link from "next/link";
import LabeledBox from "@/components/LabeledBox";
import medalImage from "@/assets/images/ic-medal.svg";
import defaultImage from "@/assets/images/laptop.svg";
import heartIcon from "@/assets/images/ic-heart.svg";
import { formatDate } from "@/utils/dateFormat";

const BEST_ARTICLE_STYLES = {
  base: "block flex-1", // 1번째: 모바일, 태블릿, PC
  second: "hidden md:block flex-1", // 2번째: 태블릿, PC
  third: "hidden md:hidden xl:block flex-1", // 3번째: PC
  getClassNames(index) {
    switch (index) {
      case 1:
        return `${this.base} ${this.second}`;
      case 2:
        return `${this.base} ${this.third}`;
      default:
        return this.base;
    }
  },
};

function BestArticleCard({ article, index = 0 }) {
  const imageUrl = article.images[0] || defaultImage;

  return (
    <li className={BEST_ARTICLE_STYLES.getClassNames(index)}>
      <Link href={`board/${article.id}`}>
        <LabeledBox
          labelImage={
            <Image src={medalImage} alt="best" width={16} height={16} />
          }
          labelText="BEST"
        >
          <div className="flex flex-col gap-[40px] justify-between">
            <div className="flex justify-between items-start gap-[37px] mt-[16px]">
              <p className="text-[18px] md:text-[20px] font-[600] text-gray-800">
                {article.title}
              </p>
              <div className="w-[72px] min-width-[72px] h-[72px] relative flex-shrink-0">
                <Image src={imageUrl} alt="laptop" fill={true} />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-[8px] text-gray-600 text-[14px] font-[400]">
                <span>{article.username}</span>
                <div className="flex items-center gap-[4px]">
                  <Image src={heartIcon} alt="heart" width={16} height={16} />
                  <span className="text-[14px] font-[400] text-gray-500">
                    {article.likeCount >= 10000 ? "9999+" : article.likeCount}
                  </span>
                </div>
              </div>
              <span className="text-[14px] font-[400] text-gray-400">
                {formatDate(article.createdAt)}
              </span>
            </div>
          </div>
        </LabeledBox>
      </Link>
    </li>
  );
}

export default BestArticleCard;
