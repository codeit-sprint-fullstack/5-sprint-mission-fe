import searchIcon from "../../assets/icons/ic_search.svg";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="w-full h-[42px] bg-[#F3F4F6] px-4 py-2 flex items-center gap-1 rounded-xl">
      <Image src={searchIcon} alt="search" width={24} height={24} />
      <input
        className="w-full text-base bg-transparent outline-none"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
      ></input>
    </div>
  );
}
