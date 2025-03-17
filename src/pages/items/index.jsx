import { useQuery } from "@tanstack/react-query";
import DetailLayout from "@/components/shared/DetailLayout";
import axios from "axios";
import BestProduct from "@/components/product/BestProducts";
import Product from "@/components/product/Product";

const fetchProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ARL_PANDA_URL}/products`
  );
  return res.data.list || [];
};

export default function ItemsPage() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Items"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[82px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
        <p className="text-center text-lg text-custom-text-gray-400">
          로딩 중...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[82px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
        <p className="text-center text-lg text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[82px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
      <section>
        <BestProduct products={products} />
      </section>
      <section>
        <Product products={products} />
      </section>
    </div>
  );
}

ItemsPage.getLayout = (page) => {
  return <DetailLayout>{page}</DetailLayout>;
};
