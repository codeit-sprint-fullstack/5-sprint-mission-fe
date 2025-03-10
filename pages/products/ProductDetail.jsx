import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import ProductCommentList from "../components/ProductCommentList";

export default function ProductDetail({ product, handleLike }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(product.isFavorite); // ✅ 좋아요 상태
  const [likeCount, setLikeCount] = useState(product.favoriteCount); // ✅ 좋아요 수

  if (!product) {
    return <p>상품 정보가 없습니다.</p>;
  }

  const defaultImage = "/img_default.png";
  const imageUrl =
    !product.images || product.images.length === 0
      ? defaultImage
      : product.images[0];

  const handleLikeClick = async () => {
    try {
      // await handleLike(product.id, !isLiked); //  좋아요 API 요청 (props로 받아서 실행)
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
      alert("좋아요 요청에 실패했습니다.");
    }
  };

  return (
    <>
      <div className=" w-full max-w-[1200px]  mx-auto  rounded-lg mb-10">
        <div className="flex gap-6 border-b pb-10">
          <img
            src={imageUrl}
            alt="상품 이미지"
            className="w-[486px] h-[486px] object-cover rounded-2xl"
            onError={(e) => (e.target.src = defaultImage)} // 이미지 로딩 실패 시 기본 이미지로 변경
          />

          <div className=" flex flex-col gap-6 max-w-[690px] w-full">
            <div className="flex flex-col  justify-between gap-4">
              <div className="text-2xl font-semibold">{product.name}</div>
              <div className="text-[40px] font-semibold mb-4">
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-semibold text-[#4b5563]">상품 소개</div>
              <p className="text-[#4b5563] font-normal">
                {product.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-semibold text-[#4b5563]">상품 태그</div>
              <div className="flex gap-2">
                {product.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-[#f3f4f6] rounded-[26px] py-1 px-4"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="flex items-center gap-4">
                <div>
                  <Image
                    src={
                      product.image?.length > 0
                        ? product.image[0]
                        : "/smallprofile.png"
                    }
                    alt="user icon"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="font-medium text-sm text-[#4b5563]">
                    {product.ownerNickname}
                  </div>
                  <div className="text-sm text-[#9ca3af] font-normal">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2  pl-4 ">
                <div className="border-l-2 pl-6">
                  <div className="flex items-center gap-2 border rounded-[35px] py-1 px-3">
                    <Image
                      src={isLiked ? "/colorheart.png" : "/heart.png"}
                      alt="heart"
                      width={32}
                      height={32}
                      onClick={handleLikeClick}
                    />
                    <div className="font-medium text-[#6b7280]">
                      {product.favoriteCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[1200px]  ">
        <div className="flex justify-start mb-2">문의하기</div>
        <div className="flex justify-center">
          <textarea
            className="w-full h-[104px] bg-[#f3f4f6] p-4 rounded-lg outline-none resize-none"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className=" mt-4 text-white bg-[#9ca3af] py-2 px-6 rounded-lg">
            등록
          </button>
        </div>
      </div>
      <ProductCommentList productId={product.id} />
    </>
  );
}
