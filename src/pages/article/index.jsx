import { useState, useEffect } from "react";
import Article from "@/components/article/Article";
import BestArticle from "@/components/article/BestArticles";
import DetailLayout from "@/components/shared/DetailLayout";

export default function Freeboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/articles`
        );
        if (!res.ok) throw new Error(`응답 에러! Status: ${res.status}`);

        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[82px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
      {loading ? (
        <p className="text-center text-lg text-custom-text-gray-400">
          로딩 중...
        </p>
      ) : (
        <>
          <section>
            <BestArticle articles={articles} />
          </section>
          <section>
            <Article articles={articles} />
          </section>
        </>
      )}
    </div>
  );
}

Freeboard.getLayout = (page) => {
  return <DetailLayout>{page}</DetailLayout>;
};
