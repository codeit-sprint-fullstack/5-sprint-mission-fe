import React from "react";
import styled from "@emotion/styled";
import ProductCard from "./ProductCard";

/**
 * 상품 목록 컴포넌트
 */
const ProductList = ({ products, currentPage, itemsPerPage }) => {
  // 상품 목록이 없거나 빈 배열인 경우
  if (!products || products.length === 0) {
    return <EmptyMessage>표시할 상품이 없습니다.</EmptyMessage>;
  }

  return (
    <ProductGrid>
      {products.map((product, index) => (
        <ProductCard
          key={product.id || product._id || index}
          product={product}
        />
      ))}
    </ProductGrid>
  );
};

// 반응형 상품 그리드 스타일
const ProductGrid = styled.div`
  display: grid;
  gap: 24px;

  /* 1199px 이상: 5열 */
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1199px) and (min-width: 744px) {
    /* 744px~1199px: 3열 */
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 743px) {
    /* 743px 이하: 2열 */
    grid-template-columns: repeat(2, 1fr);
  }
`;

// 빈 상품 목록 메시지 스타일
const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 16px;
  color: #6b7280;
`;

export default ProductList;
