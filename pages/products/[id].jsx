import { useRouter } from "next/router";
import { ProductContext } from "@/context/ProductContext";
import { useContext, useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import { fetchProductById } from "../api/products";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !id) return; // ✅ router가 완전히 로드될 때까지 기다림

    const fetchProduct = async () => {
      try {
        setLoading(true); // 🔥 데이터 로딩 시작
        console.log(`📡 상품 데이터 요청: /products/${id}`);
        const productData = await fetchProductById(id);
        setSelectedProduct(productData); // ✅ Context에 저장
      } catch (error) {
        console.error("❌ 상품 정보를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // ✅ 로딩 상태 업데이트
      }
    };

    fetchProduct();
  }, [id, router.isReady]); // ✅ router.isReady가 변경될 때도 실행

  if (loading) {
    return <p className="text-center">상품 정보를 불러오는 중...</p>;
  }

  if (!selectedProduct) {
    return <p className="text-center">상품을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <ProductDetail product={selectedProduct} />
    </div>
  );
}
