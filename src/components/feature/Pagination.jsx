import React, { useState } from "react";
import leftBtn from "../../assets/img/arrow_left.png";
import rightBtn from "../../assets/img/arrow_right.png";

function Pagination({ totalPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const totalGroups = Math.ceil(totalPage / itemsPerPage); // 전체 페이지 그룹 수
  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page); //선택된 페이지를 전달
  };

  const handlePrevGroup = () => {
    if (pageGroup > 1) setPageGroup(pageGroup - 1);
  };

  const handleNextGroup = () => {
    if (pageGroup < totalGroups) setPageGroup(pageGroup + 1);
  };

  // 현재 페이지 그룹에 포함된 페이지 번호 계산
  const startPage = (pageGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(pageGroup * itemsPerPage, totalPage);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  return (
    <div className="flex justify-center gap-2 mt-4">
      {/* 이전 그룹 버튼 */}
      {pageGroup > 1 && (
        <button
          onClick={handlePrevGroup}
          className="flex justify-center items-center w-[40px] h-[40px] border rounded-full"
        >
          <img src={leftBtn} alt="Prev" />
        </button>
      )}

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`w-[40px] h-[40px] border rounded-full ${
            pageNum === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* 다음 그룹 버튼 */}
      {pageGroup < totalGroups && (
        <button
          onClick={handleNextGroup}
          className="flex justify-center items-center w-[40px] h-[40px] border rounded-full"
        >
          <img src={rightBtn} alt="Next" />
        </button>
      )}
    </div>
  );
}

export default Pagination;
