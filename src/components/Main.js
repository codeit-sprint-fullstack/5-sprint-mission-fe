import "../App.css";
import ProductList from "./products/productList.js";
import BestProductList from "./products/BestProductList.js";
import React, { useState } from "react";

function Main() {
  const [sortKey, setSortKey] = useState("latest");

  const handleChangeSort = (e) => {
    setSortKey(e.target.value);
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

        <div>
          <div className="sellProducts">
            <h2>판매 중인 상품</h2>
            <div>
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
            <ProductList sortKey={sortKey} />
          </div>
        </div>

        <div>페이지네이션</div>
      </div>
    </>
  );
}

export default Main;
