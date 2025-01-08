import favHeart from "../../../../shared/assets/favorite_heart.png";

export function ItemCard({ product }) {
  const {
    images: [productImg], //반환된 배열에서 첫번째 링크 대표 이미지로 사용
    name: productName,
    price: productPrice,
    favoriteCount: productFavCount,
  } = product;

  return (
    <div className="item-card">
      <img className="item-img" src={productImg} alt="대표 이미지" />

      <div className="item-card-text">
        <p className="product-name">{productName}</p>
        <p className="product-price">{productPrice}</p>
        <div className="fav-count-box">
          <img className="fav-heart-icon" src={favHeart} alt="좋아요 아이콘" />
          <p className="product-fav-count">{productFavCount}</p>
        </div>
      </div>
    </div>
  );
}
