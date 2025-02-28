// BestProductList.js
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "./api"; // 위에서 만든 함수
import "../../App.css";
import heart from "../../assets/ic_heart.png";

function BestProductList() {
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllAndPickBest() {
      try {
        const items = await fetchAllProducts();

        items.sort((a, b) => b.favoriteCount - a.favoriteCount);

        // 상위 4개만 추출
        const top4 = items.slice(0, 4);
        setBestProducts(top4);
      } catch (err) {
        console.error("Failed to load all products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAllAndPickBest();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="BestProductListContainer">
      {bestProducts.map((product) => {
        // images가 배열이라고 가정
        const imageUrl =
          product.images && product.images.length
            ? product.images[0]
            : "https://via.placeholder.com/150";

        return (
          <div className="BestItems" key={product.id}>
            <img className="BestImg" src={imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}원</p>
            <p className="heartBox">
              <img src={heart} alt="heart" />
              &nbsp;&nbsp;{product.favoriteCount}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default BestProductList;
