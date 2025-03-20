import React from "react";
import styled from "@emotion/styled";

/**
 * 페이지네이션 컴포넌트
 * @param {object} props
 * @param {number} props.currentPage - 현재 페이지 번호
 * @param {number} props.totalItems - 전체 아이템 수
 * @param {number} props.itemsPerPage - 페이지당 아이템 수
 * @param {function} props.onPageChange - 페이지 변경 콜백
 */
const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 이전/다음 페이지 여부
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // 슬라이딩 윈도우 방식으로 페이지 번호 생성
  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;

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

    // 첫 페이지 버튼 (시작 페이지가 1보다 크면 표시)
    if (startPage > 1) {
      pages.push(
        <PageButton
          key="first"
          type="button"
          onClick={() => handlePageChange(1)}
        >
          1
        </PageButton>
      );

      // 생략 표시
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" style={{ margin: "0 4px" }}>
            ...
          </span>
        );
      }
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

    // 마지막 페이지 버튼 (끝 페이지가 총 페이지 수보다 작으면 표시)
    if (endPage < totalPages) {
      // 생략 표시
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" style={{ margin: "0 4px" }}>
            ...
          </span>
        );
      }

      pages.push(
        <PageButton
          key="last"
          type="button"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      );
    }

    return pages;
  };

  // 페이지가 1개인 경우 페이지네이션 표시하지 않음
  if (totalPages <= 1) return null;

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

export default Pagination;
