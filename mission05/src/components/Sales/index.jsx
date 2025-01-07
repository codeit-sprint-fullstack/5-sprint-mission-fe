import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProductList } from "../../api/productService.js";
import Title from "../../common/Title";
import Button from "../../common/Button";
import { SORT_TYPE } from "../../constants";
import Filter from "../../common/Filter";
import Search from "../../common/Search";
import Product from "../../common/Product";
import Pagination from "../Pagination";

const calculatePageSize = (width) => {
  if (width > 1200) {
    return 10;
  } else if (width > 744) {
    return 6;
  } else {
    return 4;
  }
};

const initPageSize = calculatePageSize(window.innerWidth);

export default function Sales() {
  const [sortType, setSortType] = useState(SORT_TYPE.RECENT);
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initPageSize); // 현재 보이는 Product 개수

  // width로 pageSize 제어
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newCount = calculatePageSize(width);
      setPageSize(newCount);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize); // 리스너 추가
    return () => window.removeEventListener("resize", handleResize); // 리스너 제거
  }, []);

  // fetch data
  useEffect(() => {
    console.log("keyword: ", keyword);
    const fetchData = async () => {
      try {
        const data = await getProductList({
          page,
          pageSize,
          orderBy: sortType.key,
          keyword,
        });
        setProductList(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error.message);
      }
    };

    fetchData();
  }, [sortType, page, keyword]);

  return (
    <section>
      <SalesHeader>
        <Title>판매 중인 상품</Title>
        <Right>
          <Search setKeyword={setKeyword}>검색할 상품을 입력해주세요</Search>
          <Button>상품 등록하기</Button>
          <Filter sortType={sortType} setSortType={setSortType} />
        </Right>
      </SalesHeader>

      <ProductGrid>
        {productList.slice(0, pageSize).map((data, idx) => (
          <Product key={idx} data={data} />
        ))}
      </ProductGrid>

      <PaginationWrapper>
        <Pagination
          count={Math.floor(totalCount / pageSize)}
          page={page}
          setPage={setPage}
        />
      </PaginationWrapper>
    </section>
  );
}

const SalesHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  align-items: center;
  justify-content: space-between;

  @media (max-width: 744px) {
    justify-content: flex-start;
    gap: 12px; /* 요소 간 간격 조정 */
  }
`;

const Right = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  max-width: 100%; /* 부모 크기를 초과하지 않도록 제한 */

  @media (max-width: 744px) {
    width: 100%; /* 화면 크기에 맞게 확장 */
    justify-content: flex-start;

    & > button {
      order: 1; /* Button이 Title 옆으로 */
      margin-left: auto; /* Title 옆으로 이동 */
    }
    & > div:first-child {
      order: 2; /* Search가 두 번째 줄 첫 번째로 배치 */
      flex: 1; /* Search가 가능한 한 넓게 차지 */
    }
    & > div:last-child {
      order: 3; /* Filter가 Search 옆으로 배치 */
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5열
  grid-template-rows: repeat(2, 1fr); // 2행
  gap: 24px; /* 카드 간의 간격 */

  margin-top: 24px;
  margin-bottom: 43px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 중간 화면에서는 2열 */
    grid-template-rows: repeat(2, 1fr); // 2행
    gap: 16px; /* 카드 간의 간격 */

    margin-bottom: 40px;
  }

  @media (max-width: 744px) {
    grid-template-columns: repeat(2, 1fr); /* 작은 화면에서는 1열 */
    grid-template-rows: repeat(2, 1fr); // 2행
    gap: 8px; /* 카드 간의 간격 */

    margin-top: 16px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
