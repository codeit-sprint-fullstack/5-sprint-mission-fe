import { Link } from "react-router-dom";

export function HeaderLink() {
  return (
    <div className="link-list">
      {/* TODO: 링크 수정하기 ["/게시판 path", "/items"] */}
      <Link className="link-item" to="/">
        자유게시판
      </Link>
      <Link className="link-item" to="/">
        중고마켓
      </Link>
    </div>
  );
}
