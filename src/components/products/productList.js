import React, { useEffect, useState } from "react";
import "../../App.css";
import heart from "../../assets/ic_heart.png";

function ProductList({ sortKey }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // 페이지 (1부터 시작)

  // page나 sortKey가 바뀔 때마다 데이터 새로 Fetch + 정렬
  useEffect(() => {
    async function fetchProductsByPage(currentPage) {
      try {
        // page=1 → ID 1~10, page=2 → 11~20, ...
        const startId = (currentPage - 1) * 10 + 1;
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
        // null 제외
        const filtered = result.filter((item) => item !== null);
        // 정렬 수행
        const sorted = sortProducts(filtered, sortKey);

        // 이번 예제에서는 "이전 목록에 추가"가 아니라 "덮어쓰기"라고 가정
        setProducts(sorted);
      } catch (error) {
        console.error("Fetching products failed:", error);
      }
    }

    fetchProductsByPage(page);
  }, [page, sortKey]);

  // 정렬 로직
  function sortProducts(items, key) {
    const newArr = [...items];
    if (key === "latest") {
      // createdAt 최신순(내림차순)
      newArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (key === "heart") {
      // 좋아요순(내림차순)
      newArr.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }
    return newArr;
  }

  // "더 보기" 버튼: page 증가 -> 새 fetch -> 새 10개만 렌더링(덮어쓰기)
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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

      {/* 더 보기 버튼 */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleLoadMore}>더 보기</button>
      </div>
    </div>
  );
}

export default ProductList;
