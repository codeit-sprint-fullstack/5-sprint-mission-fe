import { useState, useEffect } from "react";
import { ProductDropdown } from "./SellProductDropdown";
import { SellProductGet } from "./SellProductGet";
import IconSearch from "../../Assets/Ic_Search.png";
import "./Product.css";

export function SellProduct() {
  const [keyword, setKeyword] = useState(""); // 검색어를 상태로 관리
  const [searchKeyword, setSearchKeyword] = useState(""); //엔터키로 설정될 검색어 상태 관리
  const [orderBy, setOrderBy] = useState("recent"); //orderBy 상태관리

  useEffect(() => {
    console.log("유즈이펙트 현재 orderBy 값:", orderBy); // orderBy 값이 변경될 때마다 출력
  }, [orderBy]); // orderBy 상태가 변경될 때마다 실행

  /*input값을 api 요청하는 데에 필요함*/
  // input 값 변경 핸들러
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchKeyword(keyword);
    }
  };
  /*여기까지!*/
  /*dropdown값을 api 요청하는 데에 필요함*/
  const handleOrderChange = (newOrder) => {
    console.log("드롭다운에서 선택된 값 확인용", newOrder);
    setOrderBy(newOrder);
  };
  console.log("현재 orderBy값 확인용", orderBy);
  /*여기까지!*/
  return (
    <div className="SellProductArea">
      <div className="titleLineSellProduct">
        <div className="titleSellProduct">판매 중인 상품</div>
        <div className="titleSearch">
          <img className="SearchIconImg" src={IconSearch} alt="Search Icon" />
          <input
            className="SearchSellProductInput"
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown}
            placeholder="검색할 상품을 입력해주세요"
          ></input>
        </div>
        <button className="signupSellProductBtn">상품 등록하기</button>
        <ProductDropdown onOrderChange={handleOrderChange} />
      </div>
      <SellProductGet keyword={searchKeyword} orderBy={orderBy} />
    </div>
  );
}
