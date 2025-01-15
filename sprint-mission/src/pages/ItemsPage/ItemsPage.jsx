import "./ItemsPage.css";
import { BestItems } from "./section/BestItems/BestItems";
import { OnSaleItems } from "./section/OnSaleItems/OnSaleItems";
import { ItemsPageLayout } from "./ItemsPageLayout";

export function ItemsPage() {
  return (
    <ItemsPageLayout>
      <BestItems />
      <OnSaleItems />
    </ItemsPageLayout>
  );
}
