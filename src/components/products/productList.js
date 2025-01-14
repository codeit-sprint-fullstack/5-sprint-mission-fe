import React, { useEffect, useState } from "react";
import "../../App.css";
import heart from "../../assets/ic_heart.png";

function ProductList({ sortKey, page }) {
  const [products, setProducts] = useState([]);

  // page나 sortKey가 바뀔 때마다 데이터 Fetch 및 정렬
  useEffect(() => {
    async function fetchProductsByPage(currentPage) {
      try {
        // 페이지에 따라 데이터 범위 계산 (10개씩)
        const startId = (currentPage - 1) * 10 + 1; // 페이지당 10개
        const endId = currentPage * 10;

        const requests = [];
        for (let i = startId; i <= endId; i++) {
          requests.push(
            fetch(`https://panda-market-api.vercel.app/products/${i}`)
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          );
        }

        const result = await Promise.all(requests);
        // null 제거
        const filtered = result.filter((item) => item !== null);
        // 정렬 수행
        const sorted = sortProducts(filtered, sortKey);

        // 덮어쓰기 방식으로 설정
        setProducts(sorted);
      } catch (error) {
        console.error("Fetching products failed:", error);
      }
    }

    fetchProductsByPage(page); // 현재 페이지에 해당하는 데이터 Fetch
  }, [page, sortKey]);

  // 정렬 로직
  function sortProducts(items, key) {
    const newArr = [...items];
    if (key === "latest") {
      newArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (key === "heart") {
      newArr.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }
    return newArr;
  }

  return (
    <div className="product-container">
      {products.map((product) => {
        const imageUrl =
          product.images && product.images.length
            ? product.images[0]
            : "https://via.placeholder.com/150";

        return (
          <div key={product.id} className="product-item">
            <img className="productImg" src={imageUrl} alt={product.name} />
            <div className="productInfo">
              <h3 className="productName">{product.name}</h3>
              <p className="productPrice">{product.price}원</p>
              <p className="heartBox">
                <img src={heart} alt="heart" />
                &nbsp;&nbsp;{product.favoriteCount}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
