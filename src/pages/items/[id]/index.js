import { useRouter } from "next/router";
import { fetchProductById } from "@/services/api/products"; // Assuming this function fetches the product by ID
import ProductDetail from "@/components/Product/ProductDetail"; // The component above
import { useState, useEffect } from "react";
import { deleteProduct } from "@/services/api/products"; // Assuming this function handles product deletion
import CommentSection from "@/components/Comment/CommentSection";
import Link from "next/link";
import { TypeProvider } from "@/contexts/TypeContext";
import { Modal } from "@/Common/modals/Modal";

export default function ProductDetailPage({ product, comments }) {
  console.log("상품아이디1: ", product.id);
  const router = useRouter();
  const { id } = router.query;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoginModalOpen(true);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleDelete = async (product) => {
    console.log("상품아이디2: ", product.id);
    try {
      const response = await deleteProduct(product.id);
      console.log(product.id);
      console.log("Product deleted successfully:", response);
      router.push("/items");
    } catch (error) {
      console.error(
        "상품 삭제 실패:",
        error.response ? error.response.data : error.message
      );
      alert("상품 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false);
    router.push("/login"); // 로그인 페이지로 리다이렉트
  };

  if (!router.isReady || !product) return <div>⏳ 페이지 로딩 중...</div>;
  if (!isAuthenticated) {
    return (
      <Modal
        isOpen={isLoginModalOpen}
        onClose={handleLoginRedirect}
        message="로그인 후에 이용 가능합니다."
      />
    );
  }
  return (
    <TypeProvider type="PRODUCT">
      <ProductDetail product={product} onDelete={() => handleDelete(product)} />
      <CommentSection
        product={product}
        id={product.id}
        comments={comments}
        label="문의하기"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이데 대한 민형사상 책임은 게시자에게 있습니다."
        type="product"
      />
      <Link href="/items" className="block text-center mt-12 w-[240px] mx-auto">
        <img
          src="/btn_back.svg"
          alt="목록으로 돌아가기"
          width={240}
          height={48}
          className=" cursor-pointer mb-[210px]"
        />
      </Link>
    </TypeProvider>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const product = await fetchProductById(id);
    console.log("상품 데이터:", product);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("상품 데이터를 가져오기 실패:", error);
    return {
      props: {
        product: null,
      },
    };
  }
}
