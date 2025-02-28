import { BestItemList } from '../Market/BestItemList/BestItemList';
import { SellingItemList } from '../Market/SellingItemList/SellingItemList';
import { useEffect, useState } from 'react';

export function Market({ userEnv, setPageFocus, pageFocus }) {
  const [order, setOrder] = useState('recent');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // 모바일: 4 , 태블릿: 6, 데스크탑: 10
  const [keyword, setKeyword] = useState('');
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    if (userEnv === 'desktop') setPageSize(10);
    if (userEnv === 'tablet') setPageSize(6);
    if (userEnv === 'mobile') setPageSize(4);
  }, [userEnv]);

  useEffect(()=> {
    setPageFocus("market");
  },[])
  return (
    <div className={userEnv}>
      <SellingItemList
        order={order}
        setOrder={setOrder}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        keyword={keyword}
        setKeyword={setKeyword}
        totalCount={totalCount}
        userEnv={userEnv}
        setTotalCount={setTotalCount}
        pageFocus={pageFocus}
      />
    </div>
  );
}
