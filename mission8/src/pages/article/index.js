import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import Search from "@/components/common/Search";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";
import { getArticles } from "@/services/articleService";
import Loading from "@/components/common/Loading";
import ArticleListCard from "@/components/article/ArticleListCard";

// 정렬 옵션 설정
const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요순" },
];

// 기본 페이지 정보 객체
const defaultPageInfo = {
  total: 0,
  totalPages: 1,
  currentPage: 1,
  hasNext: false,
  hasPrev: false,
};

/**
 * 서버 사이드 데이터 페칭 함수
 * 검색, 정렬, 페이지 정보에 따른 게시글 및 베스트 게시글 데이터를 가져옴
 */
export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page) || 1;
  const search = query.search || "";
  const sort = query.sort || "latest";

  try {
    // 일반 게시글 데이터 요청
    const initialData = await getArticles({
      page,
      limit: 5,
      search,
      sort,
    });

    // 베스트 게시글 데이터 요청 (좋아요 순으로 정렬)
    const bestArticles = await getArticles({
      page: 1,
      limit: 3,
      sort: "likes",
    });

    return {
      props: {
        initialArticles: initialData.articles || [],
        initialPageInfo: initialData.pageInfo || defaultPageInfo,
        bestArticles: bestArticles.articles || [],
        currentSearch: search,
        currentSort: sort,
      },
    };
  } catch (error) {
    // 에러 발생 시 기본값 반환
    return {
      props: {
        initialArticles: [],
        initialPageInfo: defaultPageInfo,
        bestArticles: [],
        currentSearch: search,
        currentSort: sort,
      },
    };
  }
}

/**
 * 게시글 목록 페이지 컴포넌트
 */
