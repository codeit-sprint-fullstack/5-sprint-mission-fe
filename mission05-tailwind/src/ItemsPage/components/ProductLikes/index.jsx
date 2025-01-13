import heartIcon from "../../../assets/likes/ic_heart.png";

export default function ProductLikes({ favoriteCount }) {
  return (
    <div className="flex items-center gap-1 text-gray-600 text-xs font-medium leading-[18px] hover:cursor-pointer">
      <img
        src={heartIcon}
        alt="좋아요의 하트 이미지"
        className="w-[16px] h-[16px]"
      />
      <p>{favoriteCount}</p>
    </div>
  );
}
