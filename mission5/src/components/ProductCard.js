import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 8px;

  img {
    width: 100%;
    height: auto;
    height: 220px;
    object-fit: cover;
    border-radius: 12px;
  }

  h3 {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0.5rem 0;
  }
`;

const BestCard = styled(Card)`
  img {
    width: 100%;
    height: auto;
    height: 282px;
    object-fit: cover;
  }
`;

export const ProductCard = ({ product }) => {
  const defaultImage = "https://i.imgur.com/uvKK3X0.jpeg";
  return (
    <Card>
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0]
            : defaultImage
        }
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()} 원</p>
      <p>♡ {product.favorite}</p>
    </Card>
  );
};

export const BestProductCard = ({ product }) => {
  const defaultImage = "https://i.imgur.com/uvKK3X0.jpeg";
  return (
    <BestCard>
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0]
            : defaultImage
        }
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()} 원</p>
      <p>♡1123{product.favorite}</p>
    </BestCard>
  );
};

export default ProductCard;
