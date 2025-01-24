import "./title.css";
import { Link } from "react-router-dom";
export function Title() {
  return (
    <div id="title">
      <div className="titleImg">
        <Link to={"/"}>
          <img src={"/img/img_panda.png"} alt="panda사진" />
        </Link>
      </div>
      <div className="titleImgMobile">
        <Link to={"/"}>
          <img src={"/img/logo.png"} alt="panda사진" />
        </Link>
      </div>
      <a href="#">자유게시판</a>
      <a href="#">중고마켓</a>
    </div>
  );
}
