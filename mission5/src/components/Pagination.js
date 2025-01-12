import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => (props.isActive ? "#007bff" : "#ffffff")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#6B7280")};
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#f1f1f1")};
  }
`;

const ArrowButton = styled.button`
  padding: 0.5rem;
  background-color: #ffffff;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  &:disabled {
    background-color: #e9ecef;
    color: #adb5bd;
    cursor: not-allowed;
  }
`;

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.max(5, Math.ceil(totalItems / itemsPerPage));

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <ArrowButton onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </ArrowButton>

      {Array.from({ length: totalPages }, (_, i) => (
        <PageButton
          key={i}
          isActive={currentPage === i + 1}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </PageButton>
      ))}

      <ArrowButton onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;
