import { useEffect, useState, useCallback } from "react";
import { fetchArticles } from "../api/articles";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { ArticleContext } from "@/context/ArticleContext";
import ArticleDropdownMenu from "../components/ArticleDropDown";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function ArticleList() {
  const [articles, setArticles] = useState([]); // 현재 화면에 보일 게시글
  const [allArticles, setAllArticles] = useState([]); // 전체 데이터 저장 (검색 전 상태 유지)
  const [searchResults, setSearchResults] = useState([]); // 검색된 결과만 저장
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [sortOption, setSortOption] = useState("recent"); // 정렬 옵션 (recent / like)
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
  const [isSearching, setIsSearching] = useState(false); // 검색 중 여부
  const { setSelectedArticle } = useContext(ArticleContext);
  const { user } = useAuth();
  const router = useRouter();
  const { ref, inView } = useInView(); // Intersection Observer 사용

  // ** 정렬 변경 시 초기화**
  const handleSortChange = (option) => {
    setSortOption(option);
    setPage(1);
    setArticles([]);
    setAllArticles([]);
    setHasMore(true);
    fetchMoreArticles(1, option, searchTerm, true);
  };

  // ** 검색어 입력 감지**
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      // 검색어 삭제 시 기존 데이터 복원
      setIsSearching(false);
      setArticles(allArticles);
      setSearchResults([]);
    }
  };

  // ** 검색 실행**
  const handleSearchSubmit = () => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      setArticles(allArticles);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const filtered = allArticles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  // ** 글쓰기 버튼 클릭 시 로그인 확인**
  const handleWriteClick = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    } else {
      router.push("/articles/new");
    }
  };

  // ** API 호출하여 게시글 가져오기**
  const fetchMoreArticles = useCallback(
    async (
      currentPage = page,
      order = sortOption,
      query = searchTerm,
      reset = false
    ) => {
      if (!hasMore && !reset) return;

      try {
        const data = await fetchArticles({
          page: currentPage,
          pageSize: 10,
          orderBy: order,
          searchTerm: query,
        });

        if (!data.list || data.list.length === 0) {
          setHasMore(false);
          return;
        }

        if (reset) {
          // 첫 페이지 호출 시 초기화
          setArticles(data.list);
          setAllArticles(data.list);
        } else {
          // 무한 스크롤 시 데이터 추가
          setArticles((prev) => [...prev, ...data.list]);
          setAllArticles((prev) => [...prev, ...data.list]);
        }

        setPage(currentPage + 1);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        setHasMore(false);
      }
    },
    [page, sortOption, searchTerm, hasMore]
  );

  // ** 첫 페이지 데이터 가져오기**
  useEffect(() => {
    fetchMoreArticles(1, sortOption, "", true);
  }, [sortOption]);

  // ** 스크롤이 마지막 요소에 도달하면 추가 데이터 요청**
  useEffect(() => {
    if (inView && !isSearching) {
      fetchMoreArticles();
    }
  }, [inView, isSearching]);

  return (
    <div className="w-full max-w-[1200px] py-8 px-4">
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-6">게시글</div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleWriteClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
          >
            글쓰기
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative w-full">
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={handleSearchSubmit}
          >
            <img
              src="/Vector (1).png"
              alt="검색"
              className="w-[15px] h-[15px]"
            />
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="검색할 게시글을 입력해주세요"
            className="w-full rounded-lg border-gray-50 bg-[#f3f4f6] px-10 py-2 shadow-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()} // ✅ 엔터키 입력 시 검색
          />
        </div>

        <ArticleDropdownMenu onSortChange={handleSortChange} />
      </div>

      <div className="space-y-4">
        {(isSearching ? searchResults : articles).length > 0 ? (
          (isSearching ? searchResults : articles).map((article, index) => (
            <div
              key={article.id}
              className="bg-[#fcfcfc] mb-6 border-b"
              ref={!isSearching && index === articles.length - 1 ? ref : null}
            >
              <div className="flex justify-between mb-4">
                <Link href={`/articles/${article.id}`}>
                  <div
                    onClick={() => setSelectedArticle(article)}
                    className="text-lg font-semibold mb-2 cursor-pointer"
                  >
                    {article.title}
                  </div>
                </Link>
                <div className="flex justify-center items-center w-[72px] h-[72px] border rounded-[8px] object-cover bg-white">
                  <img
                    src={article.image ? article.image : "/img_default.png"}
                    className="w-[48px] h-[48px] object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <div>{article.writer?.nickname || "익명"}</div>
                  <div>{new Date(article.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex justify-between w-[82px] items-center">
                  <Image
                    src="/heart.png"
                    alt="heart icon"
                    width={24}
                    height={24}
                  />
                  <span>{article.likeCount}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>

      {hasMore && !isSearching && (
        <p className="text-center text-gray-500">로딩 중...</p>
      )}
    </div>
  );
}
