import { Link } from "react-router-dom";
import { Typo, typoStyles } from "../../../../../shared/Typo/Typo";

export function PostItems() {
  return (
    //TODO: 링크 수정하기 "/registration"
    <Link id="post-item-btn" to="/">
      <Typo className={typoStyles.textLgSemibold} content="상품 등록하기" />
    </Link>
  );
}
