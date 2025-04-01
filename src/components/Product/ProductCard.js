import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const customLoader = ({ src }) => {
  return src; // 원본 URL 그대로 사용
};

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { images, name, price, likeCount } = product;

  const [imgSrc, setImgSrc] = useState(
    images && images.length > 0 ? images[0] : "/img_default.png"
  );

  // 이미지 로딩 실패 시 기본 이미지로
  const handleImageError = () => {
    setImgSrc("/img_default.png");
  };
  return (
    <div className="flex-col w-full gap-4">
      <Link href={`/items/${product.id}`}>
        <Image
          loader={customLoader}
          src={imgSrc}
          alt={name || "No Image"}
          className="block rounded-xl shadow-md w-full mb-4 aspect-square"
          width={300}
          height={300}
          onError={handleImageError}
        />
        <div className="flex flex-col text-gray-800 gap-[6px]">
          <p className="font-medium text-sm self-start">{name}</p>
          <h3 className="text-base font-bold self-start">
            {price.toLocaleString("ko-KR")}원
          </h3>
          <div className="flex items-center gap-[6px]">
            <Image
              src="/ic_heart.svg"
              className="w-4 h-4 max-w-full block"
              alt="Like Count"
              width={16}
              height={16}
            />
            <p className="text-xs font-medium leading-[18px] text-gray-600">
              {likeCount}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
