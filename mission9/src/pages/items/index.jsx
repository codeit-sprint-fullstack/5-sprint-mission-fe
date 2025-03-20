import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductList from "@/components/products/ProductList";
import Search from "@/components/common/Search";
import SortDropdown from "@/components/products/SortDropdown";
import Pagination from "@/components/common/Pagination";
import { getProducts } from "@/services/productService";
import { hasToken } from "@/services/authService";
import Loading from "@/components/common/Loading";

/**
 * 상품 목록 페이지
 */
const ItemsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isLoggedIn = typeof window !== "undefined" ? hasToken() : false;

  // URL 쿼리 파라미터 가져오기
  const { page: pageQuery, keyword, sort } = router.query;

  // useState 선언
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // React Query를 사용하여 상품 목록 조회
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", currentPage, itemsPerPage, sortType, searchQuery],
    queryFn: () =>
      getProducts({
        page: currentPage,
        pageSize: itemsPerPage,
        orderBy: sortType,
        keyword: searchQuery,
      }),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선한 상태로 유지
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 3,
    keepPreviousData: true,
  });

  // 함수 선언
  // URL 업데이트 함수
  const updateUrl = (params) => {
    const newQuery = { ...router.query };

    // 페이지 번호 업데이트
    if (params.page) {
      newQuery.page = params.page.toString();
    } else {
      delete newQuery.page;
    }

    // 검색어 업데이트
    if (params.keyword) {
      newQuery.keyword = params.keyword;
    } else {
      delete newQuery.keyword;
    }

    // 정렬 방식 업데이트
    if (params.sort) {
      newQuery.sort = params.sort;
    } else {
      delete newQuery.sort;
    }

    // URL 업데이트 (페이지 새로고침 없이)
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrl({ page, keyword: searchQuery, sort: sortType });
  };

  // 검색 핸들러
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    updateUrl({ page: 1, keyword: value, sort: sortType });
  };

  // 정렬 변경 핸들러
  const handleSortChange = (value) => {
    setSortType(value);
    updateUrl({ page: currentPage, keyword: searchQuery, sort: value });
  };

  // 에러 메시지 컴포넌트
  const ErrorMessage = ({ message }) => (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>
        {message || "상품 목록을 불러오는 중 오류가 발생했습니다."}
      </ErrorText>
      <RetryButton onClick={() => window.location.reload()}>
        다시 시도
      </RetryButton>
    </ErrorContainer>
  );

  // 상품 목록 렌더링 함수
  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      );
    }

    if (isError) {
      return <ErrorMessage message={error?.message} />;
    }

    // data가 있는지 확인
    if (!data) {
      return (
        <NoProductsMessage>데이터를 불러올 수 없습니다.</NoProductsMessage>
      );
    }

    // 상품 목록 확인 (items 또는 list 필드)
    const productList = data.list || data.items || [];

    if (productList.length === 0) {
      return (
        <NoProductsMessage>
          {searchQuery
            ? `'${searchQuery}' 검색 결과가 없습니다.`
            : "등록된 상품이 없습니다."}
        </NoProductsMessage>
      );
    }

    return (
      <>
        <ProductList
          products={productList}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalItems={data.totalCount}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </PaginationContainer>
      </>
    );
  };

  // useEffect 선언
  // URL 쿼리 파라미터를 상태에 반영
  useEffect(() => {
    if (!router.isReady) return;

    // URL에서 페이지 번호 처리
    if (pageQuery) {
      const parsedPage = parseInt(pageQuery, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        setCurrentPage(parsedPage);
      }
    }

    // URL에서 검색어 처리
    if (keyword) {
      setSearchQuery(keyword);
    }

    // URL에서 정렬 방식 처리
    if (sort) {
      setSortType(sort);
    }
  }, [router.isReady, pageQuery, keyword, sort]);

  // 디버깅: 데이터 구조 확인
  useEffect(() => {
    if (data) {
      console.log("상품 데이터 수신:", data);
      console.log("총 상품 수:", data.totalCount);
      console.log("현재 페이지:", currentPage);
    }
  }, [data, currentPage]);

  // 다음 페이지 데이터 미리 가져오기
  useEffect(() => {
    if (
      data?.totalCount &&
      currentPage < Math.ceil(data.totalCount / itemsPerPage)
    ) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["products", nextPage, itemsPerPage, sortType, searchQuery],
        queryFn: () =>
          getProducts({
            page: nextPage,
            pageSize: itemsPerPage,
            orderBy: sortType,
            keyword: searchQuery,
          }),
      });
    }
  }, [data, currentPage, itemsPerPage, sortType, searchQuery, queryClient]);

  // 렌더링 부분
  return (
    <Container>
      <Header>
        <Title>상품 목록</Title>
        {isLoggedIn && (
          <Link href="/items/registration" passHref>
            <RegisterButton>상품 등록</RegisterButton>
          </Link>
        )}
      </Header>

      <SearchContainer>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder="상품명 검색"
        />
        <SortDropdown value={sortType} onChange={handleSortChange} />
      </SearchContainer>

      {renderContent()}
    </Container>
  );
};

// styled 컴포넌트 선언
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;

  @media (max-width: 743px) {
    width: 100%;
  }
`;

const RegisterButton = styled.button`
  padding: 8px 16px;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a75cc;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #ef4444;
`;

const ErrorIcon = styled.span`
  margin-right: 8px;
`;

const ErrorText = styled.span`
  margin-right: 16px;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a75cc;
  }
`;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 24px;
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: 60px 0;
  font-size: 16px;
  color: #6b7280;
`;

export default ItemsPage;
