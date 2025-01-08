import { useOrderBy } from "../hooks/useOrderBy";
import { useScreenSize } from "../../../../../shared/hooks/useScreenSize";
import { ORDER_BY } from "../../../../../utils/APIs/getItemsListAPI";
import sortIcon from "../../../../../shared/assets/sort_icon.png";
import mobileSortIcon from "../../../../../shared/assets/mobile_sort_icon.png";

//ORDER_BY의 값만 배열로 변환
const ORDER_BY_VALUE_ARR = Object.values(ORDER_BY);

export function SortItems({ onSortChange }) {
  const screenSize = useScreenSize();
  const { selectedName, showDropdown, handleSelectSort, toggleDropdown } =
    useOrderBy(ORDER_BY.RECENT);

  const dropdownBoxClassName = showDropdown ? "show" : "";
  const sortItemsTextClassName = screenSize === "MOBILE" ? "mobile" : "";
  const sortItemsIcon = screenSize === "MOBILE" ? mobileSortIcon : sortIcon;

  //console.log("선택한 메뉴 이름", selectedName);
  //console.log("선택한 정렬 기준", selectedValue);
  //console.log("--------");

  return (
    <div className="sort-items-wrapper" onClick={toggleDropdown}>
      <p className={`sort-items-text ${sortItemsTextClassName}`}>
        {selectedName}
      </p>
      <img id="dropdown-icon" src={sortItemsIcon} alt="정렬 아이콘" />

      <div className={`dropdown-box ${dropdownBoxClassName}`}>
        {ORDER_BY_VALUE_ARR.map((item, idx) => (
          <p
            className="dropdown-text"
            onClick={() => {
              handleSelectSort(item);
              onSortChange(item.value);
            }}
            key={idx}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}
