import { useState } from "react";

export function useOrderBy(initValue) {
  //초기값은 최신순으로 설정
  const [selectedValue, setSelectedValue] = useState(initValue.value);
  const [selectedName, setSelectedName] = useState(initValue.name);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectSort = (item) => {
    setSelectedValue(item.value);
    setSelectedName(item.name);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return {
    selectedValue,
    selectedName,
    showDropdown,
    handleSelectSort,
    toggleDropdown,
  };
}
