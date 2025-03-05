import Image from "next/image";
import iconSearch from "@/assets/icons/ic_search.png";

interface SearchProps {
  onSearch: (keyword: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onSearch(e.target.value);

  return (
    <div className="flex-1 px-4 py-2 flex items-center gap-1 bg-gray-100 rounded-xl">
      <Image src={iconSearch} alt="검색창" width={24} height={24} />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요."
        className="flex-1 bg-transparent outline-none"
        onChange={handleChange}
      />
    </div>
  );
}
