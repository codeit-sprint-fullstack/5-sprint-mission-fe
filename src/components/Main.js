import React, { useState } from "react";
import "../App.css";
import ProductList from "./products/productList.js";
import BestProductList from "./products/BestProductList.js";
import serachImg from "../assets/Vector.png";

function Main() {
  const [sortKey, setSortKey] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const paginationGroupSize = 5; // 페이지네이션 그룹 크기

  const handleChangeSort = (e) => {
    setSortKey(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
  };

  const getPaginationGroup = () => {
    const firstPageInGroup =
      Math.floor((currentPage - 1) / paginationGroupSize) *
        paginationGroupSize +
      1;
    return Array.from(
      { length: paginationGroupSize },
      (_, i) => firstPageInGroup + i
    );
  };

  return (
    <>
      <div className="mainContainer">
        <div className="bestMainContainer">
          <h2>베스트 상품</h2>
        </div>

        <div className="BestProductList">
          <BestProductList />
        </div>

        <div className="ProductListContainer">
          <div className="sellProducts">
            <h2>판매 중인 상품</h2>
            <div className="productListSearchContainer">
              <div className="productListSearch">
                <img src={serachImg} />
                <div>검색할 상품을 입력해주세요</div>
              </div>
              <div className="productListPutIn">상품 등록하기</div>
              <div>
                <select
                  className="dropdown"
                  value={sortKey}
                  onChange={handleChangeSort}
                >
                  <option value="latest">최신순</option>
                  <option value="heart">좋아요순</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <ProductList sortKey={sortKey} page={currentPage} />
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          {/* 이전 화살표 */}
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {/* 페이지네이션 번호 */}
          {getPaginationGroup().map((page) => (
            <button
              key={page}
              className={`pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          {/* 다음 화살표 */}
          <button className="pagination-btn" onClick={handleNextPage}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;
