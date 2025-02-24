import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import Image from "next/image";
import Link from "next/link";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);
  return (
    <div className="w-full max-w-[1200px] py-8 px-4">
      <div className="flex justify-between ">
        <div className="text-2xl font-bold mb-6">게시글</div>
        <Link href="/articles/new">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
            글쓰기
          </button>{" "}
        </Link>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          className="w-full rounded-lg border border-gray-200 px-4 py-2 shadow-sm"
        />
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article._id} className="  bg-[#fcfcfc] mb-6 border-b">
            <div className="flex justify-between mb-4">
              <div className="text-lg font-semibold mb-2">{article.title}</div>
              <div className="flex justify-center items-center w-[72px] h-[72px] border rounded-[8px] object-cover bg-white">
                <img
                  src={article.image}
                  className="w-[48px] h-[48px] object-cover "
                />

                <div className="flex items-center space-x-1 text-gray-600"></div>
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="text-sm text-gray-500">
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
        ))}
      </div>
    </div>
  );
}
