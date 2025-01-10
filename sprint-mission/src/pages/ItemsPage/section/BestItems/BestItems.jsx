import "./BestItems.css";
import { ItemCard } from "../ui/ItemCard";
import { ORDER_BY } from "../../../../utils/APIs/getItemsListAPI";
import { Typo, typoStyles } from "../../../../shared/Typo/Typo";
import { useMediaQuery } from "../../../../shared/store/useScreenSizeStore";
import { useItemsFetch } from "../hooks/useItemsFetch";
import { useState, useEffect } from "react";

//sizeConfig
const SCREEN_SIZES_TO_PAGE_SIZE = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
};

export function BestItems() {
  const screenSize = useMediaQuery();
  const pageSize = SCREEN_SIZES_TO_PAGE_SIZE[screenSize];
  const [params, setParams] = useState({
    pageSize, //현재 screenSize에 해당하는 pageSize 쿼리로 전달
    orderBy: ORDER_BY.FAVORITE.value, //정렬 기준: 좋아요순
  });

  //screenSize가 변경될 때 쿼리의 pageSize만 업데이트
  useEffect(() => {
    setParams((prev) => ({ ...prev, pageSize }));
  }, [screenSize]);

  //api호출
  const { productList, isLoading } = useItemsFetch(params);

  return (
    <section id="best-items">
      <Typo
        className={`${typoStyles.textXlBold} section-title`}
        content="베스트 상품"
      />
      <div className="cards-box">
        {productList.map((product, idx) => (
          <ItemCard product={product} key={idx} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}
