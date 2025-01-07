import styled from "styled-components";
import PageItem from "./PageItem";
import imgArrowBtn from "../../assets/img/pagenation/arrow_right.png";
import { useState } from "react";

const length = 5;

export default function Pagination({ count, page, setPage }) {
  const [startIndex, setStartIndex] = useState(1);

  const handlePrev = () => {
    if (startIndex > 1) {
      setStartIndex((prev) => prev - length);
    }
  };

  const handleNext = () => {
    if (startIndex + 5 <= count) {
      setStartIndex((prev) => prev + length);
    }
  };
  return (
    <PaginationWrapper>
      <PageItem onClick={handlePrev}>
        <ImgRightArrow src={imgArrowBtn} alt="왼쪽으로" />
      </PageItem>
      {Array.from({ length }, (_, i) => startIndex + i).map((number, idx) => (
        <PageItem key={idx} isSelect={+page === +number} onClick={setPage}>
          {number}
        </PageItem>
      ))}

      <PageItem onClick={handleNext}>
        <ImgLeftArrow src={imgArrowBtn} alt="오른쪽으로" />
      </PageItem>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const ImgRightArrow = styled.img`
  width: 16px;
  height: 16px;
`;

const ImgLeftArrow = styled.img`
  width: 16px;
  height: 16px;
  transform: scaleX(-1); /* 좌우 반전 */
`;
