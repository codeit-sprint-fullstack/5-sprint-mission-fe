import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Dropdown from "./Dropdown";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1199px) and (min-width: 744px) {
    flex-direction: row;
    gap: 1rem;
  }

  @media (max-width: 743px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;

  @media (max-width: 1199px) and (min-width: 744px) {
    justify-content: space-between;
  }

  @media (max-width: 743px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const BestProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4);
  gap: 1rem;

  @media (max-width: 1199px) and (min-width: 744px) {
    grid-template-columns: repeat(2);
  }

  @media (max-width: 743px) {
    grid-template-columns: repeat(1);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const ProductManager = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [bestItemsPerPage, setBestItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1199) {
        setItemsPerPage(10);
        setBestItemsPerPage(4);
      } else if (window.innerWidth > 743) {
        setItemsPerPage(6);
        setBestItemsPerPage(2);
      } else {
        setItemsPerPage(4);
        setBestItemsPerPage(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products"
        );
        const data = response.data.list;

        const best = [...data]
          .sort((a, b) => b.favorite - a.favorite)
          .slice(0, bestItemsPerPage);
        setBestProducts(best);

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [bestItemsPerPage]);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (type === "favorite") return b.favorite - a.favorite;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setFilteredProducts(sortedProducts);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <h2>베스트 상품</h2>
      <BestProductContainer>
        <ProductList products={bestProducts} isBest={true} />
      </BestProductContainer>

      <ProductContainer>
        <h2>판매 중인 상품</h2>
        <FlexContainer>
          <SearchBar onSearch={handleSearch} />
          <AddProduct />
          <Dropdown onSortChange={handleSortChange} />
        </FlexContainer>
      </ProductContainer>

      <ProductList products={paginatedProducts} isBest={false} />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default ProductManager;
