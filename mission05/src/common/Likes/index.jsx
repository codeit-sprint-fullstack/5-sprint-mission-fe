import styled from "styled-components";
import imgHeart from "../../assets/img/likes/ic_heart.png";

export default function Likes({ favoriteCount }) {
  return (
    <CommonLikes>
      <ImgHeart src={imgHeart} alt="좋아요의 하트 이미지" />
      <p>{favoriteCount}</p>
    </CommonLikes>
  );
}

const CommonLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  color: #4b5563;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 18px;
`;

const ImgHeart = styled.img`
  width: 16px;
  height: 16px;
`;
