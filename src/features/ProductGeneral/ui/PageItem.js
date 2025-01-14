import "./PageItem.css";

const PageItem = ({ children, page, handleCurrentPage, classNames }) => {
  return (
    <div className={classNames} onClick={() => handleCurrentPage(page)}>
      {children}
    </div>
  );
};

export default PageItem;
