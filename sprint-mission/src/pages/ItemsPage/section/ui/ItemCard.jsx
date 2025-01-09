import { Link } from "react-router-dom";
import favHeart from "../../../../shared/assets/favorite_heart.png";
import defaultItem from "../../../../shared/assets/default_item.png";
import { CardImg } from "../../../../shared/ui/CardImg";
import { Typo, typoStyles } from "../../../../shared/Typo/Typo";

export function ItemCard({ product }) {
  const {
    images: [productImg], //반환된 배열에서 첫번째 링크 대표 이미지로 사용
    name: productName,
    price: productPrice,
    favoriteCount: productFavCount,
  } = product;

  const formattedPrice = `${new Intl.NumberFormat("ko-KR").format(
    productPrice
  )}원`;

  return (
    //TODO: 나중에 카드 클릭하면 각 상품 상세페이지로 이동하도록 링크 수정
    <Link className="item-card" to="/">
      <CardImg
        className="item-img"
        src={productImg}
        defaultImg={defaultItem}
        alt="대표 이미지"
      />

      <div className="item-card-text">
        <Typo className={typoStyles.textMdMedium} content={productName} />
        <Typo className={typoStyles.textLgBold} content={formattedPrice} />
        <div className="fav-count-box">
          <img className="fav-heart-icon" src={favHeart} alt="좋아요 아이콘" />
          <Typo
            className={`${typoStyles.textXsMedium} fav-count`}
            content={productFavCount}
          />
        </div>
      </div>
    </Link>
  );
}
