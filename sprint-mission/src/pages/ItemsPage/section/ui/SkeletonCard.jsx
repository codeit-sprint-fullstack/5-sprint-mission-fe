import defaultItem from "../../../../shared/assets/default_item.png";

export function SkeletonCard() {
  return (
    <div className="item-card">
      <img className="item-img" src={defaultItem} alt="로딩중 이미지" />

      <div className="skeleton-card-text">
        <div className="skeleton-name" />
        <div className="skeleton-price" />
        <div className="skeleton-fav" />
      </div>
    </div>
  );
}
