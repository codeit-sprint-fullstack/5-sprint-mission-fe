import { styled } from "styled-components";
import Likes from "../Likes";

const formatPrice = (price) => {
  return new Intl.NumberFormat("ko-KR").format(price);
};

export default function Product({ data }) {
  return (
    <CommonProduct>
      <ProductIMG src={data.images[0]} alt={data.name} />
      <ProductContent>
        <Title>{data.name}</Title>
        <Price>{formatPrice(data.price)}원</Price>
        <Likes favoriteCount={data.favoriteCount} />
      </ProductContent>
    </CommonProduct>
  );
}

const CommonProduct = styled.section`
  width: 100%; /* 부모 요소의 너비가 100%인지 확인 */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductIMG = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 16px;
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
