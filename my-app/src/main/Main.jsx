import { useEffect, useState } from "react";
import { ArticleBest } from "./articleBest/ArticleBest.jsx";
import { ArticleSell } from "./articleSell/ArticleSell.jsx";
import { ArticlePage } from "./articlePage/ArticlePage.jsx";
import { apiList } from "../api/Api.js";
import "./main.css";

export function Main() {
  //pc : 1200px이상  tablet : 744px이상  mobile : 743px이하 375px이상
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("recent");
  const [totalCount, setTotalCount] = useState(0);
  const [favoriteApiData, setFavoriteApiData] = useState([]);
  const [favoriteApiPage, setFavoriteApiPage] = useState(1);
  const [favoriteApiPageSize, setFavoriteApiPageSize] = useState(4);
  const [favoriteApiOrderBy, setFavoriteApiOrderBy] = useState("favorite");

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log("useEffect 실행 근데 Resize를 곁들인" + screenWidth);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
      console.log(
        "useEffect 실행 근데 Resize를 곁들인 여긴 뭐 remove일때인거 같은데" +
          screenWidth
      );

      if (screenWidth >= 1200) {
        setPageSize(10);
        setFavoriteApiPageSize(4);
        console.log("1200이상" + pageSize);
      } else if (screenWidth < 1200 && screenWidth >= 744) {
        setPageSize(6);
        setFavoriteApiPageSize(2);
        console.log("744이상" + pageSize);
      } else if (screenWidth <= 743 && screenWidth > 375) {
        setPageSize(4);
        setFavoriteApiPageSize(1);
        console.log("375이상" + pageSize);
      }
    };
  }, [screenWidth]);

  useEffect(() => {
    console.log("useEffect 실행");
    const getApiData = async () => {
      try {
        console.log("API 실행");
        const response = await apiList.getProductListInquiry(
          page,
          pageSize,
          orderBy
        );
        const bestResponse = await apiList.getProductListInquiry(
          favoriteApiPage,
          favoriteApiPageSize,
          favoriteApiOrderBy
        );
        setApiData(response);
        setFavoriteApiData(bestResponse);
      } catch (error) {
        console.error(" Error :", error);
      }
    };

    getApiData();
  }, [page, pageSize, favoriteApiPageSize]);

  useEffect(() => {
    console.log("orderByUseEffect 실행");
    const weird = async () => {
      try {
        console.log("API 실행");
        const response = await apiList.getProductListInquiry(
          page,
          pageSize,
          orderBy
        );
        setApiData(response);
      } catch (error) {
        console.error(" Error :", error);
      }
    };
    weird();
  }, [orderBy]);

  // console.log("page 현재 페이지", page);

  if (!apiData) return <></>;

  return (
    <div id="main">
      <ArticleBest info={favoriteApiData.list}></ArticleBest>
      <ArticleSell
        info={apiData.list}
        selectedOption={orderBy}
        setSelectedOption={setOrderBy}
      ></ArticleSell>
      <ArticlePage
        totalCount={apiData.totalCount}
        currentPage={page}
        SetCurrentPage={setPage}
      ></ArticlePage>
    </div>
  );
}
