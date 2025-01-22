import { Link } from "react-router-dom";
import { Typo, typoStyles } from "../../../../../shared/Typo/Typo";

export function PostItems() {
  return (
    <Link id="post-item-btn" to="/registration">
      <Typo className={typoStyles.textLgSemibold} content="상품 등록하기" />
    </Link>
  );
}
