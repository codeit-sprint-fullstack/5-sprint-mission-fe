import panda from "../assets/Group 19.png";
import login from "../assets/로그인.png";
import "./Nav.css";

function Nav() {
  return (
    <>
      <nav class="headernav">
        <div class="header-nav">
          <div className="nav-container">
            <a>
              <img src={panda} />
            </a>
            <a>자유게시판</a>
            <a>중고마켓</a>
          </div>
          <a href="./login/login.html">
            <img class="login-img" src={login} />
          </a>
        </div>
      </nav>
    </>
  );
}

export default Nav;
