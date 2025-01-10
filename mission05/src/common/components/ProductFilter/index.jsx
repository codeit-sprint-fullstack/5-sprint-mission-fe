import { useState } from "react";
import arrowDownIcon from "../../../assets/filter/ic_arrow_down.png";
import sortIcon from "../../../assets/filter/ic_sort.png";

const SORT_TYPE = {
  RECENT: { key: "recent", label: "최신순" },
  FAVORITE: { key: "favorite", label: "좋아요순" },
};

export default function ProductFilter({ initOrderBy, onUpdate }) {
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => setIsShow((prev) => !prev);

  const handleChange = (orderBy) => {
    onUpdate((prevQuery) => ({
      ...prevQuery,
      orderBy,
    }));
  };

  return (
    <section className="relative">
      <div
        className="flex items-center gap-6 text-gray-800 text-base leading-[26px] px-[20px] py-[8px] border border-gray-200 rounded-[12px] cursor-pointer md:p-[9px]"
        onClick={handleClick}
      >
        <p>{initOrderBy}</p>
        <img
          src={arrowDownIcon}
          alt="필터"
          className="w-[24px] h-[24px] md:hidden"
        />
        <img
          src={sortIcon}
          alt="필터"
          className="hidden w-[24px] h-[24px] md:block"
        />
      </div>

      {isShow && (
        <div>
          {Object.keys(SORT_TYPE).map((value, idx) => {
            <div key={idx} onClick={() => handleChange(value)}>
              {SORT_TYPE[value].label}
            </div>;
          })}
        </div>
      )}
    </section>
  );
}
