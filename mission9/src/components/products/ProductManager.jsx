import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ProductList from "./ProductList";
import Search from "@/components/common/Search";
import SortDropdown from "./SortDropdown";
import Pagination from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
import Loading from "@/components/common/Loading";

/**
 * 상품 관리 컴포넌트
 */
const ProductManager = () => {
  // 검색어, 정렬 방식, 현재 페이지, 페이지당 아이템 수 상태 관리
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 쿼리 파라미터 생성 - 페이지, 정렬, 검색어 등
  const queryParams = {
    page: currentPage,
    pageSize: itemsPerPage,
    orderBy: sortType,
    keyword: searchQuery || undefined,
  };

  // 상품 데이터 조회 - 쿼리 파라미터를 키로 사용하여 변경 시마다 다시 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams),
    staleTime: 60000, // 1분 동안 데이터 유지
    retry: 2, // 실패 시 2번 재시도
    retryDelay: 1000, // 재시도 간격 1초
    onSuccess: (data) => {
      console.log("상품 목록 조회 성공:", data);
      // 총 아이템 수 업데이트
      setTotalItems(data.totalCount || 0);
    },
    onError: (error) => {
      console.error("상품 목록 조회 실패:", error);
    },
  });

  // 검색어나 정렬 방식이 변경되면 1페이지로 이동하고 데이터 다시 조회
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortType]);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);
  };

  // 로딩 중 표시
  if (isLoading) {
    return <Loading />;
  }

  // 에러 표시
  if (error) {
    console.error("상품 목록 에러 상세:", error);
    return (
      <ErrorMessage>
        상품 목록을 불러오는데 실패했습니다. {error.message}
      </ErrorMessage>
    );
  }

  // 데이터 추출
  const products = data?.items || [];

  // 페이지네이션 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  console.log("페이지네이션 정보:", {
    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    totalItems,
  });

  return (
    <Container>
      <ProductHeader>
        <Title>판매 중인 상품 ({totalItems})</Title>
        <ControlsContainer>
          <SearchWrapper>
            <Search
              onSearch={(value) => {
                setSearchQuery(value);
                refetch();
              }}
              initialValue={searchQuery}
              placeholder="상품명 검색"
            />
          </SearchWrapper>
          <SortDropdown
            onSortChange={(value) => {
              setSortType(value);
              refetch();
            }}
          />
        </ControlsContainer>
      </ProductHeader>

      <Spacer />

      {products.length === 0 ? (
        <NoProductsMessage>
          {searchQuery ? "검색 결과가 없습니다." : "등록된 상품이 없습니다."}
        </NoProductsMessage>
      ) : (
        <>
          <ProductList
            products={products}
            currentPage={1} // 이미 서버에서 페이지네이션된 데이터이므로 항상 1
            itemsPerPage={products.length} // 모든 항목 표시
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

// 컨테이너 스타일
const Container = styled.div`
  margin: 26px auto 140px;
`;

// 상품 헤더 스타일
const ProductHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 743px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

// 컨트롤 컨테이너 스타일
const ControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 743px) {
    width: 100%;
  }
`;

// 검색 래퍼 스타일
const SearchWrapper = styled.div`
  width: 300px;

  @media (max-width: 743px) {
    width: 100%;
  }
`;

// 여백 스타일
const Spacer = styled.div`
  height: 24px;
`;

// 에러 메시지 스타일
const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 16px;
  color: #ef4444;
`;

// 상품 없음 메시지 스타일
const NoProductsMessage = styled.div`
  text-align: center;
  padding: 60px 0;
  font-size: 16px;
  color: #6b7280;
`;

export default ProductManager;
