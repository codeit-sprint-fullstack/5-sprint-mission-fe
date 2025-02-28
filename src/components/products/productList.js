import React, { useEffect, useState } from "react";
import "../../App.css";
import heart from "../../assets/ic_heart.png";
import boximg from "../../assets/img_default.png";

function ProductList({ sortKey, page }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = "https://db-1-45k6.onrender.com";

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await fetch(
          `${baseURL}/api/products?page=${page}&limit=10&sort=${sortKey}`
        );

        if (!response.ok) {
          throw new Error("상품 목록을 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, sortKey, baseURL]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-container">
      {products.map((product) => {
        const imageUrl =
          product.images && product.images.length > 0
            ? product.images[0]
            : boximg;

        return (
          <div key={product.id} className="product-item">
            <img className="productImg" src={imageUrl} alt={product.name} />
            <div className="productInfo">
              <h3 className="productName">{product.name}</h3>
              <p className="productPrice">{product.price.toLocaleString()}원</p>
              <p className="heartBox">
                <img src={heart} alt="heart" />
                &nbsp;&nbsp;{product.favoriteCount || 0}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
