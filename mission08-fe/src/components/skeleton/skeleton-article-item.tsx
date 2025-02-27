import Skeleton from "./Skeleton"; // Skeleton 컴포넌트 경로에 맞게 수정

export default function SkeletonArticleItem() {
  return (
    <article className="bg-gradient-to-t from-[#FCFCFC] to-white border-b border-gray-200 flex flex-col gap-4">
      <section className="flex items-start justify-between">
        {/* 제목 영역 */}
        <Skeleton className="min-w-0 h-7 w-3/4 rounded" />
        {/* 이미지 영역 */}
        <Skeleton className="w-20 aspect-square p-3 rounded-md" />
      </section>

      <section className="flex items-center justify-between">
        {/* 작성자 정보 영역 */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-full" /> {/* 프로필 아이콘 */}
          <Skeleton className="w-10 h-4 rounded" /> {/* 작성자 이름 */}
          <Skeleton className="w-20 h-4 rounded" /> {/* 날짜 */}
        </div>

        {/* 좋아요 영역 */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="w-6 h-6 rounded" /> {/* 좋아요 아이콘 */}
          <Skeleton className="w-5 h-4 rounded" /> {/* 좋아요 수 */}
        </div>
      </section>
    </article>
  );
}
