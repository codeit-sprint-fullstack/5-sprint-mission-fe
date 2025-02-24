import { useState, useRef, useEffect } from "react";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <img
        src="/ic_kebab.png"
        alt="메뉴 열기"
        className="cursor-pointer w-6 h-6"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
          <button className="block px-4 py-2 w-full hover:bg-gray-100">
            수정하기
          </button>
          <button className="block px-4 py-2 w-full hover:bg-gray-100">
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
