import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function BestProduct({ products = [] }) {
  const [maxProducts, setMaxProducts] = useState(1);

  useEffect(() => {
    const updateMaxProducts = () => {
      if (window.innerWidth >= 1280) setMaxProducts(3);
      else if (window.innerWidth >= 768) setMaxProducts(2);
      else setMaxProducts(1);
    };

    updateMaxProducts();
    window.addEventListener("resize", updateMaxProducts);
    return () => window.removeEventListener("resize", updateMaxProducts);
  }, []);

  const bestProducts = [...products]
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, maxProducts);

  return (
    <>
      <div className="flex flex-col items-start gap-[24px]">
        <section>
          <p className="text-xl text-custom-text-black-800 font-bold">
            베스트 상품
          </p>
        </section>

        <section className="flex w-full md:gap-[16px] xl:gap-[24px]">
          {bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </>
  );
}
