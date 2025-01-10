export default function ProductSkeleton() {
  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full mb-[16px] md:mb-[10px] overflow-hidden rounded-lg aspect-w-1 aspect-h-1 bg-gray-200 animate-pulse">
        {/* 이미지 자리 */}
        <div className="w-full h-full bg-gray-300"></div>
      </div>
      <section className="flex flex-col gap-[6px] text-gray-800">
        {/* 상품 이름 자리 */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        {/* 가격 자리 */}
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        {/* 좋아요 수 자리 */}
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </section>
    </div>
  );
}
