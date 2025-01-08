import "./OnSaleItems.css";
import { SearchItems } from "./ui/SearchItems";
import { PostItems } from "./ui/PostItems";
import { SortItems } from "./ui/SortItems";
import { ItemCard } from "../ui/ItemCard";
import { PaginationItems } from "./ui/PaginationItems";
import { usePageSize } from "./hooks/usePageSize";
import { useOnSaleItems } from "./hooks/useOnSaleItems";
import { useEffect, useState } from "react";

export function OnSaleItems() {
  const { pageSize } = usePageSize(); //반응형으로 pageSize 가져오기
  const [params, setParams] = useState({
    // page: 1,
    pageSize,
    // orderBy: "recent",
  }); //현재 스크린사이즈에 따른 pageSize 초기값 설정

  //스크린사이즈 달라지면 파라미터 업데이트
  useEffect(() => {
    setParams((prev) => ({ ...prev, pageSize }));
  }, [pageSize]);

  const { productList, totalPageCount } = useOnSaleItems(params); //변경된 params를 전달하여 받은 데이터 가져오기

  //파라미터 업데이트: 기존의 파라미터 복사하고 새로운 파라미터를 기존 상태에 추가(덮어씌우기)
  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return (
    <section id="on-sale-items">
      <div className="section-top">
        <p className="section-title">판매 중인 상품</p>
        <div className="utility-box">
          <SearchItems onSearch={(keyword) => updateParams({ keyword })} />
          <PostItems />
          <SortItems onSortChange={(orderBy) => updateParams({ orderBy })} />
        </div>
      </div>

      <div className="cards-box">
        {productList.map((product, idx) => (
          <ItemCard product={product} key={idx} />
        ))}
      </div>

      <div className="section-bottom">
        <PaginationItems
          currentPage={params.page}
          totalPageCount={totalPageCount}
          onPageChange={(page) => updateParams({ page })}
        />
      </div>
    </section>
  );
}