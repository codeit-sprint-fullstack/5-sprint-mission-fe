import ProductCard from "@/types/productCard";
import api from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Product from "./Product";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize";

interface BestProducts {
  list: ProductCard[];
}

export default function BestProduct() {
  const [pageSize, setPageSize] = useState("4");
    const { width, height } = useWindowSize();
  useEffect(() => {
    if (width > 1280) setPageSize("4");
    else if (width > 768) setPageSize("2");
    else setPageSize("1");
  }, [width]);

  const getBestProducts = async (pageSize: string) => {
    const res = await api.get<BestProducts>(
      `/products/?pageSize=${pageSize}&order=favorite`
    );
    return res.data;
  };
  const { data, isPending, error } = useQuery({
    queryKey: ["bestProducts", pageSize],
    queryFn: async () => getBestProducts(pageSize),
    staleTime: 60 * 1000,
  });
  const bestProducts = data?.list;
  console.log(bestProducts);
  return (
    <>
      <h3 className="text-[20px] font-bold">베스트 상품</h3>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[24px]">
        {bestProducts?.map((bestProduct) => {
          return (
            <Link
              key={`bestProduct-${bestProduct.id}`}
              href={`/items/${bestProduct.id}`}
            >
              <Product product={bestProduct} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
