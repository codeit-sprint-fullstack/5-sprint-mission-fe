import Image from "next/image";
import Link from "next/link";
import userIcon from "@images/user-icon/ic_profile.png";
import likeIcon from "@images/button-image/Like_Icon.png";
import baseImg from "@images/base-image/baseImg.png";
import { formatDay } from "@/lib/day";

export default function ProductList({ products = [] }) {
  return (
    <>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/items/${product.id}`}
          className="flex flex-col w-full gap-[24px] bg-custom-color-list-gray border-b border-custom-color-border-gray pb-[24px]"
        >
          <section className="flex justify-between">
            <p className="text-xl font-semibold">{product.name}</p>
            <Image
              src={product.images[0] || baseImg}
              alt="상품 기본 이미지"
              width={64}
              height={50}
              className="object-cover"
            />
          </section>
          <section className="flex justify-between">
            <div className="flex gap-[8px]">
              <Image
                src={userIcon}
                alt="유저 아이콘"
                className="w-[24px] object-contain"
              />
              <p className="text-sm text-custom-text-gray-400 font-normal">
                총명한 판다
              </p>
              <p className="text-sm text-custom-text-gray-50 font-normal">
                {formatDay(product.createdAt)}
              </p>
            </div>
            <div className="flex gap-[8px]">
              <Image
                src={likeIcon}
                alt="좋아요 아이콘"
                className="w-[20px] object-contain"
              />
              <p className="text-base font-normal text-custom-text-gray-200">
                {product.favoriteCount || 0}+
              </p>
            </div>
          </section>
        </Link>
      ))}
    </>
  );
}
