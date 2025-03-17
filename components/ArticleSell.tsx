import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ItemsList } from "@/core/itemsApiService";
import { ArticlePage } from "@/components/ArticlePage";
import styles from "@/styles/articleSell.module.css";

// API 응답에 맞춘 타입 수정
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  image?: string; // 실제 API 필드명에 맞춤
  favoriteCount?: number; // 좋아요 수 필드 추가
}

export function ArticleSell() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<"recent" | "favorite">(
    "recent"
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // 반응형 화면 크기 처리
  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width >= 1200) setLimit(10);
      else if (width >= 744) setLimit(6);
      else setLimit(4);
    };

    window.addEventListener("resize", updateLimit);
    updateLimit();
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await ItemsList.ProductList({
          page: currentPage,
          pageSize: limit,
          orderBy: selectedOrder,
          keyword: searchKeyword,
        });

        // API 응답 구조에 맞춘 처리
        if (res?.list) {
          setProducts(res.list);
          setTotalPages(Math.ceil(res.totalCount / limit));
        }
      } catch (err) {
        setError("상품 불러오기 실패");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, limit, selectedOrder, searchKeyword]);

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.articleSell}>
      <div className={styles.header}>
        <h1>판매 중인 상품</h1>
        <div className={styles.controls}>
          <div className={styles.search}>
            <Image src="/img/ic_search.png" alt="검색" width={20} height={20} />
            <input
              type="text"
              placeholder="상품 검색"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setCurrentPage(1); // 검색 시 1페이지로 리셋
              }}
            />
          </div>

          <Link href="/register" className={styles.registerBtn}>
            상품 등록
          </Link>

          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value as any)}
          >
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>

      {/* 상품 목록 표시 */}
      <div className={styles.productGrid}>
        {products.map((item) => (
          <div key={item.id} className={styles.productCard}>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${
                  item.image || "/assets/default_img.svg" // image 필드 사용
                })`,
              }}
            />
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString()}원</p>
            <div className={styles.likes}>
              <Image
                src="/img/ic_heart.png"
                alt="좋아요"
                width={16}
                height={16}
              />
              <span>{item.favoriteCount || 0}</span> {/* 좋아요 수 표시 */}
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <ArticlePage
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
