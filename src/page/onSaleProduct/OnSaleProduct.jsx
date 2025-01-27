import React, { useState, useEffect } from "react";
import { ProductDropdown } from "./customselect/costomselect";
import { Pagination } from "../../components/Share/pagination";
import { fetchProductList } from "../../api/Productapi";
import Like from "../../components/img/Like_Icon.png";
import DefaultImg from "../../components/img/baseImg.png";
import { NavLink } from "react-router-dom";

export function OnSaleProduct({
  title,
  page,
  pageSize,
  setPageSize,
  orderBy,
  setOrderBy,
  keyword,
  setKeyword,
  setCurrentPage,
}) {
  const [products, setProducts] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProductList(page, pageSize, orderBy, keyword).then((data) => {
      setProducts(data);
    });
  }, [page, pageSize, orderBy, keyword]);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setPageSize(10);
    } else if (window.innerWidth >= 768) {
      setPageSize(6);
    } else {
      setPageSize(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOrderByChange = (selectedOption) => {
    setOrderBy(selectedOption);
  };

  return (
    <div className="flex flex-col justify-center gap-4 pt-24 px-96 max-2xl:px-2">
      <header className="w-full flex justify-between items-center gap-16 max-md:relative">
        <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap max-md:pb-10">
          {title}
        </h2>
        <div className="flex gap-2  max-md:w-auto max-md:pb-10">
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-80 max-md:w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-400 max-md:absolute max-md:left-0 max-md:top-10 focus:outline-none"
          />
          <NavLink
            to="/registration"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg whitespace-nowrap hover:bg-blue-600"
          >
            상품 등록하기
          </NavLink>
          <ProductDropdown
            className="max-md:absolute max-md:right-0"
            orderBy={orderBy}
            setOrderBy={handleOrderByChange}
          />
        </div>
      </header>

      <div
        className={`grid ${
          pageSize === 10
            ? "grid-cols-5"
            : pageSize === 6
            ? "grid-cols-3"
            : "grid-cols-2"
        } gap-4`}
      >
        {Array.isArray(products) &&
          products.slice(0, pageSize).map((product) => (
            <div
              key={product.id}
              className="flex flex-col border rounded-lg overflow-hidden"
            >
              <div className="w-full h-56 flex justify-center items-center bg-gray-50">
                <img
                  src={DefaultImg}
                  alt={product.name}
                  className="w-28 h-32 bg-gray-50 object-center"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700 font-medium">
                  {product.price.toLocaleString()}원
                </p>
                <div className="flex items-center gap-2">
                  <img src={Like} alt="like btn" className="w-4 h-4" />
                  <span className="text-gray-500 text-sm">
                    240
                    {/* {product.favoriteCount} */}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(100 / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
