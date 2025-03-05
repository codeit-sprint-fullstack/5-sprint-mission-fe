import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.params;

  let article;
  try {
    const res = await axios.get(`/articles/${id}`);
    article = res.data;
  } catch (err) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
  };
}

const UpdateArticle = ({ article }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [titleValue, setTitleValue] = useState(article.title);
  const [contentValue, setContentValue] = useState(article.content);

  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };
  const handleContentValue = (e) => {
    setContentValue(e.target.value);
  };

  const handleFormSubmit = async () => {
    await axios.patch("/articles", {
      id: article.id,
      title: titleValue,
      content: contentValue,
      imageUrl: "",
    });
    router.push(`/community/${article.id}`);
  };

  useEffect(() => {
    setIsActive(
      titleValue.trim().length >= 3 && contentValue.trim().length >= 10
    );
  }, [titleValue, contentValue]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[#1F2937] text-xl font-bold">게시글 수정하기</div>
        <button
          onClick={handleFormSubmit}
          className={clsx(
            " text-base text-[#F3F4F6] font-semibold w-[74px] h-[42px] rounded-lg",
            {
              ["bg-[#9CA3AF] cursor-not-allowed"]: !isActive,
              ["bg-[#3692FF]"]: isActive,
            }
          )}
          disabled={!isActive}
        >
          등록
        </button>
      </div>
      <div>
        <div className="text-[#1F2937] text-lg font-bold mb-4 mt-8">*제목</div>
        <input
          value={titleValue}
          onChange={handleTitleValue}
          className="w-full h-14 rounded-xl pl-6 bg-[#F3F4F6]"
          placeholder="제목을 입력해주세요"
        ></input>
      </div>
      <div>
        <div className="text-[#1F2937] text-lg font-bold mb-4 mt-8">*내용</div>
        <textarea
          type="text"
          value={contentValue}
          onChange={handleContentValue}
          className="w-full min-h-[200px] md:min-h-[282px] rounded-xl px-6 py-4 bg-[#F3F4F6]"
          placeholder="내용을 입력해주세요"
        ></textarea>
      </div>
    </div>
  );
};

export default UpdateArticle;
