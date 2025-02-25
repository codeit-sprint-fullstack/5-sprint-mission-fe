import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { fetchArticles } from "../api/articles";
import { ArticleContext } from "@/context/ArticleContext";
import Image from "next/image";

export default function BestArticleList() {
  const [articles, setArticles] = useState([]);
  const { setSelectedArticle } = useContext(ArticleContext);

  useEffect(() => {
    const getBestArticles = async () => {
      try {
        const data = await fetchArticles();

        if (!Array.isArray(data)) {
          return;
        }

        const topArticles = [...data]
          .filter((article) => article.likeCount !== undefined)
          .sort((a, b) => b.likeCount - a.likeCount)
          .slice(0, 3);

        setArticles(topArticles);
      } catch (error) {}
    };

    getBestArticles();
  }, []);

  return (
    <div className="w-full max-w-[1200px] ">
      <div className="text-xl font-bold mb-6">베스트 게시글 </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link
              key={article._id}
              href={`/articles/${article._id}`}
              className="block"
            >
              <div
                className="flex flex-col px-6 pb-4 bg-[#f9faf8] rounded-lg  hover:shadow-xl transition gap-4"
                onClick={() => {
                  setSelectedArticle(article);
                }}
              >
                <Image
                  src="/img_badge (1).png"
                  alt="best"
                  width={102}
                  height={30}
                />
                <div className="flex justify-between">
                  <div className="text-xl font-semibold">{article.title}</div>
                  <div className="flex justify-center items-center w-[72px] h-[72px] border rounded-[8px] object-cover bg-white">
                    <img
                      src={article.image}
                      className="w-[48px] h-[48px] object-cover "
                    />

                    <div className="flex items-center space-x-1 text-gray-600"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="text-sm text-[#4b5563] font-normal">
                      {article.username}
                    </div>

                    <div className=" flex items-center gap-1">
                      <Image
                        src="/small_heart.png"
                        alt="123"
                        width={16}
                        height={16}
                      />
                      <div className=" text-sm text-[#4b5563] font-normal ">
                        {article.likeCount}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-[#9ca3af] font-normal">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">인기 게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
