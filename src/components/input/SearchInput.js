import searchIcon from "@/assets/images/ic-search.svg";
import Image from "next/image";

function SearchInput({ placeholder, value, onChange }) {
  const handleKeywordChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center bg-[#F3F4F6] rounded-[12px] pl-[16px] pr-[20px] h-[42px] flex-grow">
      <Image src={searchIcon} alt="search" width={24} height={24} />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleKeywordChange}
        className="w-full h-[48px] outline-none bg-transparent border-none px-[16px] py-[12px] placeholder:gray-200"
      />
    </div>
  );
}

export default SearchInput;
