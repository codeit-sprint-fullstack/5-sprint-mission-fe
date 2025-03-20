"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { fetchProducts } from "../api/products";
import Link from "next/link";
import { ProductContext } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function ProductList() {
  const [products, setProducts] = useState([]); // 현재 페이지의 상품 리스트
  const [allProducts, setAllProducts] = useState([]); // 모든 상품 리스트 (검색을 위해 저장)
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [page, setPage] = useState(1); // 현재 페이지
  const [prevPage, setPrevPage] = useState(1); // 검색 전 원래 페이지 저장
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션
  const [isSearching, setIsSearching] = useState(false); // 검색 중 여부
  const { setSelectedProduct } = useContext(ProductContext);
  const { user } = useAuth();
  const router = useRouter();

  // ** 모든 상품 불러오기 (검색을 위해)**
  const loadAllProducts = async (orderBy = sortOption) => {
    try {
      let allData = [];
      let currentPage = 1;
      let totalFetched = 0;

      while (true) {
        const data = await fetchProducts({
          page: currentPage,
          pageSize: 10, // 한 페이지당 10개씩
          orderBy,
        });

        if (!data.list || data.list.length === 0) break; // 데이터 없으면 종료
        allData = [...allData, ...data.list];
        totalFetched += data.list.length;
        currentPage++;

        if (totalFetched >= data.totalCount) break; // 모든 데이터 가져왔으면 종료
      }

      setAllProducts(allData);
    } catch (error) {
      console.error("상품 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const handleWriteClick = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    } else {
      router.push("/products/new");
    }
  };

  // **🔹 현재 페이지 상품 불러오기**
  const loadProducts = async (pageNumber = page, orderBy = sortOption) => {
    try {
      const data = await fetchProducts({
        page: pageNumber,
        pageSize: 10,
        orderBy,
      });

      setProducts(data.list || []);
      setTotalPages(Math.ceil(data.totalCount / 10)); // 전체 페이지 계산
    } catch (error) {
      console.error("상품 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // **🔹 첫 로딩 시 모든 상품 불러오기**
  useEffect(() => {
    loadAllProducts(sortOption);
  }, []);

  // **🔹 페이지 변경 시 데이터 로드**
  useEffect(() => {
    if (!isSearching) {
      loadProducts(page, sortOption);
    }
  }, [page, sortOption, isSearching]);

  // **🔹 검색 실행 함수**
  const executeSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      setPage(prevPage); // 원래 페이지로 복귀
      loadProducts(prevPage, sortOption);
    } else {
      setIsSearching(true);
      setPrevPage(page); // 검색 전 페이지 저장
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  // **🔹 검색 버튼 및 엔터 입력 시 실행**
  const handleSearchClick = () => executeSearch();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") executeSearch();
  };

  // **🔹 페이지네이션 관련 로직**
  const maxPageNumbers = 5; // 한 번에 표시할 페이지 개수
  const currentGroup = Math.ceil(page / maxPageNumbers); // 현재 페이지 그룹
  const startPage = (currentGroup - 1) * maxPageNumbers + 1;
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  // **🔹 페이지 이동 함수**
  const goToPage = (pageNum) => setPage(pageNum);
  const goToPrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const ProductImage = (product) => {
    // 이미지가 없거나 비어있는 경우 기본 이미지 반환
    if (!product.images || product.images.length === 0 || !product.images[0]) {
      return "/img_default.png";
    }
    return product.images[0];
  };

  return (
    <>
      <div className="w-full max-w-[1200px]">
        <div className="flex justify-between">
          <div className="font-bold text-xl">판매 중인 상품</div>
          <div className="flex flex-row justify-between gap-3 items-center">
            <div className="relative">
              <button
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                onClick={handleSearchClick}
              >
                <img
                  src="/Vector (1).png"
                  alt="검색"
                  className="w-[15px] h-[15px]"
                />
              </button>
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                className="w-full rounded-lg border-gray-50 bg-[#f3f4f6] px-10 py-2 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              className="py-2 px-6 bg-[#3692ff] font-semibold text-[#f3f4f6] rounded-lg cursor-pointer"
              onClick={handleWriteClick}
            >
              상품 등록하기
            </button>
            <div className="border py-3 px-5 rounded-xl w-[130px]">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="latest">최신순</option>
                <option value="heart">좋아요순</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-[1200px] gap-6 py-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg flex flex-col items-center"
            >
              <Link href={`/products/${product.id}`}>
                <div className="w-[220px] h-[220px] overflow-hidden rounded-lg">
                  <Image
                    src={product.images?.[0] || "/img_default.png"}
                    alt="상품 이미지"
                    width={220}
                    height={220}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "/img_default.png")}
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
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-semibold col-span-full">
            상품이 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 (검색 중에는 비활성화) */}
      {!isSearching && (
        <div className="flex justify-center items-center gap-2 my-6">
          <button
            className="px-3 py-3 border  rounded-[50%]"
            onClick={goToPrevPage}
            disabled={page === 1}
          >
            <Image src="/arrow_left.png" alt="r" width={16} height={16} />
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <button
              key={startPage + i}
              className={`px-4 py-2 border rounded-[50%] ${
                page === startPage + i
                  ? "bg-blue-500 text-white"
                  : " text-gray-700"
              }`}
              onClick={() => goToPage(startPage + i)}
            >
              {startPage + i}
            </button>
          ))}
          <button
            className="px-3 py-3 border  rounded-[50%]"
            onClick={goToNextPage}
            disabled={page === totalPages}
          >
            <Image src="/arrow_right.png" alt="r" width={16} height={16} />
          </button>
        </div>
      )}
    </>
  );
}
