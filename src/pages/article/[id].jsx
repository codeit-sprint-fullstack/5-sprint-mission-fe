import CommentList from "@/components/article/modify/CommentList";
import DetailArticle from "@/components/article/modify/DetailArticle";
import DetailLayout from "@/components/shared/DetailLayout";

export async function getServerSideProps({ params }) {
  const id = params.id;

  try {
    const articlesRes = await fetch(
      `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/articles/${id}`
    );

    if (!articlesRes.ok) {
      throw new Error(`응답 에러! Status: ${articlesRes.status}`);
    }

    const articles = await articlesRes.json();

    return {
      props: { articles },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: { articles: [] },
    };
  }
}

export default function ArticleDetail({ articles }) {
  return (
    <div className="flex flex-col w-full gap-[24px] px-[16px] md:px-[24px] xl:px-[360px] pt-[94px] pb-[251px] md:pb-[170px] xl:pb-[453px]">
      <section>
        <DetailArticle articles={articles} />
      </section>

      <section>
        <CommentList articles={articles} />
      </section>
    </div>
  );
}

ArticleDetail.getLayout = (page) => {
  return <DetailLayout>{page}</DetailLayout>;
};
