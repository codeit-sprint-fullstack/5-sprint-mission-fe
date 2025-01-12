import React, { useState } from "react";
import "../css/SaleProducts.css";
import useProductCard from "./useProductCard.jsx";

const SaleProducts = () => {
  const [sortOption, setSortOption] = useState("최신순");

  const { products, loading } = useProductCard({
    pageSize: 5,
    orderBy: sortOption === "최신순" ? "recent" : "favorite",
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="sale-products">
      <div className="sale-products-div">
        <h2 className="sale-products-title">판매 중인 상품</h2>
        <div className="search-and-actions">
          <input
            type="text"
            className="search-input"
            placeholder="검색할 상품을 입력해주세요"
          />
          <button className="register-button">상품 등록하기</button>

          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="최신순">최신순</option>
            <option value="좋아요순">좋아요순</option>
          </select>
        </div>
      </div>

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

export default SaleProducts;
