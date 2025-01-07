import { useState } from "react";
import Button from "../../common/Button";
import styled from "styled-components";

export default function Auth() {
  const [isLogin, setIsLogin] = useState();

  const handleClick = () => setIsLogin((prev) => !prev);

  return (
    <>
      {isLogin ? (
        <Button onClick={handleClick}>로그아웃</Button>
      ) : (
        <ImgProfile
          src="../../assets/img/mock/profile.png" // 임시 이미지 URL
          alt="프로필 이미지"
          onClick={handleClick}
        />
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
