import Image from "next/image";
import userIcon from "@images/user-icon/ic_profile.png";
import likeIcon from "@images/button-image/Like_Icon.png";
import { formatDay } from "@/lib/day";
import ProductModifySelect from "./ProductModifySelect";
import { useAuth } from "@/core/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";

export default function DetailInquire({ product = {}, onDelete, onUpdate }) {
  const { user, accessToken } = useAuth();

  const likeProduct = useMutation({
    mutationFn: async () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_ARL_PANDA_URL}/products/${product.id}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    },
  });

  const unlikeProduct = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `${process.env.NEXT_PUBLIC_ARL_PANDA_URL}/products/${product.id}/favorite`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    },
  });

  const handleLike = () => {
    if (!user) return alert("로그인이 필요합니다.");
    product.isLiked ? unlikeProduct.mutate() : likeProduct.mutate();
  };

  return (
    <>
      <div className="flex w-full gap-6">
        <div className="flex flex-col gap-4 pb-4 border-b border-custom-color-border-gray">
          <section className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-custom-text-black-800">
              {product.name}
            </h2>
            <ProductModifySelect
              product={product}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </section>

          <section className="flex flex-col">
            <p className="text-lg font-normal text-custom-text-black-800 pt-[24px]">
              {product.description}
            </p>
            <div className="flex justify-between">
              <p className="text-xl font-bold text-custom-text-black-800">
                {product.price
                  ? product.price.toLocaleString("ko-KR") + " 원"
                  : "가격 정보 없음"}
              </p>
            </div>
          </section>

          <section>
            <div className="flex justify-between gap-4 ">
              <Image
                src={userIcon}
                alt="user Icon"
                className="w-[40px] object-contain"
              />
              <div className="flex flex-col items-center gap-2  ">
                <p className="text-sm font-medium text-custom-text-gray-400">
                  움직인판다
                </p>
                <p className="text-sm font-normal text-custom-text-gray-50">
                  {formatDay(product.createdAt)}
                </p>
              </div>
              <button
                onClick={handleLike}
                className="flex items-center gap-1 border border-custom-color-border-gray ml-4 md:ml-8 px-3 py-1 rounded-4xl"
              >
                <Image
                  src={likeIcon}
                  alt="like Icon"
                  className="w-[26px] object-contain"
                />
                <p>{product.favoriteCount || 0}</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
