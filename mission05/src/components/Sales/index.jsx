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
import useDeviceType from "../../hooks/useDeviceType.js";

const PAGE_SIZE_BY_DEVICE_TYPE = {
  PC: 10,
  Tablet: 6,
  Mobile: 4,
};

export default function Sales() {
  const [sortType, setSortType] = useState(SORT_TYPE.RECENT);
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
  }, [sortType, page, keyword, pageSize]);

  return (
    <section>
      <SalesHeader>
        <TitleGrid>
          <Title>판매 중인 상품</Title>
        </TitleGrid>
        <SearchGrid>
          <Search setKeyword={setKeyword}>검색할 상품을 입력해주세요</Search>
        </SearchGrid>
        <ButtonGrid>
          <Button>상품 등록하기</Button>
        </ButtonGrid>
        <FilterGrid>
          <Filter sortType={sortType} setSortType={setSortType} />
        </FilterGrid>
      </SalesHeader>

      <ProductGrid $pageSize={pageSize}>
        {productList.slice(0, pageSize).map((data, idx) => (
          <Product key={idx} data={data} />
        ))}
      </ProductGrid>

      <PaginationWrapper>
        <Pagination
          endPageIndex={Math.ceil(totalCount / pageSize)}
          page={page}
          keyword={keyword}
          setPage={setPage}
        />
      </PaginationWrapper>
    </section>
  );
}

const SalesHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 12px;
  align-items: center;

  @media (max-width: 744px) {
    grid-template-columns: 1fr auto auto;
    grid-template-areas:
      "title button button"
      "search search filter";
  }
`;

const TitleGrid = styled.div`
  grid-column: 1 / 2;

  @media (max-width: 744px) {
    grid-area: title;
  }
`;

const SearchGrid = styled.div`
  grid-column: 3 / 4;

  @media (max-width: 744px) {
    grid-area: search;
  }
`;

const ButtonGrid = styled.div`
  grid-column: 4 / 5;

  @media (max-width: 744px) {
    grid-area: button;
  }
`;

const FilterGrid = styled.div`
  grid-column: 5 / 6;

  @media (max-width: 744px) {
    grid-area: filter;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$pageSize / 2}, 1fr); // 5열
  grid-template-rows: repeat(2, 1fr); // 2행
  gap: 24px; /* 카드 간의 간격 */

  margin-top: 24px;
  margin-bottom: 43px;

  @media (max-width: 1200px) {
    gap: 16px; /* 카드 간의 간격 */
    margin-bottom: 40px;
  }

  @media (max-width: 744px) {
    gap: 8px; /* 카드 간의 간격 */
    margin-top: 16px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
