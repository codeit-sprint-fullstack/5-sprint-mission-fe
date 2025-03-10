"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProducts } from "../api/products";
import Link from "next/link";

export default function BestProductsList() {
  const [bestProducts, setBestProducts] = useState([]); // 베스트 상품 리스트
  const [loading, setLoading] = useState(true);

  // **🔹 베스트 상품 불러오기 (모든 데이터에서 좋아요 순 정렬)**
  const loadBestProducts = async () => {
    setLoading(true);
    try {
      let allData = [];
      let currentPage = 1;
      let totalFetched = 0;

      while (true) {
        const data = await fetchProducts({
          page: currentPage,
          pageSize: 10, // 한 번에 10개씩 가져오기
          orderBy: "latest", // 좋아요 순 정렬이 API에서 지원되면 "favorite"으로 변경
        });

        if (!data.list || data.list.length === 0) break; // 데이터가 없으면 종료
        allData = [...allData, ...data.list];
        totalFetched += data.list.length;
        currentPage++;

        if (totalFetched >= data.totalCount) break; // 모든 데이터 가져왔으면 종료
      }

      // **🔹 좋아요 수 기준 정렬**
      const sortedProducts = allData.sort(
        (a, b) => b.favoriteCount - a.favoriteCount
      );

      // **🔹 상위 4개 상품만 저장**
      setBestProducts(sortedProducts.slice(0, 4));
    } catch (error) {
      console.error("베스트 상품 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // **🔹 첫 로딩 시 베스트 상품 불러오기**
  useEffect(() => {
    loadBestProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">로딩 중...</div>;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8">
      <div className="flex text-xl font-bold text-center mb-6">베스트 상품</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bestProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg flex flex-col items-center  "
          >
            <Link href={`/products/${product.id}`}>
              <div className="w-full max-w-[282px] h-[282px] overflow-hidden rounded-lg">
                <Image
                  src={product.images?.[0] || "/img_default.png"}
                  alt="상품 이미지"
                  width={220}
                  height={220}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="flex flex-col items-start mt-4 w-full text-center">
              <div className="text-sm font-semibold text-gray-700">
                {product.name || "상품명 없음"}
              </div>
              <div className="font-bold text-gray-900 mt-2">
                {product.price.toLocaleString()}원
              </div>
              <p className="flex items-center justify-center text-gray-500 mt-2">
                <Image src="/heart.png" alt="heart" width={20} height={20} />
                &nbsp;{product.favoriteCount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
