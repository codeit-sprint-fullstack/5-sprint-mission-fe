import { useState } from "react";

export function usePagination(totalPageCount, pagePerRange = 5) {
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [currentRange, setCurrentRange] = useState(1); //현재 구간

  const totalRanges = Math.ceil(totalPageCount / pagePerRange); //전체 구간 수

  //현재 구간의 시작과 끝 페이지 계산
  const startPage = (currentRange - 1) * pagePerRange + 1;
  const endPage = Math.min(currentRange * pagePerRange, totalPageCount); //마지막 구간에서는 있는 페이지까지만 버튼 생성

  //현재 구간의 페이지 번호 리스트 배열로 만들기
  const pageNums = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

  //페이지 선택 핸들러
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  //구간 이동
  const handlePrevClick = () => {
    if (currentRange > 1) setCurrentRange(currentRange - 1);
  };

  const handleNextClick = () => {
    if (currentRange < totalRanges) setCurrentRange(currentRange + 1);
  };

  return {
    currentPage,
    currentRange,
    totalRanges,
    startPage,
    endPage,
    pageNums,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
  };
}
