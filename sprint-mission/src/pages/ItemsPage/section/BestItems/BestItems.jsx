import "./BestItems.css";
import { ItemCard } from "../ui/ItemCard";
import { useBestItems } from "./hooks/useBestItems";

export function BestItems() {
  const { productList } = useBestItems();

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
