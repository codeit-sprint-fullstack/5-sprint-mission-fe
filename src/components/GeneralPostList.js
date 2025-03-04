import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "./Select";
import dayjs from "dayjs";
import clsx from "clsx";

const GeneralPostList = ({ data }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("recent");
  const [page, setPage] = useState(1);

  const getArticles = () => {
    console.log(page);
    router.push(
      `/community?page=${page}&pageSize=5&keyword=${value}&orderBy=${selected}`
    );
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
    getArticles();
  };

  const handleChangePage = (p) => {
    setPage(p);
  };

  useEffect(() => {
    getArticles();
  }, [selected, page]);

  const Pagination = () => {
    const totalPage = Math.floor(data.totalCount / 5) + 1;
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

  return (
    <>
      <div className="mt-6 md:mt-10 flex items-center justify-between">
        <div className="text-[#1F2937] text-lg font-bold">게시글</div>
        <Link
          href="/community/write"
          className="w-[88px] h-[42px] bg-[#3692FF] rounded-lg text-base font-semibold text-[#ffffff] flex items-center justify-center"
        >
          글쓰기
        </Link>
      </div>
      <div className="mt-4 md:mt-10 lg:mt-6 flex gap-3 items-center justify-between">
        <form onSubmit={handleSubmit} className="flex-1 relative">
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
      <div className="mt-4 md:mt-10 lg:mt-6 flex flex-col gap-6">
        {data &&
          data.list.map((item) => (
            <Link
              href={`/community/${item.id}`}
              key={item.id}
              className="h-[138px] bg-[#FCFCFC] border-b-[1px] border-b-[#E5E7EB]"
            >
              <div className="flex justify-between">
                <div className="w-[80%] md:w-[86%]">
                  <div className="text-base md:text-lg font-semibold line-clamp-2">
                    {item.title}
                  </div>
                </div>
                <div className="relative w-[72px] h-[72px] bg-white border-[0.75px] border-[#E5E7EB] rounded-lg overflow-hidden">
                  <Image src={item.imageUrl || "/img_default.png"} fill />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex gap-2">
                  <div className="relative w-6 h-6">
                    <Image
                      src={item.profileImageUrl || "/ic_profile.png"}
                      fill
                    />
                  </div>
                  <div className="text-[#4B5563] text-sm font-normal">
                    {item.nickname}
                  </div>
                  <div className="text-[#9CA3AF] text-sm font-normal">
                    {dayjs(item.createdAt).format("YYYY-MM-DD")}
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="relative w-6 h-6">
                    <Image src="/ic_heart.png" fill alt="" />
                  </div>
                  <div className="text-[#6B7280] text-base font-normal">
                    {item.likeCnt >= 10000 ? "9999+" : item.likeCnt}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Pagination></Pagination>
    </>
  );
};

export default GeneralPostList;
