export default function PaginationItem({ children, isSelect }) {
  return (
    <div
      className={`
        w-[40px] h-[40px] flex justify-center items-center rounded-full border cursor-pointer
        ${
          isSelect
            ? "bg-[#2F80ED] text-white border-[#2F80ED]"
            : "bg-white text-[#6B7280] border-[#e5e7eb]"
        }`}
    >
      {children}
    </div>
  );
}
