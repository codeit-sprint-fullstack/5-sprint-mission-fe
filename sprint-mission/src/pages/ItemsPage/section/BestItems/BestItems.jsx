import "./BestItems.css";
import { ItemCard } from "../common/ui/ItemCard";
import { ORDER_BY } from "../../../../utils/APIs/getItemsListAPI";
import { Typo, typoStyles } from "../../../../shared/Typo/Typo";
import { useMediaQuery } from "../../../../shared/hooks/mediaQueryHook";
import { useItemsFetch } from "../common/hooks/itemsFetchHook";
import { useState, useEffect } from "react";
import { SkeletonCard } from "../common/ui/SkeletonCard";

//sizeConfig
const SCREEN_SIZES_TO_PAGE_SIZE = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
};

export function BestItems() {
  const screenSize = useMediaQuery();
  const limit = SCREEN_SIZES_TO_PAGE_SIZE[screenSize];
  const [params, setParams] = useState({
    limit, //현재 screenSize에 해당하는 limit 쿼리로 전달
    sort: ORDER_BY.FAVORITE.value, //정렬 기준: 좋아요순
  });

  //screenSize가 변경될 때 쿼리의 limit만 업데이트
  useEffect(() => {
    setParams((prev) => ({ ...prev, limit }));
  }, [limit]);

  //api호출
  const { productList, isLoading } = useItemsFetch(params);

  //XXX: 스켈레톤 ui는 일부러 시간을 지연시키고 보여주기도 함(useItemsFetch에서 최소 지연 시간 설정)
  //XXX: https://tech.kakaopay.com/post/skeleton-ui-idea/
  const isShowSkeleton = isLoading || !productList.length;

  return (
    <section id="best-items">
      <Typo
        className={`${typoStyles.textXlBold} section-title`}
        content="베스트 상품"
      />
      <div className="cards-box">
        {isShowSkeleton
          ? Array.from({ length: limit }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : productList.map((product, idx) => (
              <ItemCard product={product} key={idx} />
            ))}
      </div>
    </section>
  );
}
