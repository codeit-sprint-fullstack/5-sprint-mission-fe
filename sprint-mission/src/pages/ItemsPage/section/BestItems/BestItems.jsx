import "./BestItems.css";
import { ItemCard } from "../ui/ItemCard";
import { SCREEN_SIZES } from "../../../../shared/hooks/useScreenSize";
import { usePageSize } from "../../../../shared/hooks/usePageSize";
import { useBestItems } from "./hooks/useBestItems";

const SCREEN_SIZES_TO_PAGE_SIZE = {
  [SCREEN_SIZES.MOBILE]: 1,
  [SCREEN_SIZES.TABLET]: 2,
  [SCREEN_SIZES.DESKTOP]: 4,
};

export function BestItems() {
  const { pageSize } = usePageSize(SCREEN_SIZES_TO_PAGE_SIZE); //반응형으로 pageSize 가져오기
  const { productList } = useBestItems(pageSize);

  return (
    <section id="best-items">
      <p className="section-title">베스트 상품</p>

      <div className="cards-box">
        {productList.map((product, idx) => (
          <ItemCard product={product} key={idx} />
        ))}
      </div>
    </section>
  );
}
