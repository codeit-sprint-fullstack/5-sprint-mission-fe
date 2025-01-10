import { useEffect, useState } from "react";
import { getProductList } from "../../../apis/productService";
import useFetch from "../../../common/hooks/useFetch";
import useDeviceType from "../../../common/hooks/useDeviceType";
import Product from "../../components/Product";
import ProductSkeleton from "../../components/ProductSkeleton";
import { SORT_TYPE } from "../../../common/components/ProductFilter";
import _ from "lodash";

const PAGE_SIZE_BY_DEVICE_TYPE = {
  PC: { pageSize: 4, ui: "grid-cols-4" },
  Tablet: { pageSize: 2, ui: "grid-cols-2" },
  Mobile: { pageSize: 1, ui: "grid-cols-1" },
};

export default function ProductForBest() {
  const deviceType = useDeviceType();
  const [query, setQuery] = useState({
    page: 1,
    pageSize: PAGE_SIZE_BY_DEVICE_TYPE[deviceType].pageSize,
    orderBy: SORT_TYPE.FAVORITE.key,
  });
  const [productList, setProductList] = useState([]);
  const { data, isLoading, error } = useFetch(getProductList, query);

  // width에 따라서 pageSize 변경
  useEffect(() => {
    const pageSize = PAGE_SIZE_BY_DEVICE_TYPE[deviceType].pageSize;
    setQuery((prevQuery) => {
      if (prevQuery.pageSize === pageSize) return prevQuery; // 중복 업데이트 방지
      return { ...prevQuery, pageSize };
    });
  }, [deviceType]);

  // fetch 후 중복방지 업데이트
  useEffect(() => {
    const newProductList = data?.list || []; // 데이터가 없으면 빈 배열

    setProductList((prevProductList) => {
      if (_.isEqual(prevProductList, newProductList)) return prevProductList;
      return newProductList;
    });
  }, [data]);

  if (error) return <p>데이터 가져오기 실패: {error}</p>; // 오류 발생 시 500 페이지로 이동 (수정 예정)

  return (
    <section className="w-full max-w-screen-xl flex flex-col gap-[16px] mt-[26px] tb:mt-[24px] md:mt-[18px]">
      <h2 className="text-gray-900 text-xl font-bold leading-[32px]">
        베스트 상품
      </h2>
      <div
        className={`grid gap-[24px] tb:gap-[10px] md:gap-[0px] ${PAGE_SIZE_BY_DEVICE_TYPE[deviceType].ui}`}
      >
        {!isLoading &&
          productList
            .slice(0, +query.pageSize)
            .map((data, idx) => <Product key={idx} data={data} />)}
        {isLoading &&
          Array.from({ length: query.pageSize }, (_, i) => i + 1).map((idx) => (
            <ProductSkeleton key={idx} />
          ))}
      </div>
    </section>
  );
}
