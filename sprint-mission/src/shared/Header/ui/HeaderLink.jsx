import { Link } from "react-router-dom";
import { useMediaQuery } from "../../hooks/mediaQueryHook";
import { Typo, typoStyles } from "../../Typo/Typo";
import { useLocation } from "react-router-dom";

export function HeaderLink() {
  const screenSize = useMediaQuery();
  //스크린 사이즈에 따라 텍스트스타일 변경
  const linkTypoClassName =
    screenSize === "MOBILE" ? typoStyles.textLgBold : typoStyles.text2lgBold;

  //현재 페이지 주소에 따라 메뉴 활성화 상태 색상으로 표시
  const location = useLocation();
  const currentPath = location.pathname;

  const isPathItemsClassName = currentPath === "/items" ? "active" : "";
  const isPathBoardClassName = currentPath === "/freeboard" ? "active" : "";

  return (
    <div className="link-list">
      {/* TODO: 게시판 링크 수정하기 ["/freeboard" */}
      <Link className={`link-item ${isPathBoardClassName}`} to="/">
        <Typo className={linkTypoClassName} content="자유게시판" />
      </Link>
      <Link className={`link-item ${isPathItemsClassName}`} to="/items">
        <Typo className={linkTypoClassName} content="중고마켓" />
      </Link>
    </div>
  );
}
