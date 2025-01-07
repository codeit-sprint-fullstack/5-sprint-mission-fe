import styled from "styled-components";
import imgArrowDown from "../../assets/img/filter/ic_arrow_down.png";
import imgSort from "../../assets/img/filter/ic_sort.png";
import { SORT_TYPE } from "../../constants";
import { useState } from "react";

export default function Filter({ sortType, setSortType }) {
  const [isShow, setIsShow] = useState(false);

  const toggleSelect = () => setIsShow((prev) => !prev);

  const selectItem = (type) => {
    setSortType(type);
    setIsShow(false); // 목록 닫기
  };

  return (
    <FilterWrapper>
      <Select onClick={toggleSelect}>
        <p>{sortType.label}</p>
        <Img src={imgArrowDown} alt="필터" />
      </Select>

      {isShow && (
        <SelectItems>
          {Object.values(SORT_TYPE).map((value) => (
            <SelectItem
              key={value.key}
              onClick={() => selectItem(value)}
              isSelected={sortType.key === value.key}
            >
              {value.label}
            </SelectItem>
          ))}
        </SelectItems>
      )}
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  position: relative;
`;

const Select = styled.div`
  color: #1f2937;
  font-size: 1rem;
  line-height: 26px;

  display: flex;
  align-items: center;
  gap: 24px;

  padding: 8px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 744px) {
    padding: 9px;
    & > p {
      display: none; /* 텍스트 숨기기 */
    }
  }
`;

const Img = styled.img`
  width: 24px;
  height: 24px;

  @media (max-width: 744px) {
    content: url(${imgSort}); /* imgSort로 이미지 변경 */
  }
`;

const SelectItems = styled.div`
  text-align: center;

  position: absolute;
  top: calc(100% + 8px); /* Select 컴포넌트 바로 아래에 8px 간격 */
  right: 0;

  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  z-index: 2;
`;

const SelectItem = styled.div`
  width: 130px;
  padding: 8px 20px;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border: none;
  }
  &:hover {
    background: #f3f4f6;
  }
`;
