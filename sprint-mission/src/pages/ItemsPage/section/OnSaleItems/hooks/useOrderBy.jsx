import { useState } from "react";

export function useOrderBy(initValue) {
  //초기값은 최신순으로 설정
  const [selectedName, setSelectedName] = useState(initValue.name);
  const [showDropdown, setShowDropdown] = useState(false);

  /**
   * @description 클릭된 옵션의 이름으로 #sort-items-label ui업데이트
   */
  const handleSelectSort = (item) => {
    setSelectedName(item.name);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return {
    selectedName,
    showDropdown,
    handleSelectSort,
    toggleDropdown,
  };
}
