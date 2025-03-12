import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { hasToken } from "@/services/authService";

/**
 * 케밥 메뉴 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {function} props.onEdit - 수정 버튼 클릭 핸들러
 * @param {function} props.onDelete - 삭제 버튼 클릭 핸들러
 * @param {boolean} props.hasPermission - 수정/삭제 권한 여부
 */
const KebabMenu = ({ onEdit, onDelete, hasPermission = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isLoggedIn = hasToken();

  // 메뉴 토글
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    setIsOpen(false);
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!hasPermission) {
      alert("수정 권한이 없습니다.");
      return;
    }
    if (onEdit) onEdit();
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    setIsOpen(false);
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!hasPermission) {
      alert("삭제 권한이 없습니다.");
      return;
    }
    if (onDelete) onDelete();
  };

  return (
    <MenuContainer ref={menuRef}>
      <IconButton onClick={toggleMenu}>
        <KebabIcon />
      </IconButton>

      {isOpen && (
        <DropdownMenu>
          <MenuItem onClick={handleEdit}>수정하기</MenuItem>
          <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
        </DropdownMenu>
      )}
    </MenuContainer>
  );
};

// 스타일 컴포넌트
const MenuContainer = styled.div`
  position: relative;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f3f4f6;
    border-radius: 50%;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #374151;

  &:hover {
    background-color: #f3f4f6;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

// 케밥 아이콘 SVG 컴포넌트
const KebabIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12.5" cy="6.5" r="1.5" fill="#9CA3AF" />
    <circle cx="12.5" cy="11.5" r="1.5" fill="#9CA3AF" />
    <circle cx="12.5" cy="16.5" r="1.5" fill="#9CA3AF" />
  </svg>
);

export default KebabMenu;
