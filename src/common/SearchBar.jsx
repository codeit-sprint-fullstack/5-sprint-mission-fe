import { useState } from "react";
import searchImg from "../assets/img/ic_search.png";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className=" items-center gap-3 ">
      <form className="relative w-full ">
        <img className="absolute left-3 top-2 w-6 h-6" src={searchImg} />
        <input
          name="search"
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={searchTerm}
          onChange={onSearchChange}
          className="bg-gray-100 text-gray-400 h-10 w-full sm:w-80 border rounded-lg p-2 pl-10"
        />
      </form>
    </div>
  );
};

export default SearchBar;
