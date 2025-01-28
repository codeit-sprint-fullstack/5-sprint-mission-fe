import defaultImg from "../../../assets/image/img_default.svg";
import heartIcon from "../../../assets/icon/ic_item_heart.png";

function Item({ name, price, favoriteCount }) {
  return (
    <li className="flex flex-col items-center gap-[16px]">
      <img
        src={defaultImg}
        alt={name}
        className="pc:w-[220px] :h-[220px] tablet:w-[220px] tablet:h-[220px] mobile:w-[180px] mobile:h-[180px]"
      />
      <div className="flex flex-col items-start w-full gap-[8px]">
        <span className="text-[14px] font-[500] leading-[24px] text-secondary-800 text-left">
          {name}
        </span>
        <span
          className="text-[16px] font-[700] leading-[26px] text-secondary-800"
          text-left
        >
          {price.toLocaleString()}원
        </span>
        <figure className="flex items-center justify-center gap-[4px]">
          <button>
            <img
              src={heartIcon}
              alt="좋아요 수"
              className="w-[13.4px] h-[11.65px]"
            />
          </button>
          <span className="text-[12px] font-[500] leading-[18px] text-secondary-600">
            {favoriteCount}
          </span>
        </figure>
      </div>
    </li>
  );
}

export default Item;
