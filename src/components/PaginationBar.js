function PaginationBar({ currentPage, pageCount, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-[16px] text-[20px]">
      {Array.from({ length: pageCount }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`
              w-[40px] h-[40px] 
              rounded-full border 
              transition-colors
              ${
                currentPage === pageNumber
                  ? "border-primary-500 bg-primary-50 text-primary-500"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}

export default PaginationBar;
