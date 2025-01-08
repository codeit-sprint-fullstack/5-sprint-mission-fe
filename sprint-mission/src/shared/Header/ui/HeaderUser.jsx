import { Link } from "react-router-dom";
import defaultProfile from "../../../shared/assets/default_profile.png";

export function HeaderUser({ isLoggedIn, handleClick }) {
  return (
    <div id="user-btn" onClick={handleClick}>
      {isLoggedIn ? (
        <img id="profile-img" src={defaultProfile} alt="프로필 사진" />
      ) : (
        // TODO: 링크 수정하기 "/login"
        <Link id="login-btn" to="/">
          로그인
        </Link>
      )}
    </div>
  );
}
