import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 120px;
  width: auto;
  z-index: 10;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, background-color 0.2s;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    background-color: #f3f4f6;
  }

  &:focus {
    border-color: #3692ff;
    background-color: white;
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: transform 0.2s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 20;
  max-height: ${(props) => (props.isOpen ? "200px" : "0")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  overflow: hidden;
  transition: max-height 0.2s, opacity 0.2s, visibility 0.2s;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) =>
    props.isSelected &&
    `
    background-color: #f3f4f6;
    font-weight: 600;
    color: #3692ff;
  `}

  &:hover {
    background-color: #f9fafb;
  }
`;

/**
 * 드롭다운 컴포넌트
 * @param {Array} options - 옵션 배열 [{value: string, label: string}]
 * @param {string} value - 현재 선택된 값
 * @param {Function} onChange - 값 변경 시 호출될 함수
 */
const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 현재 선택된 옵션의 레이블 찾기
  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption ? selectedOption.label : "";

  // 드롭다운 토글 핸들러
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 항목 선택 핸들러
  const handleSelect = (selectedValue) => {
    setIsOpen(false);
    if (selectedValue !== value) {
      onChange(selectedValue);
    }
  };

  // 외부 클릭 감지 이벤트 리스너
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

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        <span>{selectedLabel}</span>
        <DropdownIcon isOpen={isOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </DropdownIcon>
      </DropdownButton>

      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            isSelected={option.value === value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;
