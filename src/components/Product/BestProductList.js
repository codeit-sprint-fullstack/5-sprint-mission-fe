import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/services/api/products";

// 스켈레톤 카드 컴포넌트
const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="bg-gray-200 h-48 rounded-md mb-3"></div>

    <div className="bg-gray-200 h-5 rounded w-3/4 mb-2"></div>

    <div className="bg-gray-200 h-4 rounded w-1/2 mb-4"></div>

    <div className="flex justify-between items-center">
      <div className="bg-gray-200 h-6 rounded w-1/3"></div>
      <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
    </div>
  </div>
);

export default function BestProductList() {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [orderBy, setOrderBy] = useState("favorite");
  const [loading, setLoading] = useState(true);

  // 화면 크기에 따라 아이템 수 조정
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(1);
    } else if (width < 1024) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { list, totalCount } = await fetchProducts({ orderBy });

        if (Array.isArray(list)) {
          setData(list);
        } else {
          console.error("Invalid data format:", list);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderBy]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:px-6 lg:grid-cols-4 gap-4 w-full mt-6 mb-[43px]">
        {loading ? (
          // 스켈레톤 UI
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : data.length > 0 ? (
          data
            .slice(0, itemsPerPage)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          // 데이터가 없는 경우 메시지
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-600">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute w-full h-full">
                <div className="w-24 h-24 mx-auto border-4 border-dashed rounded-full animate-spin border-gray-300"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
              </div>
            </div>
            <div className="text-xl font-medium">상품을 찾는 중...</div>
          </div>
        )}
      </div>
    </div>
  );
}
