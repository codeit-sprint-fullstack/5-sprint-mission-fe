import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchProducts } from "@/services/api/products";
import ProductCard from "./ProductCard";
import Select from "@/components/Select";
import SearchBar from "@/components/SearchBar";
import Pagination from "../Pagination";
const ProductList = () => {
  const [data, setData] = useState({ list: [], totalCount: 0 });
  const [orderBy, setOrderBy] = useState("recent");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(data.totalCount / itemsPerPage);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setPage(1);
  };

  // 화면 크기에 따라 업데이트
  const updateItemsPerPage = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      setItemsPerPage(width < 640 ? 4 : width < 1024 ? 6 : 10);
    }
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [updateItemsPerPage]);

  const fetchPageData = useCallback(async () => {
    try {
      const response = await fetchProducts({
        orderBy,
        page: page.toString(),
        pageSize: itemsPerPage.toString(),
        search: searchTerm,
      });
      setData({ list: response.list, totalCount: response.totalCount });
      console.log("검색어 전달값:", searchTerm);
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  }, [orderBy, page, searchTerm, itemsPerPage]);

  const handleOrderByChange = (value) => {
    setOrderBy(value);
  };

  const orderByOptions = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "favorite" },
  ];

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <>
      <div className="mt-4 md:px-6">
        <div className="grid grid-cols-3 md:flex lg:flex gap-3 items-center relative md:justify-between sm:flex sm:justify-between">
          {/* 판매중인 상품 제목 */}
          <h2 className="whitespace-nowrap text-2xl font-bold col-span-1">
            판매중인 상품
          </h2>

          <div className="col-span-2 order-3 sm:order-2 h-[42px] sm:flex justify-end w-full">
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
          </div>

          {/* 상품 등록하기 버튼 */}
          <Link
            href="/items/register"
            className="col-span-2 sm:col-span-1 order-2 sm:flex md:flex text-base w-[calc(100%-6rem)] mr-12 sm:w-[133px] md:w-[133px] sm:mr-0 whitespace-nowrap font-semibold text-center h-[42px] sm:py-2 md:px-4 sm:px-6 bg-[#3692ff] mx-auto border-none rounded-lg text-[#f3f4f6] no-underline cursor-pointer flex items-center justify-center"
          >
            상품 등록하기
          </Link>
          <div className="col-span-1 order-4 justify-self-end">
            <Select
              value={orderBy}
              onChange={handleOrderByChange}
              options={orderByOptions}
            />
          </div>
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:px-6 lg:grid-cols-5 gap-4 w-full mt-6 mb-[43px]">
        {Array.isArray(data.list) &&
          data.list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProductList;
