import { useState, useEffect } from 'react';
import mockImage from '../../../assets/images/productList/mockProductImage.png';
import useFetchProducts from '../core/hooks/useFetchProducts.js';

export default function ProductList({ value }) {
  const [page, setPage] = useState(1);
  const { products, loading, error } = useFetchProducts(page, value);

  const handleScroll = () => {
    if (loading) return;

    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottom = document.documentElement.offsetHeight;

    if (scrollPosition >= bottom) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (loading && page === 1) return <div className="font-bold text-2xl">로딩중...</div>;
  if (error) return <div className="font-bold text-red-500">로딩 에러 발생: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-5 gap-5">
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="flex flex-col justify-center">
            <img src={mockImage} alt="product" />
            <p className="mt-3 font-bold">{product.name}</p>
            <p className="mt-1">{product.price}원</p>
            <p className="mt-1">♡ 0</p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center mt-8">등록된 제품이 없습니다.</p>
      )}
      {loading && <div className="font-bold text-2xl text-center">하이 나 판다. 조금만 기다리라구</div>}
    </div>
  );
}
