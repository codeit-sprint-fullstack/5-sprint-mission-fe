import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

/**
 * 정렬 드롭다운 컴포넌트
 */
const SortDropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("latest");
  const dropdownRef = useRef(null);

  // 정렬 옵션
  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "price", label: "가격순" },
  ];

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 옵션 선택 핸들러
  const handleOptionSelect = (option) => {
    setSelectedOption(option.value);
    onSortChange(option.value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {sortOptions.find((option) => option.value === selectedOption)?.label}
        <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
      </DropdownButton>
      {isOpen && (
        <OptionsContainer>
          {sortOptions.map((option) => (
            <OptionItem
              key={option.value}
              isSelected={selectedOption === option.value}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsContainer>
      )}
    </DropdownContainer>
  );
};

// 드롭다운 컨테이너 스타일
const DropdownContainer = styled.div`
  position: relative;
  min-width: 120px;
`;

// 드롭다운 버튼 스타일
const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 12px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: #9ca3af;
  }
`;

// 화살표 아이콘 스타일
const ArrowIcon = styled.span`
  font-size: 10px;
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

// 옵션 컨테이너 스타일
const OptionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

// 옵션 아이템 스타일
const OptionItem = styled.div`
  padding: 10px 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#f3f4f6" : "white")};
  color: ${(props) => (props.isSelected ? "#3692ff" : "#1f2937")};

  &:hover {
    background-color: #f9fafb;
  }
`;

export default SortDropdown;
