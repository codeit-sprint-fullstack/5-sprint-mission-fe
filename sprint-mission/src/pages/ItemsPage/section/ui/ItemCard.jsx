import { Link } from "react-router-dom";
import favHeart from "../../../../shared/assets/favorite_heart.png";

export function ItemCard({ product }) {
  const {
    images: [productImg], //반환된 배열에서 첫번째 링크 대표 이미지로 사용
    name: productName,
    price: productPrice,
    favoriteCount: productFavCount,
  } = product;

  return (
    //TODO: 나중에 카드 클릭하면 각 상품 상세페이지로 이동하도록 링크 수정
    <Link className="item-card" to="/">
      <img className="item-img" src={productImg} alt="대표 이미지" />

      <div className="item-card-text">
        <p className="product-name">{productName}</p>
        <p className="product-price">
          {new Intl.NumberFormat("ko-KR").format(productPrice)}원
        </p>
        <div className="fav-count-box">
          <img className="fav-heart-icon" src={favHeart} alt="좋아요 아이콘" />
          <p className="product-fav-count">{productFavCount}</p>
        </div>
      </div>
    </Link>
  );
}
