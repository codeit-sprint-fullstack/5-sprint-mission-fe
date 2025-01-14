import defaultImg from "../../assets/img/img_default.png";
import likeHeart from "../../assets/img/like.png";

export function BestItemCard({ item }) {
  const { images, name, price, favoriteCount } = item;

  const handleError = (e) => {
    e.target.src = defaultImg;
  };

  return (
    <div className=" flex-col w-full gap-4 ">
      <img
        src={
          item.images && item.images.length > 0 ? item.images[0] : defaultImg
        }
        alt={item.name || "No Image"}
        className="block rounded-xl shadow-md w-full mb-4 aspect-square "
        onError={handleError}
      />
      <div className="flex flex-col  text-gray-800 gap-[6px]">
        <p className="font-medium text-sm self-start ">{item.name}</p>
        <h3 className="text-base font-bold self-start ">
          {item.price.toLocaleString("ko-KR")}원
        </h3>

        <div className="flex items-center gap-[6px]">
          <img
            src={likeHeart}
            className="w-4 h-4 max-w-full block"
            alt="Like Count"
          />

          <p className="text-xs font-medium leading-[18px] text-gray-600">
            {favoriteCount}
          </p>
        </div>
      </div>
    </div>
  );
}
