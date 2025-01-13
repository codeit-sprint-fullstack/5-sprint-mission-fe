const Pagination = ({ currentPage, totalCount, setCurrentPage }) => {
  const pageSize = 5;
  const pagePerCount = 10;

  const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalCount / pagePerCount + 1);
  const isFirstGroup = currentPage === 1;
  const isLastGroup = endPage === totalCount / pagePerCount + 1;

  const handlePrevGroup = () => {
    if (!isFirstGroup) {
      setCurrentPage(startPage - pageSize);
    }
  };

  const handleNextGroup = () => {
    if (!isLastGroup) {
      setCurrentPage(startPage + pageSize);
    }
  };

  console.log("currentPage:", currentPage, "totalPages:", totalCount);
  console.log("startPage:", startPage, "endPage:", endPage);

  return (
    <div className="flex justify-center mt-[43px]">
      <nav className="flex items-center gap-2">
        {!isFirstGroup && (
          <button
            onClick={handlePrevGroup}
            className="w-10 h-10 flex items-center justify-center rounded-full border"
          >
            &lt;
          </button>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        {!isLastGroup && (
          <button
            onClick={handleNextGroup}
            className="w-10 h-10 flex items-center justify-center rounded-full border"
          >
            &gt;
          </button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
