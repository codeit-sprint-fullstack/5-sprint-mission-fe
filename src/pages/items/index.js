import axios from "@/lib/axios";
import Select from "@components/Select";
import { useAuth } from "@contexts/AuthProvider";
import useCustomMediaQuery from "@hooks/useCustomMediaQuery";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Items = ({ totalCount: initialTotalCount, list: initialData }) => {
  const router = useRouter();
  const auth = useAuth();
  const [data, setData] = useState(initialData);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("recent");
  const [page, setPage] = useState(1);

  const isMobile = useCustomMediaQuery("(max-width: 767px)");
  const isTablet = useCustomMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );

  const pageSize = isMobile ? 4 : isTablet ? 6 : 10;

  const general = data.slice(0, isMobile ? 4 : isTablet ? 6 : 10);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `/products?page=${page}&pageSize=${pageSize}&keyword=${value}&orderBy=${selected}`
      );
      const { totalCount, list } = response.data;

      setData(list);
      setTotalCount(totalCount);

      return { totalCount, list };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelectedOption = (option) => {
    setSelected(option);
    setPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    getProducts();
  };

  const handleChangePage = (p) => {
    setPage(p);
  };

  const handleRouter = (uri) => {
    router.push(uri);
  };

  useEffect(() => {
    getProducts();
  }, [selected, page]);

  const Pagination = () => {
    const totalPage = Math.floor(totalCount / pageSize) + 1;
    const base = Math.floor((page - 1) / 5) * 5;
    const pages = [base + 1, base + 2, base + 3, base + 4, base + 5].filter(
      (item) => item <= totalPage
    );

    return (
      <div className="flex justify-center items-center mt-10 gap-2">
        <button
          onClick={() => handleChangePage(page > 1 ? page - 1 : page)}
          className={clsx(
            "w-8 h-8 bg-[#F3F4F6] flex items-center justify-center rounded-sm"
          )}
          disabled={page === 1}
        >
          &lt;
        </button>
        {pages.map((item) => (
          <button
            key={item}
            onClick={() => {
              handleChangePage(item);
            }}
            className={clsx(
              "w-8 h-8 flex items-center justify-center rounded-sm",
              {
                ["bg-[#3692FF]"]: item === page,
                ["bg-[#F3F4F6]"]: item !== page,
              }
            )}
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => {
            handleChangePage(page < totalPage ? page + 1 : page);
          }}
          className="w-8 h-8 bg-[#F3F4F6] flex items-center justify-center rounded-sm"
          disabled={page === totalPage}
        >
          &gt;
        </button>
      </div>
    );
  };

  const ItemImage = ({ url }) => {
    const [image, setImage] = useState(url || "/img_default.png");

    return (
      <div className="w-full min-h-[168px] md:min-h-[220px] bg-[#F9FAFB] flex items-center justify-center">
        <div
          className={clsx(
            `relative  ${
              image === "/img_default.png" ? "w-3/5 h-3/5" : "w-full h-full"
            }`
          )}
        >
          <Image
            src={image}
            fill
            onError={(e) => setImage("/img_default.png")}
            // onError={(e) => (e.target.src = "/img_default.png")}
            alt=""
            unoptimized
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex items-center justify-between">
        <div className="text-xl text-[#111827] font-bold">판매 중인 상품</div>
        <button
          onClick={() => handleRouter("/items/write")}
          className="w-[133px] h-[42px] bg-[#3692FF] rounded-lg text-base font-semibold text-[#ffffff] flex items-center justify-center"
        >
          상품 등록하기
        </button>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="w-full mt-4 md:mt-10 lg:mt-6 flex gap-3 items-center justify-between">
          <form onSubmit={handleSubmit} className="w-full relative">
            <div className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2">
              <Image src="/ic_search.png" fill />
            </div>
            <input
              className="bg-[#F3F4F6] w-full h-[42px] rounded-xl pl-11"
              value={value}
              placeholder="검색할 상품을 입력해주세요"
              onChange={handleChange}
            />
          </form>

          <Select
            selected={selected}
            onClick={handleSelectedOption}
            options={[
              { value: "recent", label: "최신 순" },
              { value: "favorite", label: "좋아요 순" },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 w-full mt-6">
        {general?.map((product) => (
          <div
            key={product.id}
            onClick={() => auth.routeUnauth(`/items/${product.id}`, "/login")}
            className="flex flex-col items-start cursor-pointer"
          >
            <ItemImage url={product.images[0]} />
            <div className="text-sm text-[#1F2937] font-medium mt-2">
              {product.name}
            </div>
            <div className="text-base text-[#1F2937] font-bold mt-2">
              {product.price.toLocaleString("ko-KR")}원
            </div>
            <div className="mt-2 flex gap-1">
              <div className="relative w-4 h-4">
                <Image src="/ic_heart.png" fill />
              </div>
              <div className="text-xs text-[#4B5563] font-medium">
                {product.favoriteCount}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination></Pagination>
    </div>
  );
};

export default Items;

export const getServerSideProps = async (context) => {
  const {
    page = 1,
    pageSize = 10,
    keyword = "",
    orderBy = "recent",
  } = context.query;

  try {
    const response = await axios.get(
      `/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`
    );
    const { totalCount, list } = response.data;
    return {
      props: { totalCount, list },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: {} },
    };
  }
};
