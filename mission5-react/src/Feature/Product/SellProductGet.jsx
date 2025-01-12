import axios from "axios";
import { useState, useEffect } from "react";
import { SellProductPagination } from "./SellProductPagination";
import Noimg from "../../Assets/Noimage.png";
import IcHeart from "../../Assets/Ic_heart.png";

export function SellProductGet({ page = 1, orderBy = "recent", keyword = "" }) {
  const [data, setData] = useState(null); // 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [totalCount, setTotalCount] = useState(0); // 페이지네이션-전체 데이터 개수
  const [currentPage, setCurrentPage] = useState(page); //페이지네이션-현재 페이지 상태
  const [pageSize, setPageSize] = useState(10); // 기본 페이지 크기

  // 화면 크기에 따라 pageSize 업데이트
  const updatePageSize = () => {
    const width = window.innerWidth;

    if (width <= 743) {
      setPageSize(4); // Mobile: 4개
    } else if (width <= 1199) {
      setPageSize(6); // Tablet: 6개
    } else {
      setPageSize(10); // Desktop: 10개
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
    const fetchSellProduct = async () => {
      try {
        setLoading(true); //요청 시작 시 로딩상태 true
        const url = new URL("https://panda-market-api.vercel.app/products");
        url.searchParams.set("page", currentPage);
        url.searchParams.set("pageSize", pageSize);
        url.searchParams.set("orderBy", orderBy); // orderBy를 요청 파라미터에 포함
        if (keyword) {
          url.searchParams.set("keyword", keyword);
        }
        const response = await axios.get(url.toString());

        if (Array.isArray(response.data.list)) {
          setData(response.data.list); // 배열이면 데이터를 상태에 저장
          setTotalCount(response.data.totalCount); // 전체 데이터 개수 업데이트
        } else {
          throw new Error("응답 데이터가 배열이 아닙니다.");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); //요청 완료 후 로딩상태 false
      }
    };

    fetchSellProduct(); // 비동기 함수 호출
  }, [currentPage, pageSize, orderBy, keyword]); // orderBy를 의존성 배열에 포함

  // 로딩 중일 때
  if (loading) {
    return <div>로딩중입니다.</div>;
  }

  // 오류 발생 시
  if (error) {
    return <div>에러메세지: {error.message}</div>;
  }

  const getImageUrl = (imageUrl) => {
    // 이미지 URL이 비어있는 경우 대체 이미지로 설정
    if (!imageUrl || imageUrl.trim() === "") {
      return Noimg;
    }
    return imageUrl; // 유효한 이미지 URL이 있으면 그대로 반환
  };

  const handleImageError = (e) => {
    e.target.src = Noimg; // 이미지 경로가 이상할 때대체 이미지를 설정
  };

  // 데이터를 성공적으로 가져왔을 때
  return (
    <div id="containerSellProduct">
      <div id="sellProductList">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((product) => (
            <div key={product.id} id="sellProductCard">
              <img
                src={getImageUrl(product.images[0])}
                alt={product.name}
                id="imageSellProduct"
                onError={handleImageError}
              />
              <div id="infoSellProduct">
                <p id="SellProductName">{product.name}</p>
                <p id="SellProductPrice">{product.price.toLocaleString()}원</p>
                <p id="favoriteSellProduct">
                  <img src={IcHeart} alt="heart icon" />
                  {product.favoriteCount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p> // 데이터가 없을 경우 처리
        )}
      </div>
      {/* 페이지네이션 추가부분 */}
      <SellProductPagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
}
