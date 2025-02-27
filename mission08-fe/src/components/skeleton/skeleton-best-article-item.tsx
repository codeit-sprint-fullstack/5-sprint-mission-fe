import Skeleton from "./Skeleton";

export default function SkeletonBestArticleItem() {
  return (
    <div className="group bg-gray-50 rounded-lg px-6 pb-4 transition-transform duration-300 hover:scale-105">
      <Skeleton className="w-28 h-10 rounded-b-3xl" />

      <section className="flex items-start justify-between mt-4 mb-10 xl:mb-5">
        <Skeleton className="w-36 h-6 rounded-sm" />
        <Skeleton className="w-20 aspect-square p-3 rounded-md" />
      </section>

      <section className="flex items-center justify-between font-normal text-sm">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-4 rounded-sm" />
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-8 h-4 rounded-sm" />
          </div>
        </div>
        <Skeleton className="w-18 h-4 rounded-sm" />
      </section>
    </div>
  );
}
