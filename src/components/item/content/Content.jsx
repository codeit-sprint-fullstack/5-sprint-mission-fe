import { useEffect, useState } from "react";
import { ArticleSell } from "./articleSell/ArticleSell.jsx";
import { ArticlePage } from "./articlePage/ArticlePage.jsx";
import { apiList } from "../../api/api.js";
import "./Content.css";

export function Content() {
  //pc : 1200px이상  tablet : 744px이상  mobile : 743px이하 375px이상
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 화면 크기가 변경 되면 pc,tablet, mobile로 나오는 상품 개수 변화
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    // 화면 변화가 있으면 체크 하는 놈
    window.addEventListener("resize", handleResize);
    console.log("useEffect 실행 근데 Resize를 곁들인" + screenWidth);
    return () => {
      // 변화가 있을 때만 해야지 계속 실행 되면 안되니까 실행 중지 하는놈
      window.removeEventListener("resize", handleResize);
      console.log(
        "useEffect 실행 근데 Resize를 곁들인 여긴 뭐 remove일때인거 같은데" +
          screenWidth
      );

      if (screenWidth >= 1200) {
        setLimit(10);
        console.log("1200이상" + limit);
      } else if (screenWidth < 1200 && screenWidth >= 744) {
        setLimit(6);
        console.log("744이상" + limit);
      } else if (screenWidth <= 743 && screenWidth > 375) {
        setLimit(4);
        console.log("375이상" + limit);
      }
    };
  }, [screenWidth, limit]);

  useEffect(() => {
    console.log("useEffect 실행");
    const getApiData = async () => {
      try {
        console.log("API 실행");
        const response = await apiList.ProductList(currentPage, limit);
        console.log("API 응답:", response); // 응답 데이터 로그 출력
        console.log("API 응답:", response.data); // 응답 데이터 로그 출력
        setApiData(response);
      } catch (error) {
        console.error(" Error :", error);
      }
    };

    getApiData();
  }, [currentPage, limit]);

  console.log("page 현재 페이지", currentPage);

  if (!apiData) return <>로딩 중{console.log("로딩이라니 : " + apiData)}</>;

  return (
    <div id="content-container">
      <ArticleSell info={apiData.data}></ArticleSell>
      <ArticlePage
        totalPages={apiData.totalPages}
        currentPage={currentPage}
        SetCurrentPage={setCurrentPage}
      ></ArticlePage>
    </div>
  );
}
