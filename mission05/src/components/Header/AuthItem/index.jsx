import { useState } from "react";
import styled from "styled-components";
import Button from "../../../common/Button";
import imgProfile from "../../../assets/img/mock/profile.png";

export default function AuthItem() {
  const [isLogin, setIsLogin] = useState(false);

  const handleClick = () => setIsLogin((prev) => !prev);

  return (
    <>
      {isLogin ? (
        <ImgProfile
          src={imgProfile}
          alt="프로필 이미지"
          onClick={handleClick}
        />
      ) : (
        <Button onClick={handleClick}>로그인</Button>
      )}
    </>
  );
}

const ImgProfile = styled.img`
  width: 40px;
  height: 40px;

  &:hover {
    cursor: pointer;
  }
`;
