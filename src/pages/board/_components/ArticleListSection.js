import { useArticleList } from "@/lib/queries/articles";
import { ARTICLE_PAGE_LIMIT } from "@/constants";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Button from "@/components/Button";
import SearchInput from "@/components/input/SearchInput";
import SortDropDown from "@/components/SortDropDown";
import ArticleCard from "./ArticleCard";

export default function ArticleListSection() {
  const router = useRouter();

  // 상태 관리 - 초기값을 프리페치 QueryKey랑 맞춰야 함
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  // React Query로 데이터 요청
  const { data: articleList, isLoading } = useArticleList({
    offset: (page - 1) * ARTICLE_PAGE_LIMIT,
    limit: ARTICLE_PAGE_LIMIT,
    sort,
    keyword: debouncedKeyword,
  });

  // 키워드 입력 시 디바운스 타이머 설정 -> 타이핑 멈추면 실제 검색 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  // 로딩 및 데이터 없음 처리
  // 1. 로딩 처리
  if (isLoading) return <div>로딩 중...</div>;

  // 2. 데이터 없음 처리
  if (!articleList.data) return null;

  return (
    <section className="flex flex-col gap-[16px]">
      <header className="flex justify-between items-center">
        <h1 className="text-[18px] md:text-[20px] font-[700] text-gray-800">
          게시글
        </h1>
        <Button onClick={() => router.push("/board/write")}>글쓰기</Button>
      </header>

      <div className="flex flex-col gap-[24px]">
        <div className="flex justify-between items-center gap-[13px]">
          <SearchInput
            placeholder="검색할 상품을 입력해주세요"
            value={keyword}
            onChange={setKeyword}
          />
          <SortDropDown sortValue={sort} onChangeSortValue={setSort} />
        </div>

        <ul className="flex flex-col gap-[24px]">
          {articleList.data.map((article) => (
            <ArticleCard article={article} />
          ))}
        </ul>
      </div>
    </section>
  );
}
