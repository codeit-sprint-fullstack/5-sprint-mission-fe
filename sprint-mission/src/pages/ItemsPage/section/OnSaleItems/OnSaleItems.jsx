import "./OnSaleItems.css";
import { SearchItems } from "./ui/SearchItems";
import { PostItems } from "./ui/PostItems";
import { SortItems } from "./ui/SortItems";
import { ItemCard } from "../ui/ItemCard";
import { PaginationItems } from "./ui/PaginationItems";
import { useEffect, useState } from "react";

export function OnSaleItems() {
  // const [params, setParams] = useState({});

  // const handleChangeParams = () => {
  //   //TODO: 세터함수 수정
  //   setParams(...params);
  // };

  // const getApi = async () => {
  // const itemsData = await getItemsListAPI(params);
  //   const productList = itemsData.list;
  //   const totalCount = itemsData.totalCount;
  // };

  // useEffect(() => {
  //   getApi();
  // }, []);

  return (
    <section id="on-sale-items">
      <div className="section-top">
        <p className="section-title">판매 중인 상품</p>
        <div className="utility-box">
          <SearchItems />
          <PostItems />
          <SortItems />
        </div>
      </div>

      <div className="cards-box">
        <p>아이템</p>
        {/* <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard /> */}
      </div>

      <div className="section-bottom">
        <PaginationItems />
      </div>
    </section>
  );
}
