import { Product, SelectBox } from "features";
import "./style.css";
import { Text } from "shared/ui";
import { Button } from "shared/ui";
import icSearch from "shared/assets/images/ic_search.png";
import { useState, useEffect } from "react";
import GetProducts from "shared/api/get-products";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { useDebounce } from "shared/hooks/useDebounce";
import { Pages } from "features/pages";
import { useNavigate } from "react-router-dom";

export const GeneralItems = () => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 400);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const media = useMediaQuery("");
  const initColumn = media === "pc" ? 5 : media === "tablet" ? 3 : 2;
  const [column, setColumn] = useState(initColumn);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

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
  const handleClickRegistration = () => {
    navigate("/registration");
  };

  useEffect(() => {
    setColumn(initColumn);
    if (totalCount !== 0 && (page - 1) * initColumn * 2 >= totalCount) {
      setPage(Math.ceil(totalCount / (2 * initColumn)));
    }
  }, [media]);
  useEffect(() => {
    loadProducts();
  }, [debouncedValue, orderBy, page, column]);

  return (
    <section className="general-product-wrapper">
      {/* filtering bar */}
      <div className="general-filter">
        <Text size={"xl"} weight={"bold"} style={{ color: "#1f2937" }}>
          판매 중인 상품
        </Text>
        <div className="filter-wrapper">
          <div className="search-wrapper">
            <img src={icSearch} alt=""></img>
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
          <Button size={"sm42"} handleClick={handleClickRegistration}>
            <Text size={"lg"} weight={"semibold"} style={{ color: "#f3f4f6" }}>
              상품 등록하기
            </Text>
          </Button>
        </div>
      </div>
      {/* items */}
      <div className="general-items">
        {products.map((product, i) => (
          <Product
            img={product.imgUrl}
            title={product.title}
            price={product.price}
            favorite={0}
          />
        ))}
      </div>
      <Pages
        page={page}
        changePage={(p) => handleChangePage(p)}
        maxPage={Math.ceil(totalCount / (2 * column))}
      ></Pages>
    </section>
  );
};
