import { useState, useEffect } from 'react';
import { SellingItem } from './SellingItem';
import { SelectPage } from '../SelectPage/SelectPage';

import '../../../styles/SellingItemList.css';
import { PostItem } from './PostItem';
import { OrderBy } from './OrderBy';
import icSearchImg from '../../../assets/ic_search.png'

export function SellingItemList({
  order,
  setOrder,
  page,
  setPage,
  pageSize,
  setPageSize,
  keyword,
  setKeyword,
  userEnv,
  totalCount,
  setTotalCount,
}) {

  const [products, setProducts] = useState([]);
  const [mod, setMod] = useState('get');

  function currentEnv() {
    if(userEnv === 'desktop') return 'productList';
    if(userEnv === 'tablet') return 'tabletProductList';
    if(userEnv === 'mobile') return 'mobileProductList';
  }

  async function getProducts() {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${order}&keyword=${keyword}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const result = await response.json();
    setProducts(result.list);
    setTotalCount(result.totalCount);
  }

  useEffect(() => {
    getProducts();
  }, [page, pageSize, keyword, order]);

  function handleSearchInput(e) {
    setKeyword(e.target.value);
  }

  function handlePostModClick(e) {
    setMod('post');
  }

  return (
    <>
    <div>
      {mod === 'get' && (
        <div className='sellingItemList'>
          {
            userEnv !== 'mobile'?
            <div className="listTitle">
            <h3>판매 중인 상품</h3>
            <div className="productUI">
              <img className='searchImg' src={icSearchImg} />
              <input className='searchInput' onChange={handleSearchInput} />
              <button className='postPageButton' >상품 등록하기</button>
              {/* 나중에 상품 등록 페이지 넘어갈 때 focusPage useState걸어서 SelectPage에 useEffect 적용 */}
              
              <OrderBy order={order} setOrder={setOrder} userEnv={userEnv} />
            </div>
          </div>:
          <div>
            {/* 모바일 버전 */}
            <div className='mobileSellingHead'>
              <h3>판매 중인 상품</h3>
              <button className='postPageButton' >상품 등록하기</button>
            </div>
            <div className="productUI">
              <img className='searchImg' src={icSearchImg} />
              <input className='searchInputMobile' onChange={handleSearchInput} />
              <OrderBy order={order} setOrder={setOrder} userEnv={userEnv} />
            </div>
          </div>
          }
          <div className={currentEnv()}>
            {products.map((product, key) => (
              <SellingItem key={key} product={product} />
            ))}
          </div>
          <SelectPage page={page} setPage={setPage} totalCount={totalCount} pageSize={pageSize} products={products} />
        </div>
      )}
    </div>
      {mod === 'post' && (
        <div>
          <PostItem setMod={setMod} />
        </div>
      )}
      </>
  );
}
