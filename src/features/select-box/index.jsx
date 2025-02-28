import "./style.css";
import { useState } from "react";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import icArrowDown from "shared/assets/images/ic_arrow_down.png";
import icSort from "shared/assets/images/ic_sort.png";

export const SelectBox = ({ orderBy, handleOrderBy }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const media = useMediaQuery("");
  const isMobile = media === "mobile";

  const handleOnClickSelectValue = (e) => {
    const value = e.target.dataset.key;
    handleOrderBy(value);
    setIsShowOption(!isShowOption);
  };

  return (
    <div className="select-box">
      <div
        className="seletor-wrapper"
        onClick={() => setIsShowOption(!isShowOption)}
      >
        {!isMobile && (
          <>
            <label>{orderBy === "recent" ? "최신순" : "좋아요순"}</label>
            <img src={icArrowDown} alt=""></img>
          </>
        )}
        {isMobile && <img src={icSort} alt=""></img>}
      </div>
      <ul
        style={{ display: isShowOption ? "block" : "none" }}
        className="seletor-options"
      >
        <li data-key="recent" onClick={handleOnClickSelectValue}>
          최신순
        </li>
        <li data-key="favorite" onClick={handleOnClickSelectValue}>
          좋아요순
        </li>
      </ul>
    </div>
  );
};
