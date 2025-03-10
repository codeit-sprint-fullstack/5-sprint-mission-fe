import BestProductsList from "./BestProducts";
import ProductsList from "./ProductsList";

export default function MainProductsList() {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <BestProductsList />
        <ProductsList />
      </div>
    </>
  );
}
