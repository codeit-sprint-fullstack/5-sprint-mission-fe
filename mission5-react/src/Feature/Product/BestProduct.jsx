import { BestProductGet } from "./BestProductGet";
import "./Product.css";

export function BestProduct() {
  return (
    <div className="BestProductArea">
      <div className="titleBestProduct">베스트 상품</div>
      <BestProductGet />
    </div>
  );
}
