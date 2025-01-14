import ProductItem from "shared/ProductItem";
import GetProducts from "./api/GetProducts";
import Pages from "./ui/Pages";
import Button from "shared/buttons/Button";
import SelectBox from "shared/SelectBox";
import { useEffect, useState } from "react";
import ic_search from "shared/assets/icon/ic_search.png";
import { hooks } from "shared";
import "./index.css";

const ProductGeneral = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const [orderBy, setOrderBy] = useState("recent");
  const [totalCount, setTotalCount] = useState(0);
  const media = hooks.useMediaQuery("");
  const initColumn = media === "pc" ? 5 : media === "tablet" ? 3 : 2;
  const [column, setColumn] = useState(initColumn);

  const loadProducts = async () => {
    const data = await GetProducts({
      page,
      pageSize: 2 * column,
      orderBy,
      keyword: inputValue,
    });

    setProducts([...data.list]);
    setTotalCount(data.totalCount);

    return data;
  };

  const handleFilteringByInputValue = (e) => {
    setInputValue(e.target.value);
    setPage(1);
  };
  const handleFilteringByOrderBy = (o) => {
    setOrderBy(o);
    setPage(1);
  };
  const handleChangePage = (p) => {
    if (page === p) return;
    setPage(p);
  };

  useEffect(() => {
    setColumn(initColumn);
  }, [media]);
  useEffect(() => {
    loadProducts();
  }, [debouncedValue, orderBy, page, column]);

  return (
    <div className="product__general">
      <div className="general-filter">
        <h1>판매 중인 상품</h1>
        <div className="filter-wrapper">
          <div className="search-wrapper">
            <img src={ic_search}></img>
            <input
              value={inputValue}
              placeholder="검색할 상품을 입력해주세요"
              onChange={(e) => handleFilteringByInputValue(e)}
            ></input>
          </div>
          <SelectBox
            orderBy={orderBy}
            handleOrderBy={(o) => handleFilteringByOrderBy(o)}
          ></SelectBox>
          <Button size={"sm-42"}>상품 등록하기</Button>
        </div>
      </div>
      <div className="general-wrapper">
        {products.slice(0, 2 * column).map((p) => (
          <ProductItem
            key={p.id}
            name={p.name}
            price={p.price}
            images={p.images}
            favoriteCount={p.favoriteCount}
          ></ProductItem>
        ))}
      </div>
      <Pages
        page={page}
        changePage={(p) => handleChangePage(p)}
        maxPage={Math.ceil(totalCount / (2 * column))}
      ></Pages>
    </div>
  );
};

export default ProductGeneral;
