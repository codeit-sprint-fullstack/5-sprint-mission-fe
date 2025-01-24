export function ArticlePageBtnCreate({
  currentPage,
  SetCurrentPage,
  totalPages,
}) {
  const totalPage = totalPages;
  const startPage = Math.max(1, Number(currentPage) - 2);
  const endPage = Math.min(totalPage, Number(currentPage) + 2);
  const buttons = [];
  const handleChange = (event) => {
    SetCurrentPage(event.target.value);
  };
  if (endPage <= totalPage) {
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          value={i}
          onClick={handleChange}
          className={i === Number(currentPage) ? "buttonActive" : "buttonExtra"}
        >
          {i}
        </button>
      );
    }
    return <>{buttons}</>;
  } else if (endPage > totalPage) {
    for (let i = startPage; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          value={i}
          onClick={handleChange}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return <>{buttons}</>;
  }
}