const ArticleList = ({
  initialArticles = [],
  initialPageInfo = defaultPageInfo,
  bestArticles = [],
  currentSearch = "",
  currentSort = "latest",
}) => {
  const router = useRouter();

  // 상태 관리
  const [articles, setArticles] = useState(initialArticles);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [sortBy, setSortBy] = useState(currentSort);
  const [windowWidth, setWindowWidth] = useState(1200);

  // 컴포넌트 마운트 시 초기 로딩 상태 설정
  useEffect(() => {
    setLoading(true);

    if (router.isReady) {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [router.isReady]);

  // props가 변경될 때 상태 업데이트
  useEffect(() => {
    if (router.isReady) {
      setArticles(initialArticles);
      setPageInfo(initialPageInfo);
      setSearchTerm(currentSearch);
      setSortBy(currentSort);
      setLoading(false);
    }
  }, [
    initialArticles,
    initialPageInfo,
    currentSearch,
    currentSort,
    router.isReady,
  ]);

  // 라우터 이벤트 리스너 (페이지 전환 시 로딩 상태 관리)
  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      if (url.startsWith("/article")) {
        setTimeout(() => setLoading(false), 150);
      }
    };

    const handleRouteChangeStart = (url) => {
      if (url.startsWith("/article")) {
        setLoading(true);
      }
    };

    const handleRouteChangeError = () => {
      setLoading(false);
    };

    // 이벤트 리스너 등록
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeError", handleRouteChangeError);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  // 윈도우 리사이즈 이벤트 처리 (반응형 UI를 위한 화면 너비 추적)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 초기 윈도우 너비 설정
      setWindowWidth(window.innerWidth);

      // 리사이즈 이벤트 핸들러
      const handleResize = () => setWindowWidth(window.innerWidth);

      // 이벤트 리스너 등록
      window.addEventListener("resize", handleResize);

      // 클린업 함수
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  /**
   * 검색 처리 함수
   * @param {string} searchTerm - 검색어
   */
  const handleSearch = (searchTerm) => {
    const currentSearch = router.query.search || "";
    const searchTermValue = searchTerm || "";

    // 검색어가 변경된 경우에만 검색 실행
    if (searchTermValue !== currentSearch) {
      setLoading(true);
      const query = new URLSearchParams(router.query);

      // 검색어 설정
      if (searchTermValue) {
        query.set("search", searchTermValue);
      } else {
        query.delete("search");
      }

      // 페이지 초기화 및 페이지 새로고침
      query.set("page", "1");
      window.location.href = `/article?${query.toString()}`;
    }
  };

  /**
   * 정렬 변경 처리 함수
   * @param {string} sortValue - 정렬 방식 (latest 또는 likes)
   */
  const handleSort = (sortValue) => {
    const currentSort = router.query.sort || "latest";

    // 정렬 값이 변경된 경우에만 실행
    if (sortValue !== currentSort) {
      setLoading(true);
      const query = new URLSearchParams(router.query);

      // 정렬 값 설정 및 페이지 초기화
      query.set("sort", sortValue);
      query.set("page", "1");

      // 페이지 새로고침
      window.location.href = `/article?${query.toString()}`;
    }
  };

  /**
   * 페이지 변경 처리 함수
   * @param {number} pageNumber - 이동할 페이지 번호
   */
  const handlePageChange = (pageNumber) => {
    // 페이지가 변경된 경우에만 실행
    if (pageNumber !== pageInfo.currentPage) {
      setLoading(true);
      const query = new URLSearchParams(router.query);

      // 페이지 번호 설정 및 페이지 새로고침
      query.set("page", pageNumber.toString());
      window.location.href = `/article?${query.toString()}`;
    }
  };

  // 로딩 상태 처리
  if (loading) return <Loading />;
  if (error) return <ErrorMessage>에러 발생: {error}</ErrorMessage>;

  /**
   * 화면 크기에 따라 표시할 베스트 게시글 수 결정
   * @returns {Array} 표시할 베스트 게시글 배열
   */
  const getVisibleBestArticles = () => {
    if (windowWidth >= 1200) {
      return bestArticles.slice(0, 3); // 데스크탑: 3개
    } else if (windowWidth >= 744) {
      return bestArticles.slice(0, 2); // 태블릿: 2개
    } else {
      return bestArticles.slice(0, 1); // 모바일: 1개
    }
  };

  return (
    <PageWrapper>
      <Container>
        <PageHeader>
          <PageTitle>베스트 게시글</PageTitle>
        </PageHeader>

        {/* 베스트 게시글 섹션 */}
        <BestArticlesSection>
          <BestArticlesGrid>
            {getVisibleBestArticles().map((article) => (
              <ArticleListCard
                key={article.id}
                article={article}
                isBest={true}
              />
            ))}
          </BestArticlesGrid>
        </BestArticlesSection>

        {/* 게시글 헤더 - 제목과 글쓰기 버튼 */}
        <ArticleHeader>
          <PageTitle>게시글</PageTitle>
          <ButtonContainer>
            <Link href="/article/write" passHref legacyBehavior>
              <WriteButton>글쓰기</WriteButton>
            </Link>
          </ButtonContainer>
        </ArticleHeader>

        {/* 필터 섹션 - 검색, 정렬 */}
        <FilterSection>
          <SearchWrapper>
            <Search onSearch={handleSearch} initialValue={searchTerm} />
          </SearchWrapper>
          <DropdownWrapper>
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={handleSort}
            />
          </DropdownWrapper>
        </FilterSection>

        {/* 게시글 목록 */}
        <ArticleListContainer>
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleListCard key={article.id} article={article} />
            ))
          ) : (
            <EmptyMessage>게시글이 없습니다.</EmptyMessage>
          )}
        </ArticleListContainer>

        {/* 페이지네이션 */}
        <Pagination {...pageInfo} onPageChange={handlePageChange} />
      </Container>
    </PageWrapper>
  );
};

/* -------------- 스타일 컴포넌트 -------------- */

// 전체 페이지 래퍼
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
`;

// 메인 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

// 페이지 헤더 영역
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
`;

// 페이지 제목
const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

// 섹션 제목
const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
`;

// 게시글 헤더 영역
const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
`;

// 검색창과 드롭다운 컨테이너
const FilterSection = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

// 검색창 래퍼
const SearchWrapper = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// 드롭다운 래퍼
const DropdownWrapper = styled.div`
  width: auto;
  min-width: 120px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// 게시글 목록 컨테이너
const ArticleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

// 글쓰기 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// 글쓰기 버튼
const WriteButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #2563eb;
  }
`;

// 베스트 게시글 섹션
const BestArticlesSection = styled.section`
  margin-bottom: 3rem;
`;

// 베스트 게시글 그리드 레이아웃
const BestArticlesGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2.5rem;

  /* 반응형 그리드 설정 */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 데스크탑: 3열 */
  }

  @media (min-width: 744px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr); /* 태블릿: 2열 */
  }

  @media (max-width: 743px) {
    grid-template-columns: 1fr; /* 모바일: 1열 */
  }
`;

// 에러 메시지
const ErrorMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #ef4444;
  background-color: #fee2e2;
  border-radius: 6px;
`;

// 빈 목록 메시지
const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px dashed #d1d5db;
`;

export default ArticleList;
