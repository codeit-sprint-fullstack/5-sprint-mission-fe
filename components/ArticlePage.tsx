import styles from "@/styles/articlePage.module.css";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ArticlePage({ currentPage, totalPages, onPageChange }: Props) {
  const generatePages = () => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={styles.articlePage}>
      <button
        className={`${styles.button} ${styles.buttonExtra}`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {generatePages().map((page) => (
        <button
          key={page}
          className={`${styles.button} ${
            page === currentPage ? styles.buttonActive : styles.buttonExtra
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`${styles.button} ${styles.buttonExtra}`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
