import React from "react";
import "../css/MarkeHeader.css";
import exampleImage from "../images/Group 19.png";

const MarkeHeader = () => {
  return (
    <header className="header">
      <div className="header-nav">
        <a href="#">
          <img src={exampleImage} alt="Example" />
        </a>
        <nav className="nav">
          <a href="#">자유게시판</a>
          <a href="#">중고마켓</a>
        </nav>
      </div>
      <button>로그인</button>
    </header>
  );
};

export default MarkeHeader;
