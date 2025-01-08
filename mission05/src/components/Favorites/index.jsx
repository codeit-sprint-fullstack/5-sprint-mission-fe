import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProductList } from "../../api/productService.js";
import Title from "../../common/Title";
import Product from "../../common/Product";
import { SORT_TYPE } from "../../constants";
import useDeviceType from "../../hooks/useDeviceType.js";

const PAGE_SIZE_BY_DEVICE_TYPE = {
  PC: 4,
  Tablet: 2,
  Mobile: 1,
};

export default function Favorites() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [pageSize, setPageSize] = useState(4); // 현재 보이는 Product 개수
  const deviceType = useDeviceType();

  // deviceType으로 pageSize 제어
  useEffect(() => {
    const newPageSize = PAGE_SIZE_BY_DEVICE_TYPE[deviceType];
    setPageSize(newPageSize);
  }, [deviceType]);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductList({
          pageSize,
          orderBy: SORT_TYPE.FAVORITE.key,
        });
        setFavoriteList(data?.list || []);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error.message);
      }
    };

    fetchData();
  }, [pageSize]);

  return (
    <FavoritesWrapper>
      <Title>베스트 상품</Title>

      <ProductGrid $pageSize={pageSize}>
        {favoriteList.slice(0, pageSize).map((data, idx) => (
          <Product key={idx} data={data} />
        ))}
      </ProductGrid>
    </FavoritesWrapper>
  );
}

const FavoritesWrapper = styled.section`
  width: 100%;
  max-width: 1200px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 26px;

  @media (max-width: 1200px) {
    margin-top: 24px;
  }

  @media (max-width: 744px) {
    margin-top: 17px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$pageSize}, 1fr);
  gap: 24px;

  @media (max-width: 1200px) {
    gap: 10px;
  }

  @media (max-width: 744px) {
    gap: 5px;
  }
`;
