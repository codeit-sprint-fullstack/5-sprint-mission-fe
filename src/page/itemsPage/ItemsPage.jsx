import React, { useState, useEffect } from "react";
import { OnSaleProduct } from "../onSaleProduct/OnSaleProduct";
import { Header } from "../header/header";
import { Footer } from "../../components/Share/footer/footer";

const ItemsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");

  return (
    <div className="h-screen flex flex-col">
      <Header loginBtn="로그인" />
      <div className="flex-grow">
        <OnSaleProduct
          title="판매 중인 상품"
          page={currentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          keyword={keyword}
          setKeyword={setKeyword}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ItemsPage;
