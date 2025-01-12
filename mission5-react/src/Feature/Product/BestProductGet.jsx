import axios from "axios";
import { useState, useEffect } from "react";
import IcHeart from "../../Assets/Ic_heart.png";

export function BestProductGet({
  page = 1,
  orderBy = "favorite",
  keyword = "",
}) {
  const [data, setData] = useState(null); // 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [pageSize, setPageSize] = useState(4); // 기본 페이지 크기

  // 화면 크기에 따라 pageSize 업데이트
  const updatePageSize = () => {
    const width = window.innerWidth;

    if (width <= 743) {
      setPageSize(1); // Mobile: 1개
    } else if (width <= 1199) {
      setPageSize(2); // Tablet: 2개
    } else {
      setPageSize(4); // Desktop: 4개
    }
  };

  // 화면 크기 변경 시, pageSize 업데이트
  useEffect(() => {
    updatePageSize(); // 컴포넌트가 처음 마운트될 때

    // 창 크기 변경 시에도 pageSize 업데이트
    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  useEffect(() => {
    const fetchBestProduct = async () => {
      try {
        const url = new URL("https://panda-market-api.vercel.app/products");
        // URL의 쿼리 파라미터 설정
        url.searchParams.set("page", page);
        url.searchParams.set("pageSize", pageSize);
        url.searchParams.set("orderBy", orderBy);
        // keyword가 비어있지 않으면 추가
        if (keyword) {
          url.searchParams.set("keyword", keyword);
        }

        // console.log("Request URL확인용", url.toString());

        // axios로 데이터를 가져옴
        const response = await axios.get(url.toString());
        // console.log("response data 확인용", response.data);
        // console.log("response data list 확인용", response.data.list);

        // 응답 데이터가 배열인지 확인
        if (Array.isArray(response.data.list)) {
          setData(response.data.list); // 배열이면 데이터를 상태에 저장
        } else {
          throw new Error("응답 데이터가 배열이 아닙니다.");
        }
      } catch (err) {
        // 오류 처리
        setError(err);
      } finally {
        // 로딩 상태 업데이트
        setLoading(false);
      }
    };

    fetchBestProduct(); // 비동기 함수 호출
  }, [page, pageSize, orderBy, keyword]); // 의존성 배열: 파라미터가 변경되면 다시 호출

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  // 오류 발생 시
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 데이터를 성공적으로 가져왔을 때
  return (
    <div id="containerBestProduct">
      {/* 데이터를 출력 */}
      <div id="bestProductList">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((product) => (
            <div key={product.id} id="bestProductCard">
              <img
                src={product.images[0]}
                alt={product.name}
                id="imageBestProduct"
              />
              <div id="stylesproductInfo">
                <p id="stylesproductName">{product.name}</p>
                {/* <p id="stylesproductDescription">{product.description}</p> */}
                <p id="stylesproductPrice">
                  {product.price.toLocaleString()}원
                </p>
                <p id="favoriteBestProduct">
                  <img src={IcHeart} />
                  {product.favoriteCount}
                </p>
                {/* <p id="stylesproductTags">Tags: {product.tags.join(", ")}</p> */}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p> // 데이터가 없을 경우 처리
        )}
      </div>
    </div>
  );
}
