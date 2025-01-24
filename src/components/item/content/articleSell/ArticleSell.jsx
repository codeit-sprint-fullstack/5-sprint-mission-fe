import { ArticleSellDropDown } from "./articleSellDropDown/ArticleSellDropDown.jsx";
import { Link } from "react-router-dom";
import "./articleSell.css";
export function ArticleSell({ info, selectedOption, setSelectedOption }) {
  if (info === undefined) {
    return <div>로딩중</div>;
  }
  return (
    <div id="articleSell">
      <div id="articleSellHeader">
        <p>판매 중인 상품</p>
        <div id="articleSellHeaderAbilityBox">
          <div id="articleSellHeaderAbilityBoxRegistration">
            <img src="/img/ic_search.png" alt="" />
            <input type="text" placeholder="검색할 상품을 입력해주세요" />
          </div>
          <Link to="/register">
            <button id="articleSellHeaderAbilityBoxBtn">상품 등록하기</button>
          </Link>
          <ArticleSellDropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div>
      <div id="articleSellHeaderMobile">
        <div className="articleSellHeaderMobileBox">
          <p>판매 중인 상품</p>
          <Link to="/register">
            <button id="articleSellHeaderAbilityBoxBtn">상품 등록하기</button>
          </Link>
        </div>
        <div id="articleSellHeaderAbilityBox">
          <div id="articleSellHeaderAbilityBoxRegistration">
            <img src="/img/ic_search.png" alt="" />
            <input type="text" placeholder="검색할 상품을 입력해주세요" />
          </div>
          <ArticleSellDropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div>
      <div id="articleSellBox">
        {info.map((item, index) => {
          if (item.img === "basic") {
            item.img = "/img/img_default.png";
          }
          return (
            <div className="articleSellBoxContents">
              <div
                className="articleSellProductImg"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
              <p className="articleSellProductName">{item.name}</p>
              <p className="articleSellProductPrice">{item.price}원</p>
              <div className="heartBox">
                <img src={"/img/ic_heart.png"} alt="" />
                <p>{item.like}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
