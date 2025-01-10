import searchIcon from "../../../assets/search/ic_search.png";

export default function ProductSearch() {
  return (
    <section className="bg-gray-100 rounded-[12px] py-[9px] px-[16px] flex items-center gap-[4px]">
      <img src={searchIcon} alt="검색" className="w-[24px] h-[24px]" />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        className="w-full text-base font-normal leading-[26px] bg-transparent border-none outline-none"
      />
    </section>
  );
}
