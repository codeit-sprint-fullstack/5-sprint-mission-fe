import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ArticleContext } from "@/context/ArticleContext";
import ArticleDropdownMenu from "./articleDropDown";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const { setSelectedArticle } = useContext(ArticleContext);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchAndSortArticles = async () => {
      try {
        const data = await fetchArticles();

        let sortedArticles = [...data];

        if (sortOption === "likes") {
          sortedArticles.sort((a, b) => b.likeCount - a.likeCount);
        } else {
          sortedArticles.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        setArticles(sortedArticles);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchAndSortArticles();
  }, [sortOption]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm, articles]);

  return (
    <div className="w-full max-w-[1200px] py-8 px-4">
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-6">게시글</div>
        <Link href="/articles/new">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
            글쓰기
          </button>
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative w-full">
          <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
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
            placeholder="검색할 상품을 입력해주세요"
            className="w-full rounded-lg border-gray-50 bg-[#f3f4f6] px-10 py-2 shadow-sm"
          />
        </div>

        <ArticleDropdownMenu onSortChange={handleSortChange} />
      </div>

      <div className="space-y-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article._id} className="bg-[#fcfcfc] mb-6 border-b">
              <div className="flex justify-between mb-4">
                <Link href={`/articles/${article._id}`}>
                  <div
                    onClick={() => handleClick(article)}
                    className="text-lg font-semibold mb-2 cursor-pointer"
                  >
                    {article.title}
                  </div>
                </Link>
                <div className="flex justify-center items-center w-[72px] h-[72px] border rounded-[8px] object-cover bg-white">
                  <img
                    src={article.image}
                    className="w-[48px] h-[48px] object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Image
                    src="/smallprofile.png"
                    alt="user icon"
                    width={24}
                    height={24}
                  />
                  {article.username} ·{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
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
    </div>
  );
}
