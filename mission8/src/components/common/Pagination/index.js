import React from "react";
import styled from "@emotion/styled";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.active ? "#3692ff" : "#d1d5db")};
  background-color: ${(props) => (props.active ? "#3692ff" : "white")};
  color: ${(props) => (props.active ? "white" : "#4b5563")};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#2a75cc" : "#f3f4f6")};
  }

  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }
`;

const Pagination = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
}) => {
  // 페이지 변경 핸들러 - 단순화
  const handlePageChange = (page) => {
    console.log("페이지 변경:", page);
    onPageChange(page);
  };

  // 슬라이딩 윈도우 방식으로 페이지 번호 생성
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // 한 번에 보여줄 최대 페이지 수

    // 시작 페이지 계산 - 현재 페이지를 중앙에 두려고 함
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

    // 끝 페이지가 총 페이지 수를 넘지 않도록 조정
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 표시할 페이지 수가 maxVisiblePages보다 적으면 시작 페이지를 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 페이지 버튼 생성
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PageButton
          key={page}
          type="button"
          active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageButton>
      );
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <PageButton
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrev}
      >
        이전
      </PageButton>

      {renderPageNumbers()}

      <PageButton
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        다음
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
