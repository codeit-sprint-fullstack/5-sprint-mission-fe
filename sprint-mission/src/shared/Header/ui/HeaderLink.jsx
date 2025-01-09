import { Link } from "react-router-dom";
import { useScreenSize } from "../../hooks/useScreenSize";
import { Typo, typoStyles } from "../../Typo/Typo";

export function HeaderLink() {
  const screenSize = useScreenSize();
  const linkTypoClassName =
    screenSize === "MOBILE" ? typoStyles.textLgBold : typoStyles.text2lgBold;

  return (
    <div className="link-list">
      {/* TODO: 링크 수정하기 ["/게시판 path", "/items"] */}
      <Link className="link-item" to="/">
        <Typo className={linkTypoClassName} content="자유게시판" />
      </Link>
      <Link className="link-item" to="/">
        <Typo className={linkTypoClassName} content="중고마켓" />
      </Link>
    </div>
  );
}
