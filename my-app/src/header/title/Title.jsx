import "./title.css";
export function Title({}) {
  return (
    <div id="title">
      <div className="titleImg">
        <img src={"/img/img_panda.png"} alt="panda사진" />
      </div>
      <div className="titleImgMobile">
        <img src={"/img/logo.png"} alt="panda사진" />
      </div>
      <a href="#">자유게시판</a>
      <a href="#">중고마켓</a>
    </div>
  );
}
