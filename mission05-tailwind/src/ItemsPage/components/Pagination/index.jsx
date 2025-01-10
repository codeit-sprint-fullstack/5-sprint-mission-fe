import PaginationItem from "../PaginationItem";
import arrowIcon from "../../../assets/pagination/arrow_right.png";
import { useState } from "react";

const length = 5;

export default function Pagination() {
  const [startIndex, setStartIndex] = useState(1);
  const [pageArray, setPageArray] = useState([]);

  return (
    <section>
      <PaginationItem onMove={}>
        <img
          src={arrowIcon}
          alt="왼쪽으로 이동"
          className="w-[16px] h-[16px]"
        />
      </PaginationItem>

        {pageArray.map((number, idx)=>( 
          <PaginationItem key={idx} isSelect={+page === +number} onMove={}>
            {number}
          </PaginationItem>
        ))}
      

      <PaginationItem onMove={}>
        <img
          src={arrowIcon}
          alt="오른쪽으로 이동"
          className="w-[16px] h-[16px] -scale-x-100"
        />
      </PaginationItem>
    </section>
  );
}
