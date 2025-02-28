import React, { useState } from "react";
import "../App.css";
import ProductList from "./products/productList.js";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import serachImg from "../assets/Vector.png";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import dropImg from "../assets/btn_sort.png";

function Items() {
  const [sortKey, setSortKey] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const paginationGroupSize = 5;

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleChangeSort = (e) => {
    setSortKey(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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
      <Nav />
      <div className="mainContainer">
        <div className="ProductListContainer">
          <div className="sellProducts">
            <h2 className="ProductTitleName">판매 중인 상품</h2>
            <div className="productListSearchContainer">
              <div className="productListSearch">
                <img src={serachImg} alt="search-icon" />
                <div>검색할 상품을 입력해주세요</div>
              </div>
              <div
                className="productListPutIn"
                onClick={() => navigate("/registration")}
              >
                상품 등록하기
              </div>
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

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

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

          <button className="pagination-btn" onClick={handleNextPage}>
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Items;
