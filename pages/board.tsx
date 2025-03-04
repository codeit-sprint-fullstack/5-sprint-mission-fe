import BestArticle from "@/components/BestArticle";
import Image from "next/image";
import Article from "@/components/Article";
import Button from "@/components/common/Button";
import Link from "next/link";
import api from "@/utils/axiosInstance";
import { GetServerSideProps } from "next";
import { ArticleCard } from "@/types/articleCard";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useWindowSize } from "@/hooks/useWindowSize";
import PaginationButton from "@/components/common/PaginationButton";
import { useRouter } from "next/router";
import { refresh } from "@/functions/refresh";
import { useQuery } from "@tanstack/react-query";

interface ArticleData {
  articles: ArticleCard[];
  totalSize: number;
}

export default function BoardPage() {
  const [searchVal, setSearchVal] = useState("");
  const { width, height } = useWindowSize();
  const [maxCount, setMaxCount] = useState(3);
  const [order, setOrder] = useState("newest");
  const [isOrderMenu, setIsOrderMenu] = useState(false);
  const router = useRouter();
  const debounceSearchVal = useDebounce<string>(searchVal, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", debounceSearchVal, order],
    queryFn: () => getArticlesByKeyword(debounceSearchVal, order),
    staleTime: 60 * 1000,
  });

  const articles = data?.data.articles;
  console.log(articles);

  useEffect(() => {
    if (width > 1280) setMaxCount(3);
    else if (width > 768) setMaxCount(2);
    else setMaxCount(1);
  }, [width]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchVal(value);
  }

  function handleOrderMenu() {
    setIsOrderMenu((prev) => !prev);
  }

  function handleOrderNew() {
    setOrder("newest");
    setIsOrderMenu(false);
  }

  function handleOrderLike() {
    setOrder("mostLikes");
    setIsOrderMenu(false);
  }

  async function getArticlesByKeyword(keyword: string, order: string) {
    const res = await api.get<ArticleData>(
      `/article/?keyword=${keyword}&order=${order}`
    );
    return res;
  }

  return (
    <div className="flex flex-col gap-[40px] min-h-[100vh] w-[100%]">
      <div className="text-[#1F2937] flex flex-col gap-[24px]">
        <h3 className="text-[20px] font-bold">베스트 게시글</h3>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px]">
          {articles?.map((article, index) => {
            if (index < maxCount)
              return (
                <Link
                  key={`bestArticle-${article.id}`}
                  href={`/board/${article.idx}`}
                >
                  <BestArticle article={article} />
                </Link>
              );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex justify-between items-center">
          <h3 className="text-[#1F2937] text-[20px] font-bold">게시글</h3>
          <Link href="/board/write">
            <Button name="글쓰기" disabled={false} />
          </Link>
        </div>
        <div className="flex justify-between gap-3">
          <input
            className="focus:outline-[#3692FF] bg-[#F3F4F6] py-[9px] pr-[20px] pl-[40px] w-full rounded-xl text-[16px]"
            style={{
              backgroundImage: "url('/imgs/ic_search.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 10px center",
              backgroundSize: "20px 20px",
            }}
            placeholder="검색할 상품을 입력해주세요"
            onChange={handleSearch}
          />
          <div className="relative">
            {width < 769 ? (
              <div
                className="border border-[#E5E7EB] w-[50px] h-[50px] rounded-xl flex justify-center items-center cursor-pointer"
                onClick={handleOrderMenu}
              >
                <Image
                  src="/imgs/ic_sort.png"
                  alt="정렬"
                  width={24}
                  height={24}
                />
              </div>
            ) : (
              <div
                className="border border-[#E5E7EB] w-[130px] h-[42px] px-[20px] py-[12px] rounded-xl flex justify-between items-center cursor-pointer"
                onClick={handleOrderMenu}
              >
                <div>
                  {order === "newest" ? (
                    <div>최신순</div>
                  ) : (
                    <div>좋아요 순</div>
                  )}
                </div>
                <div className="relative w-[15.7px] h-[7.42px]">
                  <Image src="/imgs/polygon.png" fill alt="화살표" />
                </div>
              </div>
            )}

            {isOrderMenu && (
              <div>
                {width < 769 ? (
                  <div>
                    <div className="bg-white absolute z-50 w-[130px] top-14 right-0 flex flex-col justify-center items-center">
                      <div
                        className="flex justify-center border w-[100%] rounded-t-xl p-2 hover:bg-slate-100 cursor-pointer"
                        onClick={handleOrderNew}
                      >
                        최신순
                      </div>
                      <div
                        className="flex justify-center border-l border-r border-b w-[100%] rounded-b-xl p-2 hover:bg-slate-100 cursor-pointer"
                        onClick={handleOrderLike}
                      >
                        좋아요 순
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-white absolute z-50 w-[130px] top-12 flex flex-col justify-center items-center">
                      <div
                        className="flex justify-center border w-[100%] rounded-t-xl p-2 hover:bg-slate-100 cursor-pointer"
                        onClick={handleOrderNew}
                      >
                        최신순
                      </div>
                      <div
                        className="flex justify-center border-l border-r border-b w-[100%] rounded-b-xl p-2 hover:bg-slate-100 cursor-pointer"
                        onClick={handleOrderLike}
                      >
                        좋아요 순
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {articles?.map((article, index) => {
          return (
            <Link key={`article-${article.id}`} href={`/board/${article.idx}`}>
              <Article article={article} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
