import { useEffect, useState } from "react";
import { getProductList } from "../../../apis/productService";
import useFetch from "../../../common/hooks/useFetch";
import useDeviceType from "../../../common/hooks/useDeviceType";
import Product from "../../components/Product";
import ProductSearch from "../../../common/components/ProductSearch";
import ProductFilter from "../../../common/components/ProductFilter";
import ProductSkeleton from "../../components/ProductSkeleton";
import Button from "../../../common/components/Button";
import Pagination from "../../components/Pagination";
import { SORT_TYPE } from "../../../common/components/ProductFilter";
import _ from "lodash";

const PAGE_SIZE_BY_DEVICE_TYPE = {
  PC: { pageSize: 10, ui: "grid-cols-5" },
  Tablet: { pageSize: 6, ui: "grid-cols-3" },
  Mobile: { pageSize: 4, ui: "grid-cols-2" },
};

export default function ProductForSale() {
  const deviceType = useDeviceType();
  const [query, setQuery] = useState({
    page: 1,
    pageSize: PAGE_SIZE_BY_DEVICE_TYPE[deviceType].pageSize,
    orderBy: SORT_TYPE.RECENT.key,
    keyword: "",
  });
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
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
    const newTotalCount = data?.totalCount || 0; // 데이터가 없으면 0

    setProductList((prevProductList) => {
      if (_.isEqual(prevProductList, newProductList)) return prevProductList;
      return newProductList;
    });
    setTotalCount((prevTotalCount) => {
      if (+prevTotalCount === +newTotalCount) return prevTotalCount;
      return newTotalCount;
    });
  }, [data]);

  if (error) return <p>데이터 가져오기 실패: {error}</p>; // 오류 발생 시 500 페이지로 이동 (수정 예정)

  return (
    <section>
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-[12px] items-center md:grid-cols-[auto_1fr_auto_auto] md: grid-rows-2">
        <div className="col-start-1 col-end-2">
          <h2 className="text-gray-900 text-xl font-bold leading-[32px]">
            판매 중인 상품
          </h2>
        </div>

        <div className="col-start-3 col-end-4 md:col-start-1 md:col-end-4 md:row-start-2 md:row-end-3">
          <ProductSearch onUpdate={setQuery} />
        </div>

        <div className="col-start-4 col-end-5 md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-2">
          <Button>상품 등록하기</Button>
        </div>

        <div className="col-start-5 col-end-6 md:col-start-4 md:col-end-5 md:row-start-2 md:row-end-3">
          <ProductFilter orderBy={query.orderBy} onUpdate={setQuery} />
        </div>
      </div>

      <div
        className={`grid ${PAGE_SIZE_BY_DEVICE_TYPE[deviceType].ui} grid-rows-2 gap-[24px] mt-[24px] mb-[43px] md:gap-[16px] md:mb-[40px] sm:gap-[8px] sm:mt-[16px]`}
      >
        {!isLoading &&
          productList.map((data, idx) => <Product key={idx} data={data} />)}

        {isLoading &&
          Array.from({ length: query.pageSize }, (_, i) => i + 1).map((idx) => (
            <ProductSkeleton key={idx} />
          ))}
      </div>

      <div className="flex justify-center mb-[140px]">
        <Pagination
          endIndex={Math.ceil(totalCount / query.pageSize)}
          query={query}
          onUpdate={setQuery}
        />
      </div>
    </section>
  );
}
