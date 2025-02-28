import { useEffect, useState } from 'react';
import leftImg from '../../../../../assets/arrow_left.png';
import rightImg from '../../../../../assets/arrow_right.png';
import '../../../../../styles/SelectPage.css';

export function SelectPage({ page, setPage, pageSize, totalCount, products, focusPage}) {
  const [totalPages, setTotalPages] = useState(1);
  const [startPage, setStartPage] = useState(page);
  const [endPage, setEndPage] = useState(page + 4);

  useEffect(()=> {
    setPage(1);
    setStartPage(1);
    setEndPage(page+4);
  }, [totalPages,focusPage])

  useEffect(() => {
  
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount, pageSize]);

  function handleMovePage (e) {
    setPage(e.target.innerText);
  }

  function handleRightClick (e) {
    setStartPage(startPage + 5);
    setEndPage(endPage + 5);
  }

  function handleLeftClick (e) {
    setStartPage(startPage - 5);
    setEndPage(endPage - 5);
  }

  return (
    <div className="selectPage">
      {!(startPage === 1) && (
        <div className="pageClickBox" onClick={handleLeftClick}>
          <img src={leftImg} />
        </div>
      )}

      {[...Array(5)].map((_, key) => {
        key = key + startPage - 1;
        if (key + 1 <= totalPages)
          return (
            <div className={key+1 === parseInt(page)?"pageClickedBox":"pageClickBox"} key={key + 1} onClick={handleMovePage}>
              {key + 1}
            </div>
          );
      })}

      {!(startPage+5 >= totalPages) && <div className="pageClickBox" onClick={handleRightClick}>
        <img src={rightImg} />
      </div>}
    </div>
  );
}
