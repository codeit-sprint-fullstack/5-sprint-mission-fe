import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultiBar from "./MultiBar";
import { useIsMobile, useIsTablet } from "../../components/hooks/useSizes";
import ItemCard from "./ItemCard";
import useItems from "../../components/hooks/useItems";
import Pagination from "../../components/Pagination";

//SearchBar 검색 기능 추가해야함

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  likes: number; // 좋아요 수
  createdAt: string;
  updatedAt: string;
}

const ItemPage: React.FC = () => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  // const [orderBy, setOrderBy] = useState<string>("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(4);
    } else if (isTablet) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(10);
    }
  }, [isMobile, isTablet]);

  const {
    data,
    loading,
    error,
    totalPages,
  }: { data: Product[]; loading: boolean; error: object; totalPages: number } =
    useItems(searchTerm, currentPage, itemsPerPage, "recent") as {
      data: Product[];
      loading: boolean;
      error: object;
      totalPages: number;
    };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // 검색어 상태 업데이트
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log("Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);
  return (
    <div>
      <ItemPageContainer>
        <MultiBar
          isMobile={isMobile}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange} // 검색 핸들러 전달
          setDropDownVisible={setDropDownVisible}
          dropDownVisible={dropDownVisible}
        />
        <ItemListWrapper>
          {data.map((item: Product, index: number) => (
            <ItemCard
              key={`${item.id || `fallback-id-${index}`}-${
                item.name || `fallback-name-${index}`
              }`}
              item={item}
            />
          ))}
        </ItemListWrapper>

        <Pagination
          totalPages={totalPages} // 페이지 수 계산
          currentPage={currentPage} // 현재 페이지를 전달
          onPageChange={handlePageChange}
        />
      </ItemPageContainer>
    </div>
  );
};

export default ItemPage;

const ItemPageContainer = styled.div`
  margin: 0 auto;
  padding: 0 15px;
  /* Desktop */
  @media (min-width: 1200px) {
    width: 70vw;
    margin: 0 auto;
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    margin: 0 26px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    margin: 0 px;
  }
`;

const ItemListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 2.6875rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
