import { useState, useEffect } from 'react';
import '../../../styles/BestItemList.css';
import { BestItem } from './BestItem';

export function BestItemList({pageSize,keyword,page,userEnv,windowWidth}) {
  const [bestPageSize,setBestPageSize] = useState(4);
  const [bestProducts,setBestProducts] = useState([]);
  const [bestOrder,setBestOrder] = useState('favorite')
  const [bestPage,setBestPage] = useState(1);

  function currentEnv() {
    if(windowWidth >= 1200) return 'bestItemList';
    if(windowWidth >= 865 && windowWidth < 1200) return 'tabletBestItemList';
    if(windowWidth < 865) return 'mobileBestItemList';
  }

  useEffect(()=> {
    if(windowWidth >= 1200) setBestPageSize(4);
    if(windowWidth >= 865 && windowWidth < 1200) setBestPageSize(2);
    if(windowWidth < 865) setBestPageSize(1);
  },[windowWidth])

  async function getBestProducts() {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?page=${bestPage}&pageSize=${bestPageSize}&orderBy=${bestOrder}&keyword=${keyword}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const result = await response.json();
    setBestProducts(result.list);
  }

  useEffect(() => {
    setTimeout(getBestProducts, 100);
  }, [keyword, bestPageSize]);


  return (
    <div>
      <h3 className="title">베스트 상품</h3>
      <div className={currentEnv()}>
        <BestItem bestProducts={bestProducts}/>
      </div>
    </div>
  );
}
