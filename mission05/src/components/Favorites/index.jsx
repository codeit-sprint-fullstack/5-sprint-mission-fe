import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProductList } from "../../api/productService.js";
import Title from "../../common/Title";
import Product from "../../common/Product";
import { SORT_TYPE } from "../../constants";

const calculateVisibleCount = (width) => {
  if (width > 1200) {
    return 4; // 4열
  } else if (width > 744) {
    return 2; // 2열
  } else {
    return 1; // 1열
  }
};

export default function Favorites() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // 현재 보이는 Product 개수

  // width로 visibleCount 제어
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newCount = calculateVisibleCount(width);
      setVisibleCount(newCount);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize); // 리스너 추가
    return () => window.removeEventListener("resize", handleResize); // 리스너 제거
  }, []);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductList({
          pageSize: visibleCount,
          orderBy: SORT_TYPE.FAVORITE.key,
        });
        setFavoriteList(data.list || []);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <FavoritesWrapper>
      <Title>베스트 상품</Title>
      <ProductGrid>
        {favoriteList.slice(0, visibleCount).map((data, idx) => (
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
  grid-template-columns: repeat(4, 1fr); /* 4열로 설정 */
  gap: 24px; /* 카드 간의 간격 */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* 중간 화면에서는 2열 */
    gap: 10px; /* 카드 간의 간격 */
  }

  @media (max-width: 744px) {
    grid-template-columns: repeat(1, 1fr); /* 작은 화면에서는 1열 */
    gap: 0px; /* 카드 간의 간격 */
  }
`;
