import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProductFavorite } from "@/services/productService";
import { hasToken } from "@/services/authService";
import { useRouter } from "next/router";

/**
 * 상품 카드 컴포넌트
 */
const ProductCard = ({ product }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isLoggedIn = hasToken();

  console.log("ProductCard에 전달된 product:", product);

  // product가 없는 경우 빈 컴포넌트 반환
  if (!product) {
    console.error("ProductCard: product 객체가 없음");
    return <EmptyCard>상품 정보가 없습니다</EmptyCard>;
  }

  // 데이터 구조 안전하게 접근
  const productId = product.id || product._id || "";
  const productName = product.name || product.title || "제목 없음";
  const productPrice = product.price || 0;
  const productImage =
    product.thumbnail ||
    product.image ||
    product.images?.[0] ||
    "/img_default.svg";
  const createdAt =
    product.createdAt ||
    product.created_at ||
    product.date ||
    new Date().toISOString();
  const isFavorite = !!product.isFavorite;
  const favoriteCount = product.favoriteCount || product.likes || 0;

  // 로그로 확인
  console.log("상품 카드 데이터:", {
    productId,
    productName,
    productPrice,
    productImage,
    createdAt,
    isFavorite,
    favoriteCount,
  });

  // 좋아요 토글 뮤테이션
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: () => toggleProductFavorite(productId, !isFavorite),
    onSuccess: () => {
      // 상품 목록 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("좋아요 토글 실패:", error);
    },
  });

  // 좋아요 버튼 클릭 핸들러
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // 링크 이동 방지
    e.stopPropagation(); // 이벤트 버블링 방지

    if (!isLoggedIn) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      router.push("/login");
      return;
    }

    toggleFavorite();
  };

  // 상품 카드 클릭 핸들러
  const handleCardClick = (e) => {
    e.preventDefault();
    if (!productId) {
      console.error("상품 ID가 없어 상세 페이지로 이동할 수 없습니다.");
      return;
    }
    router.push(`/items/${productId}`);
  };

  // 이미지 오류 처리 함수
  const handleImageError = (e) => {
    console.log("이미지 로딩 실패, 기본 이미지로 대체");
    // 이미 기본 이미지인 경우 더 이상 대체하지 않음
    if (e.target.src.includes("img_default.svg")) {
      e.target.onerror = null; // 무한 루프 방지
      return;
    }
    e.target.onerror = null; // 무한 루프 방지
    e.target.src = "/img_default.svg";
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <ImageContainer>
        <ProductImage
          src={productImage}
          alt={productName}
          onError={handleImageError}
        />
      </ImageContainer>
      <ProductName title={productName}>{productName}</ProductName>
      <ProductPrice>{Number(productPrice).toLocaleString()}원</ProductPrice>
      <CardFooter>
        <FavoriteButton onClick={handleFavoriteClick} isFavorite={isFavorite}>
          {isFavorite ? "❤️" : "🤍"} {favoriteCount}
        </FavoriteButton>
        <ProductDate>{new Date(createdAt).toLocaleDateString()}</ProductDate>
      </CardFooter>
    </CardContainer>
  );
};

// 카드 컨테이너 스타일
const CardContainer = styled.div`
  display: block;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

// 이미지 컨테이너 스타일
const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* 1:1 비율 유지 */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f3f4f6;
`;

// 상품 이미지 스타일
const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 상품명 스타일
const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  margin: 12px 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 상품 가격 스타일
const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px;
`;

// 카드 푸터 스타일
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 좋아요 버튼 스타일
const FavoriteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: ${(props) => (props.isFavorite ? "#ef4444" : "#6b7280")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

// 상품 등록일 스타일
const ProductDate = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

// 빈 카드 스타일
const EmptyCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f3f4f6;
  border-radius: 8px;
  color: #6b7280;
  font-size: 14px;
`;

export default ProductCard;
