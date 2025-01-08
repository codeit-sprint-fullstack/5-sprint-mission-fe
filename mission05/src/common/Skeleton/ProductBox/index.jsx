import styled from "styled-components";
import Skeleton from "./index";

export default function SkeletonProductBox() {
  return (
    <SkeletonWrapper>
      <Skeleton width="100%" height="100%" />
      <ProductContent>
        <Skeleton width="64px" height="24px" />
        <Skeleton width="92px" height="26px" />
        <Skeleton width="42px" height="18px" />
      </ProductContent>
    </SkeletonWrapper>
  );
}

const SkeletonWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #1f2937;
`;
