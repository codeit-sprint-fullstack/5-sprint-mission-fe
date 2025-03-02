import BestBoardCard from "./BestBoardCard";

export default function BestBoardSection() {
  return (
    <div className=" w-[1250px] mx-auto px-4 pt-4">
      <p className="text-xl font-bold mb-4 md:mb-6">베스트 게시글</p>
      <div className="flex gap-4 xl:gap-6 overflow-x-auto ">
        <BestBoardCard />
        <BestBoardCard />
        <BestBoardCard />
        {/* 모바일일 때 1개, 태블릿 일 때 2개, 풀사이즈 일 때 3개로 수정해야 함.*/}
      </div>
    </div>
  );
}
