/* eslint-disable react/prop-types */
import { styled } from "styled-components";
import imgDefault from "../../assets/img/mock/img_default.png";
import Likes from "../Likes";

const formatPrice = (price) => {
  return new Intl.NumberFormat("ko-KR").format(price);
};

export default function Product({ data }) {
  const handleImageError = (e) => {
    e.target.src = imgDefault; // 이미지가 깨졌을 때 대체 이미지로 변경
  };

  return (
    <CommonProduct>
      <ProductIMGContainer>
        <ProductIMG
          src={data.images?.[0] || imgDefault} // 안전한 기본값 설정
          alt={data.name || "Product Image"} // 안전한 alt 설정
          onError={handleImageError} // onError 추가
        />
      </ProductIMGContainer>
      <ProductContent>
        <Title>{data.name}</Title>
        <Price>{formatPrice(data.price)}원</Price>
        <Likes favoriteCount={data.favoriteCount} />
      </ProductContent>
    </CommonProduct>
  );
}

const CommonProduct = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductIMGContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 16px;
  position: relative;

  &:hover img {
    transform: scale(1.1); /* 이미지 확대 */
    cursor: pointer;
  }
`;

const ProductIMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease; /* 부드러운 애니메이션 */
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #1f2937;
`;

const Title = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 24px;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: 700;
  line-height: 26px;
`;
