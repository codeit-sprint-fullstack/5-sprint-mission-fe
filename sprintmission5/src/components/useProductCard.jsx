import React, { useEffect, useState } from "react";

const useProductCard = ({ pageSize, orderBy }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?pageSize=${pageSize}&orderBy=${orderBy}`,
          { headers: { accept: "application/json" } }
        );

        //API응답상태확인(200번대 아닐때)
        if (!response.ok) {
          throw new Error("에러입니다.");
        }

        const data = await response.json(); // 응답 파싱중요중요 이거 뺴먹엇어!!!
        setProducts(data.list || []);
      } catch (error) {
        //네트워크 요청 중 발생한 모든 오류(API응답 외 네트워크, 파싱 등등등)
        console.error("데이터 오류:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [pageSize, orderBy]);

  return { products, loading };
};

export default useProductCard;

//이게 내가 최종적으로 한 코든데 API요청을 콘솔로 찍어보면 계속 요청하던데 원래 그런거야? 일단 넌 대기 ㅋㅋㅋ
