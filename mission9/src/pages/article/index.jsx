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
import ArticleSkeletonCard from "@/components/article/ArticleSkeletonCard";

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

// 빈 게시글 데이터 (API 오류 시 사용)
const emptyArticle = {
  id: 0,
  title: "게시글 제목",
  content: "게시글 내용이 표시됩니다.",
  imageUrl: "/img_default.svg",
  createdAt: new Date().toISOString(),
  author: {
    id: 0,
    nickname: "사용자",
    image: "/ic_profile.svg",
  },
  likes: 0,
  comments: 0,
};

// 테스트 게시글 데이터 (API 오류 시 사용)
const testArticles = Array(5)
  .fill(null)
  .map((_, index) => ({
    ...emptyArticle,
    id: index + 1,
    title: `테스트 게시글 ${index + 1}`,
    likes: Math.floor(Math.random() * 50),
  }));

// 테스트 베스트 게시글 (API 오류 시 사용)
const testBestArticles = Array(3)
  .fill(null)
  .map((_, index) => ({
    ...emptyArticle,
    id: index + 100,
    title: `베스트 게시글 ${index + 1}`,
    likes: 100 - index * 10,
  }));

/**
 * ISR을 이용한 정적 페이지 생성 함수
 * 검색, 정렬, 페이지 정보에 따른 게시글 및 베스트 게시글 데이터를 가져옴
 */
