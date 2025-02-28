import React, { useState } from "react";
import leftBtn from "../assets/images/arrow_left.png";
import rightBtn from "../assets/images/arrow_right.png";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

type PageButtonProps = {
  $isActive: boolean;
};

const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  const [pageGroup, setPageGroup] = useState(1);

  const itemsPerPage = 5;
  const totalGroups = Math.ceil(totalPages / itemsPerPage);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 1) setPageGroup(pageGroup - 1);
  };

  const handleNextGroup = () => {
    if (pageGroup < totalGroups) setPageGroup(pageGroup + 1);
  };

  const startPage = (pageGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(pageGroup * itemsPerPage, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <PaginationContainer>
      {pageGroup > 1 && (
        <ArrowButton onClick={handlePrevGroup}>
          <img src={leftBtn} alt="Prev" />
        </ArrowButton>
      )}

      {pageNumbers.map((pageNum) => (
        <PageButton
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          $isActive={pageNum === currentPage}
        >
          {pageNum}
        </PageButton>
      ))}

      {pageGroup < totalGroups && (
        <ArrowButton onClick={handleNextGroup}>
          <img src={rightBtn} alt="Next" />
        </ArrowButton>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
const PageButton = styled.button<PageButtonProps>`
  width: 40px;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#3b82f6" : "#fff")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#000")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
