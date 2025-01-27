import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductList } from "../../../api/Productapi";
import Like from "../../img/Like_Icon.png";

export function BestProduct({ title, page, pageSize, orderBy }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList(page, pageSize, orderBy).then((data) => {
      setProducts(data.list);
    });
  }, [page, pageSize, orderBy]);

  return (
    <>
      <Container>
        <Title>{title}</Title>
        <ProductGrid>
          {Array.isArray(products) &&
            products.map((product) => (
              <ProductCard key={product.id}>
                <CardImage
                  src={product.images}
                  alt={product.name}
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />
                <TextContents>
                  <h4>{product.name}</h4>
                  <h3>{product.price.toLocaleString()}원</h3>

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
  gap: 16px;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 696px;
  }

  @media (max-width: 767px) {
    width: 375px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;

  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 18px;
  }

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProductCard = styled.div`
  width: 282px;
  gap: 16px;
  border-radius: 8px;
  white-space: nowrap;
`;

const CardImage = styled.img`
  width: 282px;
  height: 282px;
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

const LikeContents = styled.div`
  display: flex;
  height: 18px;
  gap: 6px;
`;

const LikeText = styled.text`
  font-size: 12px;
  font-weight: 500;
  color: #4b5563;
`;

const LikeBtnImg = styled.img`
  width: 16px;
  height: 16px;
`;
