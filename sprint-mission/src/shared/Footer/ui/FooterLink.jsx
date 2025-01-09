import { Link } from "react-router-dom";
import { Typo, typoStyles } from "../../Typo/Typo";

export function FooterLink() {
  return (
    <div className="link-list">
      {/* TODO: 링크 수정하기 ["/privacy", "/faq"] */}
      <Link className="link-item" to="/">
        <Typo className={typoStyles.textLgRegular} content="Privacy Policy" />
      </Link>
      <Link className="link-item" to="/">
        <Typo className={typoStyles.textLgRegular} content="FAQ" />
      </Link>
    </div>
  );
}
