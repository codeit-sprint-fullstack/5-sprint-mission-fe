import React, { useState, useEffect, useCallback } from "react";
import GetItemsApi from "../feature/GetItemsApi";
import ItemCard from "./ItemCard";
import SetOrder from "../feature/SetOrder";
import SearchBar from "../../common/SearchBar";
import Pagination from "../feature/Pagination";
import HamburgerIcon from "../../assets/img/ic_sort.png";

const ItemList = () => {
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState("recent"); // 상태 변경
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const totalPage = 21;
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [dropDownVisible, setDropDownVisible] = useState(false); //햄버거버튼

  const setValue = (e) => {
    setSearchTerm(e.target.value);
  };

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(4); // Mobile
    } else if (width < 1024) {
      setItemsPerPage(6); // Tablet
    } else {
      setItemsPerPage(10); // Desktop
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 페이지 변경 시 API 호출
  const fetchPageData = async (page) => {
    try {
      const response = await GetItemsApi({
        orderBy,
        page: page.toString(),
        pageSize: itemsPerPage.toString(),
        search: searchTerm,
      });
      setData(response); // 현재 페이지 데이터 설정
      console.log("검색어 전달값:", searchTerm);
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };

  // 데이터 가져오기 트리거
  useEffect(() => {
    console.log("fetchPageData 트리거:", {
      page,
      orderBy,
      searchTerm,
      itemsPerPage,
    });
    fetchPageData(page);
  }, [page, orderBy, searchTerm, itemsPerPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  // 햄버거 메뉴 토글
  const toggleMenu = () => {
    setDropDownVisible(!dropDownVisible);
  };

  return (
    <>
      <div className="mt-4 md:px-6 ">
        <div className="grid grid-cols-3 md:flex lg:flex gap-3 items-center relative md:justify-between sm:flex sm:justify-between ">
          {/* 판매중인 상품 제목 */}
          <h2 className="whitespace-nowrap text-2xl font-bold col-span-1">
            판매중인 상품
          </h2>
          {/* <div className="sm:col-span-1"></div> //empty */}
          {/* 검색바 */}
          <div className="col-span-2 order-3 sm:order-2 h-[42px] sm:flex justify-end w-full">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setValue}
              className="w-[325px] mr-3"
            />
          </div>
          {/* 상품 등록하기 버튼 */}
          <a
            className="col-span-2 sm:col-span-1 order-2 sm:flex md:flex text-base w-[calc(100%-6rem)] mr-12 sm:w-[133px] md:w-[133px] sm:mr-0 whitespace-nowrap font-semibold text-center h-[42px] sm:py-2 md:px-4 sm:px-6 bg-[#3692ff] mx-auto  border-none rounded-lg text-[#f3f4f6] no-underline cursor-pointer flex items-center justify-center"
            href="\login.html"
          >
            상품 등록하기
          </a>
          {/* 드롭다운 메뉴 */}
          <div
            className={`${
              dropDownVisible ? "absolute" : "hidden"
            } col-span-1 sm:order-4 sm:block sm:relative md:justify-self-end sm:justify-self-end`}
          >
            <SetOrder
              setSortOrder={setOrderBy}
              dropDownVisible={dropDownVisible}
              setDropDownVisible={setDropDownVisible}
              className="w-[130px] mr-3"
            />
          </div>
          <button
            onClick={toggleMenu}
            className="col-span-1 order-4 border top-[calc(100%-10px)] border-gray-300 w-[42px] h-[42px] p-2 rounded-xl ml-auto sm:hidden justify-self-end"
          >
            <img src={HamburgerIcon} alt="드롭다운햄버거" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:px-6 lg:grid-cols-5 gap-4 w-full mt-6 mb-[43px]">
        {data.slice(0, itemsPerPage).map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination totalPage={totalPage} onPageChange={handlePageChange} />
    </>
  );
};

export default ItemList;
