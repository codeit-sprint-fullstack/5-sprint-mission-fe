import React from "react";
import styled from "styled-components";
import { ProductCard, BestProductCard } from "./ProductCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ProductList = ({ products, isBest = false }) => {
  return (
    <Grid>
      {products.map((product) =>
        isBest ? (
          <BestProductCard key={product.id} product={product} />
        ) : (
          <ProductCard key={product.id} product={product} />
        )
      )}
    </Grid>
  );
};

export default ProductList;
