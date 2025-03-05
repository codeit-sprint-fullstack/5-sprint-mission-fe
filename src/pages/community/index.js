import BestPostCard from "@components/BestPostCard";
import useCustomMediaQuery from "@hooks/useCustomMediaQuery";
import axios from "@/lib/axios";
import GeneralPostList from "@components/GeneralPostList";

export async function getServerSideProps(context) {
  const {
    page = 1,
    pageSize = 5,
    keyword = "",
    orderBy = "recent",
  } = context.query;

  let bestArticles;
  try {
    const res = await axios.get(`/articles?orderBy=favorite`);
    bestArticles = res.data.list;
  } catch (err) {
    bestArticles = [];
  }

  let generalArticles;
  try {
    const res = await axios.get(
      `/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`
    );
    generalArticles = res.data;
  } catch (err) {
    generalArticles = { list: [], totalCount: 0 };
  }

  return {
    props: {
      bestArticles,
      generalArticles,
    },
  };
}

const Community = ({ bestArticles, generalArticles }) => {
  const isMobile = useCustomMediaQuery("(max-width: 767px)");
  const isTablet = useCustomMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );

  const best = bestArticles.slice(0, isMobile ? 1 : isTablet ? 2 : 3);

  return (
    <>
      <div>
        <div className="text-[#1F2937] text-lg font-bold">베스트 게시글</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 lg:gap-x-6 mt-4 md:mt-6">
          {best.map((item) => (
            <BestPostCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <GeneralPostList data={generalArticles} />
    </>
  );
};

export default Community;
