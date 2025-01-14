import React, { useState } from "react";
import "../css/BestProducts.css";
import useProductCard from "./useProductCard.jsx";

const BestProducts = () => {
  const { products, loading } = useProductCard({
    pageSize: 4,
    orderBy: "favorite",
  });

  return (
    <div className="best-products">
      <h2 className="best-products-title">베스트 상품</h2>

      {loading ? (
        <p>로딩 중입니다...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                {product.price.toLocaleString()}원
              </p>
              <p className="product-favorite">♡ {product.favoriteCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestProducts;
