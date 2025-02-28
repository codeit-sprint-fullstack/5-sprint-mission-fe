import panda from "../assets/Group 19.png";
import login from "../assets/로그인.png";
import "../App.css";
import loginImg from "../assets/Frame2609463.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav class="headernav">
        <div class="header-nav">
          <div className="nav-container">
            <a>
              <Link to={"/"}>
                <img src={panda} />
              </Link>
            </a>
            <a>자유게시판</a>
            <a>중고마켓</a>
          </div>
          <a href="">
            <picture class="login-img">
              <source
                media="(min-width: 375px) and (max-width: 1199px)"
                srcset={loginImg}
              />
              <img src={login} alt="로그인" />
            </picture>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Nav;
