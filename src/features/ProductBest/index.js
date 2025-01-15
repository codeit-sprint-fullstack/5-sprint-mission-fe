import ProductItem from "shared/ProductItem";
import GetProducts from "features/ProductGeneral/api/GetProducts";
import { useEffect, useState } from "react";
import { hooks } from "shared";
import "./index.css";

const ProductBest = () => {
  const [products, setProducts] = useState([]);
  const media = hooks.useMediaQuery("");
  const initColumn = media === "pc" ? 4 : media === "tablet" ? 2 : 1;
  const [column, setColumn] = useState(initColumn);

  const loadProducts = async ({}) => {
    const data = await GetProducts({
      page: 1,
      pageSize: column,
      orderBy: "favorite",
    });

    setProducts([...data.list]);

    return data;
  };

  useEffect(() => {
    setColumn(initColumn);
  }, [media]);

  useEffect(() => {
    loadProducts({});
  }, [column]);

  return (
    <div className="product__best">
      <h1>베스트 상품</h1>
      <div className="best-wrapper">
        {products.slice(0, column).map((p) => (
          <ProductItem
            key={p.id}
            name={p.name}
            price={p.price}
            images={p.images}
            favoriteCount={p.favoriteCount}
          ></ProductItem>
        ))}
      </div>
    </div>
  );
};

export default ProductBest;
