import { useState } from "react";
import arrowDownIcon from "../../../assets/filter/ic_arrow_down.png";
import sortIcon from "../../../assets/filter/ic_sort.png";

export const SORT_TYPE = {
  RECENT: { key: "recent", label: "최신순" },
  FAVORITE: { key: "favorite", label: "좋아요순" },
};

export default function ProductFilter({ orderBy, onUpdate }) {
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => setIsShow((prev) => !prev);

  const handleChange = (orderBy) => {
    onUpdate((prevQuery) => ({
      ...prevQuery,
      orderBy,
    }));
    setIsShow(false);
  };

  return (
    <section className="relative">
      <div
        className="flex items-center gap-6 text-gray-800 text-base leading-[26px] px-5 py-2 border border-gray-300 rounded-[12px] hover:cursor-pointer md:p-2"
        onClick={handleToggle}
      >
        <p className="md:hidden">{SORT_TYPE[orderBy.toUpperCase()]?.label}</p>
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
        <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-300 rounded-[12px] z-20 text-center">
          {Object.keys(SORT_TYPE).map((value, idx) => (
            <div
              key={idx}
              onClick={() => handleChange(SORT_TYPE[value]?.key)}
              className="w-[130px] py-[8px] px-[20px] cursor-pointer border-b border-gray-300 hover:bg-gray-200 last:border-b-0 first:rounded-t-[12px] last:rounded-b-[12px]"
            >
              {SORT_TYPE[value]?.label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
