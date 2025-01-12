import React from "react";
import "./item_card.css";

function ItemCard({ imageUrl, name, price, likes, type }) {
  return (
    <div className="item">
      <div
        className={
          type === "best"
            ? "best-item-image-container"
            : "selling-item-image-container"
        }
      >
        <img src={imageUrl} alt={name} className="item-image" />
      </div>
      <p className="name">{name}</p>
      <p className="price">{price}원</p>
      <p className="likes">
        <button className="heart-button"></button> {likes}
      </p>
    </div>
  );
}

export default ItemCard;