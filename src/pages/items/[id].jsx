import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DetailLayout from "@/components/shared/DetailLayout";
import InquireList from "@/components/product/modify/InquireList";
import DetailInquire from "@/components/product/modify/DetailInquire";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchItemDetail = async (productId) => {
  if (!productId) return null;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ARL_PANDA_URL}/products/${productId}`
  );
  return res.data;
};

export default function ItemsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if (id) setProductId(id);
  }, [id]);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Items", productId],
    queryFn: () => fetchItemDetail(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[94px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
        <p className="text-center text-lg text-custom-text-gray-400">
          로딩 중...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[94px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
        <p className="text-center text-lg text-red-500">
          상품 정보를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[94px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
      <section>
        <DetailInquire
          product={product || {}}
          onDelete={() => console.log("삭제 실행!")}
          onUpdate={() => console.log("업데이트 실행!")}
        />
      </section>
      <section>
        <InquireList product={product || {}} />
      </section>
    </div>
  );
}

ItemsDetail.getLayout = (page) => {
  return <DetailLayout>{page}</DetailLayout>;
};
