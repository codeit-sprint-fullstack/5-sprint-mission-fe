import PageItem from "./PageItem";
import "./Pages.css";

/**
 * page : 현재 페이지
 * changePage(p) : 현재 페이지를 p로
 * maxPage : 최대 페이지
 */
const Pages = ({ page, changePage, maxPage }) => {
  const startPage = 5 * Math.floor((page - 1) / 5) + 1;
  const endPage = Math.min(startPage + 4, maxPage); // 최대 페이지를 초과하지 않도록 조정

  return (
    <div className="pages">
      <PageItem
        page={page}
        handleCurrentPage={(p) => (p > 1 ? changePage(p - 1) : null)}
        classNames={"page-item"}
      >
        {"<"}
      </PageItem>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <PageItem
          key={startPage + i}
          page={startPage + i}
          handleCurrentPage={(p) => changePage(p)}
          classNames={`page-item ${page === startPage + i ? "active" : ""}`}
        >
          {startPage + i}
        </PageItem>
      ))}
      <PageItem
        page={page}
        handleCurrentPage={(p) => (p < maxPage ? changePage(p + 1) : null)}
        classNames={"page-item"}
      >
        {">"}
      </PageItem>
    </div>
  );
};

export default Pages;
