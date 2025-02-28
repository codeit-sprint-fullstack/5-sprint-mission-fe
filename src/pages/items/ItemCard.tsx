import React from "react";
import styled from "styled-components";
import defaultImg from "../../assets/images/img_default.png";
import likeHeart from "../../assets/images/like.png";

const ItemCard = ({ item }) => {
  if (!item) {
    return null;
  }

  const { images, name, price, favoriteCount } = item;
  // console.log("Images:", images); //images 배열 확인

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = defaultImg;
  };

  return (
    <CardWrapper>
      <Image
        src={images && images.length > 0 ? item.images[0] : defaultImg}
        alt={name || "No Image"}
        onError={handleError}
      />
      <InfoWrapper>
        <ItemName>{name}</ItemName>
        <Price>{price.toLocaleString("ko-KR")}원</Price>
        <LikeWrapper>
          <LikeIcon src={likeHeart} alt="Like Count" />
          <LikeCount>{favoriteCount}</LikeCount>
        </LikeWrapper>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ItemCard;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media (max-width: 768px) {
    padding-top: 30px;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #4b5563; // gray-800
`;

const ItemName = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const Price = styled.h3`
  font-size: 1rem;
  font-weight: 700;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  gap: 6px;
  margin-bottom: 10px;
`;

const LikeIcon = styled.img`
  width: auto;
  height: 16px;
`;

const LikeCount = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280; // gray-600
`;
