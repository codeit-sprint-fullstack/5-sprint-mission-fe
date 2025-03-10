import { useState, useRef, useEffect } from "react";

export default function ArticleDropdownMenu({ onSortChange }) {
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

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
    setIsOpen(false);
  };

  return (
    <div className="inline-block" ref={dropdownRef}>
      <div className="block sm:hidden">
        <img
          src="/btn_sort.png"
          alt="메뉴 열기"
          className="cursor-pointer w-[42px] h-[42px]"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="right-0 mt-2 w-32  bg-white rounded-md shadow-lg z-10">
            <button
              className="block px-4 py-2 w-full h-full hover:bg-gray-100"
              onClick={() => handleSortChange({ target: { value: "latest" } })}
            >
              최신 순
            </button>
            <button
              className="block px-4 py-2 w-full hover:bg-gray-100"
              onClick={() => handleSortChange({ target: { value: "likes" } })}
            >
              좋아요 순
            </button>
          </div>
        )}
      </div>

      <select
        className="hidden sm:block border border-gray-300 h-full rounded-md px-2 py-1 cursor-pointer"
        onChange={handleSortChange}
      >
        <option value="latest">최신 순</option>
        <option value="likes">좋아요 순</option>
      </select>
    </div>
  );
}
