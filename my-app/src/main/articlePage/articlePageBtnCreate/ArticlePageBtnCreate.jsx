export function ArticlePageBtnCreate({
  currentPage,
  SetCurrentPage,
  totalCount,
}) {
  const totalPage =
    totalCount % 10 !== 0 ? totalCount / 10 : totalCount / 10 + 1;
  const startPage = Math.max(1, Number(currentPage) - 2);
  const endPage = Number(currentPage) + 2;
  const buttons = [];
  const handleChange = (event) => {
    SetCurrentPage(event.target.value);
  };
  if (endPage <= totalPage) {
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
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
