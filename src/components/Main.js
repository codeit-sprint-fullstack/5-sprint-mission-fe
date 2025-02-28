import Footer from "./Footer";
import "./Main.css";
import React from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/mainimg/로그인.png";
import pandaLogo from "../assets/mainimg/Group 19.png";
import homeImg from "../assets/mainimg/Img_home_top.png";
import hotImg from "../assets/mainimg/인기상품.png";
import searchImg from "../assets/mainimg/서치.png";
import registerImg from "../assets/mainimg/판다마켓.png";
import bttomImg from "../assets/mainimg/Img_home_bottom.png";
import Nav from "./Nav";

function Main() {
  return (
    <>
      <nav className="headernav">
        <div className="header-nav">
          <a>
            <img src={pandaLogo} alt="로고" />
          </a>
          <a href="./login/login.html">
            <img className="login-img" src={loginImg} alt="로그인" />
          </a>
        </div>
      </nav>

      <div className="top">
        <div className="buy-anything">
          <div className="do-buy">
            <div className="do-trade">
              일상의 모든 물건을
              <br /> 거래해 보세요
            </div>
            <Link to="/items">
              <div className="do-show">구경하러 가기</div>
            </Link>
          </div>
          <div>
            <img className="div1" src={homeImg} alt="홈 이미지" />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="brand-leader">
          <div className="brand-row" style={{ backgroundColor: "#fcfcfc" }}>
            <div>
              <img className="leader-img" src={hotImg} alt="인기 상품" />
            </div>
            <div className="leader-detail">
              <p className="detail-1">Hot item</p>
              <p className="detail-2">
                인기 상품을
                <br />
                확인해 보세요
              </p>
              <p className="Medium-font detail-3">
                가장 HOT한 중고거래 물품을
                <br /> 판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="want-product">
          <div className="want-search" style={{ backgroundColor: "#fcfcfc" }}>
            <div className="search-detail">
              <p className="search-detail-1">Search</p>
              <p className="search-detail-2">
                구매를 원하는
                <br />
                상품을 검색하세요
              </p>
              <p className="search-detail-3">
                구매하고 싶은 물품은 검색해서
                <br /> 쉽게 찾아보세요
              </p>
            </div>
            <div>
              <img className="search-img" src={searchImg} alt="검색 이미지" />
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="want-sales">
          <div className="sales-row" style={{ backgroundColor: "#fcfcfc" }}>
            <div>
              <img className="sales-image" src={registerImg} alt="판다 마켓" />
            </div>
            <div className="sales-detail">
              <p className="sales-detail-1">Register</p>
              <p className="sales-detail-2">
                판매를 원하는
                <br />
                상품을 등록하세요
              </p>
              <p className="sales-detail-3">
                어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="trust-pandamarket">
          <div className="trust-panda">
            <div className="get-trust">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </div>
          </div>
          <div>
            <img className="div2" src={bttomImg} alt="하단 이미지" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
