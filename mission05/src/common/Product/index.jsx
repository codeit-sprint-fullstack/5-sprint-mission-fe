import { styled } from "styled-components";

export default function Product({ data }) {
  return (
    <CommonProduct>
      <ProductIMG src="" alt="" />
      <ProductContent>
        <Title>{data}</Title>
        <Price>{data}</Price>
      </ProductContent>
    </CommonProduct>
  );
}

const CommonProduct = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductIMG = styled.img`
  width: 100%;
  height: auto;
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
