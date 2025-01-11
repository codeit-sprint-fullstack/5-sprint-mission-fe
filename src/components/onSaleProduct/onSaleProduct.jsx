import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getProductList } from "../../api/Productapi";
import Like from "./img/Like_Icon.png";
import { ProductDropdown } from "./customselect/costomselect";

export function OnSaleProduct({
  title,
  page,
  pageSize,
  orderBy,
  setOrderBy,
  keyword,
  setKeyword,
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList(page, pageSize, orderBy, keyword).then((data) => {
      setProducts(data.list);
    });
  }, [page, pageSize, orderBy, keyword]);

  const handleOrderByChange = (selectedOption) => {
    setOrderBy(selectedOption);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{title}</Title>
          <ProductSelector>
            <ProductFinderInput
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></ProductFinderInput>
            <ProductFinderBtn>상품 등록하기</ProductFinderBtn>
            <ProductDropdown
              orderBy={orderBy}
              setOrderBy={handleOrderByChange}
            />
          </ProductSelector>
        </Header>

        <ProductGrid>
          {Array.isArray(products) &&
            products.map((product) => (
              <ProductCard key={product.id}>
                <CardImage
                  src={product.images}
                  alt={product.name}
                  width="100%"
                />
                <TextContents>
                  <h3>{product.name}</h3>
                  <p>{product.price.toLocaleString()}원</p>
                  <LikeContents>
                    <LikeBtnImg src={Like} alt="like btn" />
                    <LikeText>{product.favoriteCount}</LikeText>
                  </LikeContents>
                </TextContents>
              </ProductCard>
            ))}
        </ProductGrid>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  @media (min-width: 768px) and (max-width: 1023px) {
    
    width: 696px;
  }

  @media (max-width: 344px) {
  (max-width: 767px) {
    flex-direction: column; 
    align-items: flex-start; 
    
    width: 375px;
  }
`;

const Header = styled.div`
width 100%;
  display: flex;
  justify-content: space-between;
  align-items:center;
    @media (min-width: 768px) and (max-width: 1023px){
    gap:120px;
    width: 70%;
  }

  @media (max-width: 767px) {
  position:relative;
  padding-bottom: 40px;
  gap: 70px;
    width: 50%;

  
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  color: #111827;
  white-space: nowrap;
  left: 0px;
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 18px;
  }

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const ProductFinderInput = styled.input`
  width: 325px;
  height: 42px;
  border: none;
  border-radius: 12px;
  padding: 9px 16px;
  gap: 10px;
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
  background-color: #f3f4f6;
  &: focus;
  outline: none;
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 162.5px;
    font-size: 10px;
  }

  @media (max-width: 767px) {
    font-size: 10px;
    width: 288px;
    position: absolute;

    left: 0px;
    bottom: -5px;
  }
`;

const ProductFinderBtn = styled.button`
display: flex;
justify-content: center;
align-items: center;
  padding: 8px 23px;
  border-radius: 8px;
  background-color: #3692ff;
  font-size: 16px;
  font-weight: 600;
  color: #F3F4F6;
  text-decoration: none;
  white-space: nowrap;
  border : none;
&:hover 
  cursor: pointer;
    @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    padding: 3px 10px;
    width: 133px;
  }

  @media (max-width: 767px) {
  font-size: 12px;
     width: 120px;
    padding: 10px 0;
`;

const ProductSelector = styled.div`
  display: flex;
  gap: 8px; 

  @media (max-width: 767px) {
    
    width: 100%; 
    gap: 8px;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const CardImage = styled.img`
  width: 221px;
  height: 221px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 1024px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }
`;

const TextContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductCard = styled.div`
  border: none;
  border-radius: 8px;
`;

const LikeContents = styled.div`
  display: flex;
  align-items: center;
  height: 18px;
  gap: 6px;
`;

const LikeText = styled.text`
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
`;

const LikeBtnImg = styled.img`
  width: 16px;
  height: 16px;
`;
