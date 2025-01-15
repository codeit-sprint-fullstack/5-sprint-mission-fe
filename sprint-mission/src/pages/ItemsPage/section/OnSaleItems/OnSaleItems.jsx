import "./OnSaleItems.css";
import { SearchItems } from "./ui/SearchItems";
import { PostItems } from "./ui/PostItems";
import { SortItems } from "./ui/SortItems";
import { ItemCard } from "../ui/ItemCard";
import { PaginationItems } from "./ui/PaginationItems";
import { Typo, typoStyles } from "../../../../shared/Typo/Typo";
import { useMediaQuery } from "../../../../shared/store/useScreenSizeStore";
import { useItemsFetch } from "../hooks/useItemsFetch";
import { useCallback, useEffect, useState } from "react";

//sizeConfig
const SCREEN_SIZES_TO_PAGE_SIZE = {
  MOBILE: 4,
  TABLET: 6,
  DESKTOP: 10,
};

export function OnSaleItems() {
  const screenSize = useMediaQuery();
  const pageSize = SCREEN_SIZES_TO_PAGE_SIZE[screenSize];
  const [params, setParams] = useState({
    pageSize, //현재 screenSize에 해당하는 pageSize 쿼리로 전달
  });

  //screenSize가 변경될 때 쿼리의 pageSize만 업데이트
  useEffect(() => {
    setParams((prev) => ({ ...prev, pageSize }));
  }, [screenSize]);

  /**
   * 파라미터 업데이트
   * @description 기존의 파라미터 복사, 새로운 파라미터를 기존 상태에 추가(덮어씌우기)
   */
  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({ ...prev, ...newParams })); //FIXME: 페이지네이션 동작이 어색해서 page 파라미터 업데이트 방식을 수정해야할 것 같은데 잘 모르겠다
  }, []);

  //api 호출
  const { productList, totalCount, isLoading } = useItemsFetch(params);
  const totalPageCount = Math.ceil(totalCount / params.pageSize); //페이지네이션에 필요한 전체 페이지 수 계산

  return (
    <section id="on-sale-items">
      <div className="section-top">
        <Typo
          className={`${typoStyles.textXlBold} section-title`}
          content="판매 중인 상품"
        />
        <div className="utility-box">
          <SearchItems onSearch={(keyword) => updateParams({ keyword })} />
          <PostItems />
          <SortItems onSortChange={(orderBy) => updateParams({ orderBy })} />
        </div>
      </div>

      <div className="cards-box">
        {productList.map((product, idx) => (
          <ItemCard product={product} key={idx} isLoading={isLoading} />
        ))}
      </div>

      <PaginationItems
        currentPage={params.page}
        totalPageCount={totalPageCount}
        onPageChange={(page) => updateParams({ page })}
      />
    </section>
  );
}
