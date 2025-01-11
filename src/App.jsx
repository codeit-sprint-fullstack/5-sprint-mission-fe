import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Pagination } from "./components/pagination/pagination";
import { BestProduct } from "./components/bestProduct/bestproduct";
import { OnSaleProduct } from "./components/onSaleProduct/onSaleProduct";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bestPageSize, setBestPageSize] = useState(4);
  const [onSalepageSize, setOnSalePageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setBestPageSize(4);
      setOnSalePageSize(10);
    } else if (window.innerWidth >= 768) {
      setBestPageSize(2);
      setOnSalePageSize(6);
    } else {
      setBestPageSize(1);
      setOnSalePageSize(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Container>
        <Header
          freeBoard="자유 게시판"
          usedMarket="중고마켓"
          loginBtn="로그인"
        />
        <ProductList>
          <BestProduct
            title="베스트 상품"
            offset={1}
            pageSize={bestPageSize}
            orderBy="favorite"
          />

          <OnSaleProduct
            title="판매 중인 상품"
            page={currentPage}
            pageSize={onSalepageSize}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(100 / onSalepageSize)}
            onPageChange={handlePageChange}
          />
        </ProductList>

        <Footer source="@codeit-2024" policy="Privacy Policy" faq="FAQ" />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1455px;
  padding: 94px 360px 0px;
  gap: 40px;

  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 94px 24px 0px;
    height: 1342px;
  }

  @media (max-width: 767px) {
    padding: 94px 0px 0px;
    height: 1254px;
  }
`;
