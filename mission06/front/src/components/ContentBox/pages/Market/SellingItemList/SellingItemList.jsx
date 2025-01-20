import { useState, useEffect } from 'react';
import { SellingItem } from './SellingItem';
import { SelectPage } from '../SelectPage/SelectPage';

import '../../../../../styles/SellingItemList.css';
import { OrderBy } from './OrderBy';
import icSearchImg from '../../../../../assets/ic_search.png';
import { Link } from 'react-router-dom';

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
  focusPage,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function currentEnv() {
    if (userEnv === 'desktop') return 'productList';
    if (userEnv === 'tablet') return 'tabletProductList';
    if (userEnv === 'mobile') return 'mobileProductList';
  }
  async function getProducts() {

      const response = await fetch(
        `https://todo-api-xse8.onrender.com/products?page=${page}&pageSize=${pageSize}&orderBy=${order}&keyword=${keyword}`,
        {
          method: 'GET',
        }
      );
      const result = await response.json();
      setProducts(result.list);
      setTotalCount(result.totalCount);

  }

  useEffect(() => {
    const fetchDatas = () => {
      setIsLoading(true);
      getProducts();
      setIsLoading(false);
    }
    if(!isLoading) fetchDatas();
  }, [page, pageSize, keyword, order]);

  useEffect(() => {
    setPage(1);
  }, [keyword, pageSize]);

  function handleSearchInput(e) {
    setKeyword(e.target.value);
  }


  return (
    <>
      <div>
        <div className="sellingItemList">
          {userEnv !== 'mobile' ? (
            <div className="listTitle">
              <h3>판매 중인 상품</h3>
              <div className="productUI">
                <input className="searchInput" onChange={handleSearchInput}  placeholder='검색할 상품을 입력해주세요'/>
                <Link to="/registration">
                  <button className="postPageButton">상품 등록하기</button>
                </Link>

                <OrderBy order={order} setOrder={setOrder} userEnv={userEnv} />
              </div>
            </div>
          ) : (
            <div>
              {/* 모바일 버전 */}
              <div className="mobileSellingHead">
                <h3>판매 중인 상품</h3>
                <Link to="/registration">
                  <button className="postPageButton">상품 등록하기</button>
                </Link>
              </div>
              <div className="productUI">
                <img className="searchImg" src={icSearchImg} />
                <input
                  className="searchInputMobile"
                  onChange={handleSearchInput}
                  placeholder='검색할 상품을 입력해주세요'
                />
                <OrderBy order={order} setOrder={setOrder} userEnv={userEnv} />
              </div>
            </div>
          )}
          {products && (
            <>
              <div className={currentEnv()}>
                {products.map((product, key) => (
                  <SellingItem key={key} product={product} />
                ))}
              </div>
              <SelectPage
                page={page}
                setPage={setPage}
                totalCount={totalCount}
                pageSize={pageSize}
                products={products}
                focusPage={focusPage}
              />
            </>
          )}
          {
            !products && <div style={{textAlign:'center', fontSize:'2rem', marginTop:'5rem'}}>상품 데이터를 불러오는 중입니다...</div>
          }
        </div>
      </div>
    </>
  );
}
