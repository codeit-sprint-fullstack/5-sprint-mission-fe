import ProductForBest from "./layouts/ProductForBest";
import ProductForSale from "./layouts/ProductForSale";

export default function ItemsPage() {
  return (
    <main className="w-full max-w-screen-xl my-0 flex flex-col gap-[40px] mb:gap-[24px] mx-auto px-[24px] md:px-[16px]">
      <ProductForBest />
      <ProductForSale />
    </main>
  );
}
