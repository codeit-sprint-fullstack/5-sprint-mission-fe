import PaginationItem from "../PaginationItem";
import arrowIcon from "../../../assets/pagination/arrow_left.png";
import { useEffect, useState } from "react";

const length = 5;

export default function Pagination({ endIndex, query, onUpdate }) {
  const { page, keyword, orderBy } = query;
  const [startIndex, setStartIndex] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  // const [lastPageItem, setLastPageItem] = useState(startIndex * pageSize); // 마지막 요소 페이지의 id
  // const [prevPageSize, setPrevPageSize] = useState(pageSize);

  // click handler for moving page
  const handleMovePage = (page) => {
    onUpdate((prevQuery) => ({
      ...prevQuery,
      page,
    }));
  };

  const handleMoveLeft = () => {
    setStartIndex((prevStartIndex) => prevStartIndex - length);
  };

  const handleMoveRight = () => {
    setStartIndex((prevStartIndex) => {
      const nextStartIndex = prevStartIndex + length;
      if (nextStartIndex > endIndex) return prevStartIndex;
      return nextStartIndex;
    });
  };

  // 인덱스 변경될 때마다 페이지 넘버링 변경
  useEffect(() => {
    const newPageArray = Array.from(
      { length },
      (_, i) => i + startIndex
    ).filter((number) => number <= endIndex);

    setPageArray(newPageArray);
  }, [startIndex, endIndex]);

  // 보류
  // endPoint가 이전 보다 적어지면 페이지네이션이 안보이는 현상 해결
  // 계산해서 page와 startIndex 이동시키면 됨 ㅇㅇ
  // const changePageIndex = (prevLastPageItem) => {
  //   const newPageIndex =
  //     prevPageSize > pageSize
  //       ? Math.floor(prevLastPageItem / pageSize)
  //       : Math.ceil(prevLastPageItem / pageSize);
  //   const newStartIndex = newPageIndex - (newPageIndex % 5);

  //   onUpdate((prevQuery) => ({
  //     ...prevQuery,
  //     page: newPageIndex,
  //   }));
  //   setStartIndex(newStartIndex);
  // };

  // useEffect(() => {
  //   setLastPageItem((prevLastPageItem) => {
  //     const newLastPageItem = startIndex * pageSize;
  //     if (prevLastPageItem === newLastPageItem) return prevLastPageItem; // 업데이트 안함

  //     changePageIndex(prevLastPageItem); // 같지 않으면 width가 변경된 것임 따라서 페이지 변경하기

  //     return newLastPageItem; // 같지 않으면 업데이트 그리고 판단
  //   });
  // }, [endIndex]);

  // 검색과 정렬시 첫페이지로 돌아감
  useEffect(() => {
    setStartIndex(1);
    onUpdate((prevQuery) => ({
      ...prevQuery,
      page: 1,
    }));
  }, [keyword, orderBy]);

  return (
    <section className="flex gap-[4px]">
      {startIndex !== 1 && (
        <PaginationItem onMove={handleMoveLeft}>
          <img
            src={arrowIcon}
            alt="왼쪽으로 이동"
            className="w-[16px] h-[16px]"
          />
        </PaginationItem>
      )}

      {pageArray.map((number, idx) => (
        <PaginationItem
          key={idx}
          isSelect={+page === +number}
          onMove={() => handleMovePage(number)}
        >
          {number}
        </PaginationItem>
      ))}

      {endIndex !== 0 && (
        <PaginationItem onMove={handleMoveRight}>
          <img
            src={arrowIcon}
            alt="오른쪽으로 이동"
            className="w-[16px] h-[16px] -scale-x-100"
          />
        </PaginationItem>
      )}
    </section>
  );
}
