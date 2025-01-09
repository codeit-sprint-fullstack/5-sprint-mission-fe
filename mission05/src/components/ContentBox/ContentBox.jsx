import { BestItemList } from './BestItemList/BestItemList';
import { SellingItemList } from './SellingItemList/SellingItemList';
import { useEffect, useState } from 'react';

export function ContentBox({windowWidth , userEnv, setUserEnv}) {
  const [order, setOrder] = useState('recent');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // 모바일: 4 , 태블릿: 6, 데스크탑: 10
  const [keyword, setKeyword] = useState('');
  const [totalCount,setTotalCount] = useState(1);

  useEffect(()=> {
    if(windowWidth >= 1200) setPageSize(10);
    if(windowWidth < 1200 && windowWidth >= 744) setPageSize(6);
    if(windowWidth < 744) setPageSize(4);
  },[windowWidth])

  function userEnvCheck() {
    if(pageSize === 10){
      setUserEnv('desktop');
    };
    if(pageSize === 6){
      setUserEnv('tablet');
    };
    if(pageSize === 4){
      setUserEnv('mobile');
    };
  }

  useEffect(()=> {
    userEnvCheck();
  },[pageSize])

  return (
    <div className={userEnv}>
      <BestItemList 
        page={page}
        pageSize={pageSize}
        keyword={keyword}
        userEnv={userEnv}
        windowWidth={windowWidth}
      />
      <SellingItemList
        order={order}
        setOrder={setOrder}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        keyword={keyword}
        setKeyword={setKeyword}
        userEnv={userEnv}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
      />
    </div>
  );
}
