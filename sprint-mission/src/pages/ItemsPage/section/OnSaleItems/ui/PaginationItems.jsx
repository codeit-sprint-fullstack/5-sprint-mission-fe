import arrowLeft from "../../../../../shared/assets/arrow_left.png";
import arrowRight from "../../../../../shared/assets/arrow_right.png";
import { usePagination } from "../hooks/usePagination";

export function PaginationItems({
  currentPage = 1,
  totalPageCount = 1,
  onPageChange,
}) {
  const {
    // currentPage,
    startPage,
    pageNums,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
  } = usePagination(totalPageCount);

  return (
    <div className="pagination-wrapper">
      <div className="page-btn" onClick={handlePrevClick}>
        <img className="arrow-img" src={arrowLeft} alt="이전 페이지" />
      </div>

      {pageNums.map((page) => {
        return (
          <button
            className={`page-btn ${page === currentPage ? "selected" : ""}`}
            onClick={() => {
              handlePageClick(page);
              onPageChange(page); //상위 컴포넌트에 선택한 페이지 전달
            }}
            key={page}
          >
            {page}
          </button>
        );
      })}

      <div className="page-btn" onClick={handleNextClick}>
        <img className="arrow-img" src={arrowRight} alt="다음 페이지" />
      </div>
    </div>
  );
}