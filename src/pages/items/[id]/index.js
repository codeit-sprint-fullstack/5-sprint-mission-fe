import axios from "@/lib/axios";
import CommentItem from "@components/CommentItem";
import { useAuth } from "@contexts/AuthProvider";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetail = ({
  product: initialProducts,
  comments: initialComments,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const [product, setProduct] = useState(initialProducts);
  const [profileImage, setProfileImage] = useState("/ic_profile.png");
  const [comments, setComments] = useState(initialComments);
  const [commentValue, setCommentValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleKebabActive = () => {
    setIsActive((prev) => !prev);
  };

  const handleCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await axios.post(`/products/${product.id}/comments`, {
      content: commentValue,
    });
    const newComment = res.data;
    setComments((prev) => [newComment, ...prev]);
    setCommentValue("");
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`/products/${product.id}`);
      router.push("/items");
    } catch (err) {}
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((item) => item.id !== commentId));
    } catch (err) {}
  };

  const handleUpdateComment = async (newComment) => {
    setComments((prev) =>
      prev.map((item) => (item.id !== newComment.id ? item : { ...newComment }))
    );
  };

  const handleHeart = async () => {
    const res = product.isFavorite
      ? await axios.delete(`/products/${product.id}/favorite`)
      : await axios.post(`/products/${product.id}/favorite`);
    setProduct((prev) => ({ ...prev, ...res.data }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${product.id}`);
        setProduct((prev) => ({ ...prev, ...res.data }));
      } catch (err) {}
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    setIsActive(commentValue.trim().length > 0);
  }, [commentValue]);

  const ItemImage = ({ url }) => {
    const [image, setImage] = useState(url || "/img_default.png");

    return (
      <div
        className={clsx(
          `relative ${
            image === "/img_default.png" ? "w-3/5 h-3/5" : "w-full h-full"
          }`
        )}
      >
        <Image
          src={image}
          fill
          onError={(e) => setImage("/img_default.png")}
          // onError={(e) => (e.target.src = "/img_default.png")}
          alt=""
          unoptimized
        />
      </div>
    );
  };

  return (
    <div className="w-full mt-4">
      <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-6 border-b-[1px] border-b-[#E5E7EB] pb-6 md:pb-10 mb-6 md:mb-10">
        <div className="w-full md:max-w-[486px] md:flex-1 h-[343px] bg-[#F9FAFB] flex items-center justify-center rounded-2xl overflow-hidden mb-2">
          <ItemImage url={product.images[0]} />
        </div>
        <div className="w-full md:flex-1 flex flex-col md:justify-between">
          <div className="relative mb-8 md:mb-0">
            <div className="absolute right-0 flex flex-col items-end">
              <button onClick={handleKebabActive} className="relative w-6 h-6">
                <Image src="/ic_kebab.png" fill />
              </button>
              <div
                className={clsx(
                  "border-[1px] border-[#D1D5DB] rounded-lg flex flex-col items-center bg-white z-[100]",
                  {
                    ["visible"]: isActive,
                    ["hidden"]: !isActive,
                  }
                )}
              >
                <button
                  onClick={() => {
                    router.push(`/items/write/${product.id}`);
                  }}
                  className="px-6 md:px-10 py-4"
                >
                  수정하기
                </button>
                <button
                  onClick={() => {
                    handleDeleteItem();
                  }}
                  className="px-6 md:px-10 py-4"
                >
                  삭제하기
                </button>
              </div>
            </div>
            <div className="text-base md:text-xl text-[#1F2937] font-semibold">
              {product.name}
            </div>
            <div className="text-2xl md:text-[32px] text-[#1F2937] font-semibold mt-2 pb-3 border-b-[1px] border-b-[#E5E7EB]">
              {product.price.toLocaleString("ko-KR")}원
            </div>
            <div className="text-sm md:text-base text-[#4B5563] font-semibold mt-5">
              상품 소개
            </div>
            <div className="mt-3 text-base text-[#4B5563] font-normal">
              {product.description}
            </div>
            <div className="text-sm md:text-base text-[#4B5563] font-semibold mt-5">
              상품 태그
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              {product.tags?.map((item) => (
                <div className="py-1 px-3 bg-[#F3F4F6] rounded-3xl text-base text-[#1F2937] font-normal">
                  #{item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="relative w-10 h-10">
                <Image
                  src={profileImage}
                  fill
                  onError={(e) => setProfileImage("/ic_profile.png")}
                  alt=""
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="text-sm text-[#4B5563] font-medium">
                  {product.ownerNickname}
                </div>
                <div className="text-sm text-[#9CA3AF] font-normal">
                  {dayjs(product.createdAt).format("YYYY. MM. DD")}
                </div>
              </div>
            </div>
            <div className="pl-4 border-l-[1px] border-l-[#E5E7EB]">
              <button
                onClick={handleHeart}
                className="border-[1px] border-[#E5E7EB] rounded-[35px] flex items-center py-1 px-2 lg:px-3 gap-1"
              >
                <div className="relative w-6 lg:w-8 h-6 lg:h-8">
                  <Image
                    src={
                      product.isFavorite
                        ? "/ic_heart_fill.png"
                        : "/ic_heart.png"
                    }
                    fill
                  />
                </div>
                <div className="text-base text-[#6B7280] font-medium">
                  {product.favoriteCount}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[80px]">
        <div className="text-base text-[#111827] font-semibold mb-2">
          문의하기
        </div>
        <textarea
          value={commentValue}
          onChange={handleCommentValue}
          className="w-full min-h-[104px] rounded-xl px-6 py-4 bg-[#F3F4F6] mb-4"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <div className="relative">
          <button
            onClick={handleSubmit}
            className={clsx(
              "text-base text-[#F3F4F6] font-semibold w-[74px] h-[42px] rounded-lg absolute right-0",
              {
                ["bg-[#9CA3AF]"]: !isActive,
                ["bg-[#3692FF]"]: isActive,
              }
            )}
          >
            등록
          </button>
        </div>
      </div>

      <div>
        {comments.length > 0 &&
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
            />
          ))}
        {comments.length === 0 && (
          <div className="flex flex-col items-center">
            <div className="relative w-[140px] h-[140px]">
              <Image src="/img_inquiry_empty.png" fill />
            </div>
            <div className="text-base text-[#9CA3AF] font-normal text-center mt-2">
              아직 문의가 없어요
            </div>
          </div>
        )}
        <Link
          href="/items"
          className="bg-[#3692FF] flex gap-3 items-center px-8 w-[240px] h-12 rounded-[40px] mt-10 mx-auto"
        >
          <div className="text-lg text-[#F3F4F6]">목록으로 돌아가기</div>
          <div className="relative w-6 h-6">
            <Image src="/btn_medium.png" fill />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  let product;
  try {
    const res = await axios.get(`/products/${id}`);
    product = res.data;
  } catch (err) {
    return {
      notFound: true,
    };
  }

  let comments;
  try {
    const res = await axios.get(`/products/${id}/comments?limit=${5}`);
    comments = res.data.list;
  } catch (err) {
    comments = [];
  }

  return {
    props: {
      product,
      comments,
    },
  };
};
