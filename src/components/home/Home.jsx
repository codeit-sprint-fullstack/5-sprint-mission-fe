import { Link } from "react-router-dom";
import "./home.css";

export function Home() {
  return (
    <div className="main">
      <header id="header_top">
        <div id="header_top_img">
          <a href="/">
            <div id="panda_img"></div>
          </a>
        </div>
        <div id="header_top_btn">
          <a href="login/">로그인</a>
        </div>
      </header>
      {/* <!-- 상단 이미지 --> */}
      <nav id="nav">
        <div id="nav_contents">
          <div id="nav_top">
            <div id="nav_top_text_box">
              <p className="nav_top_text_box_p">일상의 모든 물건을</p>
              <p className="nav_top_text_box_p">거래해 보세요</p>
            </div>
            <Link id="nav_top_text_btn" to="/item">
              <div>구경하러 가기</div>
            </Link>
          </div>
          <img id="nav_bottom_img" src="/img/Img_home_top.png" alt="" />
        </div>
      </nav>
      {/* <!-- 중간 머시기 --> */}
      <section id="middle_part">
        {/* <!-- 1번째 섹션 --> */}
        <div className="middle_part_section">
          <div className="middle_part_section_box">
            <img id="section_1_img" src="/img/Img_home_01.png" alt="" />
            <div id="section_1_text">
              <p>Hot item</p>
              <p>
                인기 상품을
                <br />
                확인해 보세요
              </p>
              <p>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
        {/* <!-- 2번째 섹션 --> */}
        <div className="middle_part_section">
          <div
            id="middle_part_section_box_reverse"
            className="middle_part_section_box"
          >
            <img id="section_2_img" src="/img/Img_home_02.png" alt="" />
            <div id="section_2_text">
              <p>Search</p>
              <p>
                구매를 원하는
                <br />
                상품을 검색하세요
              </p>
              <p>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
        </div>
        {/* <!-- 3번째 섹션 --> */}
        <div className="middle_part_section">
          <div className="middle_part_section_box">
            <img id="section_3_img" src="/img/Img_home_03.png" alt="" />
            <div id="section_3_text">
              <p>Register</p>
              <p>
                판매를 원하는
                <br />
                상품을 등록하세요
              </p>
              <p>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 푸터 --> */}
      <footer>
        <div id="footer_top">
          <div id="footer_top_max">
            <div id="footer_top_text">
              <p>
                믿을 수 있는
                <br />
                판다마켓 중고거래
              </p>
            </div>
            <img id="footer_top_img" src="/img/Img_home_bottom.png" alt="" />
          </div>
        </div>
        <div id="footer_bottom">
          <div id="footer_bottom_contents">
            <div id="footer_copyright">
              <p>©codeit - 2024</p>
            </div>
            <div id="footer_faq">
              <a href="privacy/">
                <p>Privacy Policy</p>
              </a>
              <a href="faq/">
                <p>FAQ</p>
              </a>
            </div>
            <div id="footer_ad">
              <a target="_blank" href="https://www.facebook.com/">
                <address id="facebook"></address>
              </a>
              <a target="_blank" href="https://x.com/">
                <address id="twitter"></address>
              </a>
              <a target="_blank" href="https://www.youtube.com/">
                <address id="yotube"></address>
              </a>
              <a target="_blank" href="https://www.instagram.com/">
                <address id="instagram"></address>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