export async function getStaticProps() {
  try {
    // 기본 게시글 데이터 요청
    const initialData = await getArticles({
      page: 1,
      limit: 5,
      sort: "latest",
    });

    // 베스트 게시글 데이터 요청 (좋아요 순으로 정렬)
    const bestArticles = await getArticles({
      page: 1,
      limit: 3,
      sort: "likes",
    });

    // API 응답 데이터 확인 및 가공
    const articlesData =
      initialData.articles && Array.isArray(initialData.articles)
        ? initialData.articles
        : testArticles;

    const bestArticlesData =
      bestArticles.articles && Array.isArray(bestArticles.articles)
        ? bestArticles.articles
        : testBestArticles;

    const pageInfo = {
      currentPage: initialData.currentPage || 1,
      totalPages: initialData.totalPages || 1,
      hasNext: initialData.currentPage < initialData.totalPages,
      hasPrev: initialData.currentPage > 1,
    };

    return {
      props: {
        initialArticles: articlesData,
        initialPageInfo: pageInfo,
        bestArticles: bestArticlesData,
        currentSearch: "",
        currentSort: "latest",
      },
      // 60초마다 페이지 재생성
      revalidate: 60,
    };
  } catch (error) {
    console.error("정적 페이지 생성 중 오류:", error);
    // 오류 발생시 테스트 데이터로 페이지 생성
    return {
      props: {
        initialArticles: testArticles,
        initialPageInfo: defaultPageInfo,
        bestArticles: testBestArticles,
        currentSearch: "",
        currentSort: "latest",
        error: "데이터를 불러오는데 실패했습니다.",
      },
      revalidate: 60,
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
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // 초기 로딩 상태 추가
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [bestArticlesList, setBestArticlesList] = useState(bestArticles);
  const [windowWidth, setWindowWidth] = useState(1200);

  // 컴포넌트 마운트 후 초기 로딩 상태 해제
  useEffect(() => {
    // 초기 로딩 상태를 짧은 시간 이후에 비활성화
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000); // 1초 후 로딩 상태 해제 (필요에 따라 조정)

    return () => clearTimeout(timer);
  }, []);

  // 라우터 쿼리 파라미터에 따라 데이터 로드
  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      setIsLoadingData(true);

      // 쿼리 파라미터 추출
      const page = parseInt(router.query.page) || 1;
      const search = router.query.search || "";
      const sort = router.query.sort || "latest";

      if (page !== 1 || search !== "" || sort !== "latest") {
        try {
          console.log("게시글 데이터 요청:", { page, search, sort });

          // 쿼리 파라미터가 있을 경우 클라이언트 사이드에서 데이터 패칭
          const result = await getArticles({
            page,
            limit: 5,
            search,
            sort,
          });

          console.log("게시글 데이터 응답:", result);

          // 게시글이 없는 경우 빈 배열 대신 더 친절한 메시지 표시를 위해 결과 확인
          if (
            !result.articles ||
            !Array.isArray(result.articles) ||
            result.articles.length === 0
          ) {
            console.log("게시글 데이터가 없거나 형식이 올바르지 않음");
            setArticles([]);
            if (result.error) {
              setError(result.error);
            } else if (search) {
              setError(`'${search}' 검색 결과가 없습니다.`);
            } else {
              setError("게시글이 없습니다.");
            }
          } else {
            console.log("게시글 데이터 설정:", result.articles.length);
            setArticles(result.articles);
            setError(null);
          }

          // 페이지 정보 설정
          const pageInfo = {
            currentPage: result.currentPage || page,
            totalPages: result.totalPages || 1,
            hasNext: result.currentPage < result.totalPages,
            hasPrev: result.currentPage > 1,
          };

          setPageInfo(pageInfo);

          // 검색어나 정렬이 변경된 경우 베스트 게시글도 다시 가져옴
          if (search !== currentSearch || sort !== currentSort) {
            console.log("베스트 게시글 데이터 요청");

            try {
              const bestResult = await getArticles({
                page: 1,
                limit: 3,
                sort: "likes",
                search,
              });

              console.log("베스트 게시글 응답:", bestResult);

              // 베스트 게시글이 없는 경우 처리
              if (
                !bestResult.articles ||
                !Array.isArray(bestResult.articles) ||
                bestResult.articles.length === 0
              ) {
                console.log("베스트 게시글 데이터가 없음");
                setBestArticlesList([]);
              } else {
                console.log("베스트 게시글 설정:", bestResult.articles.length);
                setBestArticlesList(bestResult.articles);
              }
            } catch (bestErr) {
              console.error("베스트 게시글 가져오기 실패:", bestErr);
              setBestArticlesList([]);
            }
          }

          setSearchTerm(search);
          setSortBy(sort);
        } catch (err) {
          console.error("데이터 가져오기 실패:", err);
          setError("데이터를 불러오는데 실패했습니다.");
          // 에러 발생 시 빈 배열 설정
          setArticles([]);
          setBestArticlesList([]);
        } finally {
          setIsLoadingData(false);
        }
      } else {
        // 기본 페이지인 경우 초기 데이터 사용
        console.log("초기 데이터 사용");
        setArticles(initialArticles);
        setPageInfo(initialPageInfo);
        setBestArticlesList(bestArticles);
        setSearchTerm("");
        setSortBy("latest");
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [
    router.isReady,
    router.query,
    currentSearch,
    currentSort,
    initialArticles,
    initialPageInfo,
    bestArticles,
  ]);

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
  const handleSearch = async (searchValue) => {
    // 상태 업데이트
    setIsLoadingData(true);

    try {
      // 검색 파라미터를 URL에 저장 (새로고침해도 상태 유지)
      const query = new URLSearchParams(router.query);

      if (searchValue) {
        query.set("search", searchValue);
      } else {
        query.delete("search");
      }

      // 페이지 초기화
      query.set("page", "1");

      // URL 업데이트 (페이지 새로고침 없이)
      router.push(`/article?${query.toString()}`, undefined, { shallow: true });

      // 데이터 가져오기
      const result = await getArticles({
        page: 1,
        limit: 5,
        search: searchValue,
        sort: sortBy,
      });

      // 베스트 게시글도 필터링된 결과로 업데이트
      const bestResult = await getArticles({
        page: 1,
        limit: 3,
        sort: "likes",
        search: searchValue,
      });

      // 상태 업데이트
      setArticles(result.articles || []);
      setPageInfo(result.pageInfo || defaultPageInfo);
      setBestArticlesList(bestResult.articles || []);
      setSearchTerm(searchValue);
    } catch (err) {
      console.error("검색 결과 가져오기 실패:", err);
      setError("검색 결과를 불러오는데 실패했습니다.");
    }

    setIsLoadingData(false);
  };

  /**
   * 정렬 변경 처리 함수
   * @param {string} sortValue - 정렬 방식 (latest 또는 likes)
   */
  const handleSort = async (sortValue) => {
    setIsLoadingData(true);

    try {
      // 정렬 파라미터 URL에 저장
      const query = new URLSearchParams(router.query);
      query.set("sort", sortValue);

      // URL 업데이트 (페이지 새로고침 없이)
      router.push(`/article?${query.toString()}`, undefined, { shallow: true });

      // 데이터 가져오기
      const result = await getArticles({
        page: pageInfo.currentPage,
        limit: 5,
        search: searchTerm,
        sort: sortValue,
      });

      // 상태 업데이트
      setArticles(result.articles || []);
      setPageInfo(result.pageInfo || defaultPageInfo);
      setSortBy(sortValue);
    } catch (err) {
      console.error("정렬된 데이터 가져오기 실패:", err);
      setError("정렬된 데이터를 불러오는데 실패했습니다.");
    }

    setIsLoadingData(false);
  };

  /**
   * 페이지 변경 처리 함수
   * @param {number} pageNumber - 이동할 페이지 번호
   */
  const handlePageChange = async (pageNumber) => {
    if (pageNumber === pageInfo.currentPage) return;

    setIsLoadingData(true);

    try {
      // 페이지 파라미터 URL에 저장
      const query = new URLSearchParams(router.query);
      query.set("page", pageNumber.toString());

      // URL 업데이트 (페이지 새로고침 없이)
      router.push(`/article?${query.toString()}`, undefined, { shallow: true });

      // 데이터 가져오기
      const result = await getArticles({
        page: pageNumber,
        limit: 5,
        search: searchTerm,
        sort: sortBy,
      });

      // 상태 업데이트
      setArticles(result.articles || []);
      setPageInfo(result.pageInfo || defaultPageInfo);

      // 페이지 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("페이지 데이터 가져오기 실패:", err);
      setError("페이지 데이터를 불러오는데 실패했습니다.");
    }

    setIsLoadingData(false);
  };

  // 로딩 상태 체크
  const isDataLoading = initialLoading || isLoadingData;

  // 로딩 상태 처리
  if (loading) return <Loading />;
  if (error) return <ErrorMessage>에러 발생: {error}</ErrorMessage>;

  /**
   * 화면 크기에 따라 표시할 베스트 게시글 수 결정
   * @returns {Array} 표시할 베스트 게시글 배열
   */
  const getVisibleBestArticles = () => {
    if (windowWidth >= 1200) {
      return bestArticlesList.slice(0, 3); // 데스크탑: 3개
    } else if (windowWidth >= 744) {
      return bestArticlesList.slice(0, 2); // 태블릿: 2개
    } else {
      return bestArticlesList.slice(0, 1); // 모바일: 1개
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
            {isDataLoading
              ? // 스켈레톤 UI 적용
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <ArticleSkeletonCard
                      key={`skeleton-best-${index}`}
                      isBest={true}
                    />
                  ))
              : getVisibleBestArticles().map((article) => (
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
          {loading ? (
            <Loading />
          ) : isDataLoading ? (
            // 스켈레톤 UI 적용
            Array(5)
              .fill(0)
              .map((_, index) => (
                <ArticleSkeletonCard key={`skeleton-${index}`} />
              ))
          ) : articles.length > 0 ? (
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
