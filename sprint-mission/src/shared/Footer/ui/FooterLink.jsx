import { Link } from "react-router-dom";

export function FooterLink() {
  return (
    <div className="link-list">
      {/* TODO: 링크 수정하기 ["/privacy", "/faq"] */}
      <Link className="link-item" to="/">
        Privacy Policy
      </Link>
      <Link className="link-item" to="/">
        FAQ
      </Link>
    </div>
  );
}
