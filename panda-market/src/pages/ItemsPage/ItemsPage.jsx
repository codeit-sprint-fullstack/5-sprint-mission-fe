import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOffset,
  getTotalPageList,
  isActiveNextPageGroupChangeButton,
} from "../../utils/paginationUtils.js";
import Button from "../../common/Button.jsx";
import InputTextarea from "../../common/InputTextarea.jsx";
import Item from "./components/item.jsx";
import PageButton from "./components/PageButton.jsx";
import ProductService from "../../services/ProductService.js";
import DropdownList from "./components/DropdownList.jsx";
import { useScreenType } from "../../hooks/useScreenType";

/*
1. 초기 랜더링
  - useEffect(api요청) 동작: apiQuery 기본 셋팅값으로 데이터 불러와.(함수 가제 requestApi) ok
  - useEffect(pageBar 그룹 바뀜) 동작: apiQuery 기본 셋팅값으로 불러온 데이터를 기준으로 pageBar 랜더링 ok

2. 변화1(페이지가 바뀜) - handleClickPageButton
  - setPageBar(activePage): 사용자가 페이지 버튼 클릭 -> pageButton 스타일 바뀜 ok
  - useEffect(api요청) 동작: setPageBar(activePage) -> useEffect로 인해 requestApi 실행돼서 데이터 새로 불러옴 ok

3. 변화2(정렬이 바뀜)
  - setApiQuery(order): 사용자가 정렬 바꿈 ok
  - setPageBar(activePage, currentStartPage): 1페이지로 초기화 ok
  - useEffect(api요청) 동작: seEffect로 인해 requestApi 실행돼서 데이터 새로 불러옴 ok
  - 
4. 변화3(화면 크기가 바뀜)
  - setApiQuery(limit): 사용자 화면 크기에 따라 limit 바뀜(limit제외 query 전부 초기화)
  - useEffect(api 요청) 동작: setApiQuery -> useEffect로 인해 requestApi 실행돼서 데이터 새로 불러옴
5. 변화4(페이지 그룹 바뀜) - handleClickPrevPageGroupButton, handleClickNextPageGroupButton
  - setPageBar(currentStartPage, activePage): 사용자가 그룹 이전/이후 버튼 클릭 -> 그룹 시작페이지, 활성화 페이지 바뀜 ok
  - useEffect(pageBar 그룹 바뀜): setPageBar -> 페이지바 새로 렌더링 ok
  - useEffect(api 요청): setPageBar(activePage) -> useEffect로 인해 requestApi 실행돼서 새로 데이터 불러옴 ok

6. 변화5(키워드 바뀜) ok
*/

function ItemsPage() {
  // *** state ***
  // api 요청 관련 state
  const [apiQuery, setApiQuery] = useState({
    limit: 10,
    order: "recent",
    keyword: "",
  }); // offset은 pageBar에 의해 바뀜

  // 데이터 관련 state
  const [data, setData] = useState({
    renderingData: [],
    totalCount: 0,
  });

  // 페이지 관련 state
  const [pageBar, setPageBar] = useState({
    groupSize: 5,
    currentStartPage: 0,
    currentPageList: [],
    activePage: 0,
  });

  // 그외 state
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const screenType = useScreenType();
  const [inputTemp, setInputTemp] = useState("");

  // *** useEffect ***
  // 데이터 불러오기
  const loadProductList = async (options) => {
    let result;
    try {
      result = await ProductService.getProductList(options);
    } catch (error) {
      console.error(error);
      return;
    }
    const { data, totalCount } = result;
    setData((prev) => ({
      ...prev,
      renderingData: data,
      totalCount,
    }));
  };

  useEffect(() => {
    loadProductList({
      sort: apiQuery.order,
      offset: getOffset(pageBar.activePage, apiQuery.limit),
      limit: apiQuery.limit,
      keyword: apiQuery.keyword,
    });
  }, [pageBar.activePage, apiQuery]); // 사용자 요청에 따라 바뀜(activePage - handleClickPageButton, order - handleClickOrderButton(가제), limit - 화면 크기)

  // 페이지바 그룹 불러오기
  useEffect(() => {
    const totalPageList = getTotalPageList(data.totalCount, apiQuery.limit);
    const updatedCurrentPageList = totalPageList.slice(
      pageBar.currentStartPage,
      pageBar.currentStartPage + pageBar.groupSize
    );
    setPageBar((prev) => ({
      ...prev,
      currentPageList: updatedCurrentPageList,
    }));
  }, [data.totalCount, pageBar.currentStartPage]); // data.totalCount -> 데이터 요청될때 바뀔 수 있음, currentStartPage -> 사용자 요청에 따라 바뀜

  // 반응형 웹 -> 화면크기에 따라 limit 바꾸기
  useEffect(() => {
    if (screenType === "desktop") {
      setPageBar((prev) => ({
        ...prev,
        currentStartPage: 0,
        activePage: 0,
      }));
      setApiQuery((prev) => ({
        ...prev,
        limit: 10,
      }));
    } else if (screenType === "tablet") {
      setPageBar((prev) => ({
        ...prev,
        currentStartPage: 0,
        activePage: 0,
      }));
      setApiQuery((prev) => ({
        ...prev,
        limit: 6,
      }));
    } else if (screenType === "mobile") {
      setPageBar((prev) => ({
        ...prev,
        currentStartPage: 0,
        activePage: 0,
      }));
      setApiQuery((prev) => ({
        ...prev,
        limit: 4,
      }));
    }
  }, [screenType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageBar((prev) => ({
        ...prev,
        currentStartPage: 0,
        activePage: 0,
      }));
      setApiQuery((prev) => ({
        ...prev,
        keyword: inputTemp,
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [inputTemp]);

  // *** 핸들러 ***
  // 페이지 버튼 클릭
  const handleClickPageButton = (page) => {
    const updatedActivePage = page;
    setPageBar((prev) => ({
      ...prev,
      activePage: updatedActivePage,
    }));
  };

  // 페이지 그룹 변경 버튼(<, >) 클릭
  const handleClickPageGroupChangeButton = {
    prev: () => {
      const updatedStartPage = pageBar.currentStartPage - pageBar.groupSize;
      setPageBar((prev) => ({
        ...prev,
        currentStartPage: updatedStartPage,
        activePage: updatedStartPage,
      }));
      console.log("prevButton", apiQuery.limit);
    },
    next: () => {
      const updatedStartPage = pageBar.currentStartPage + pageBar.groupSize;
      setPageBar((prev) => ({
        ...prev,
        currentStartPage: updatedStartPage,
        activePage: updatedStartPage,
      }));
      console.log("nextButton", apiQuery.limit);
    },
  };

  // 드롭다운 열고 닫기
  const handleClickDropdown = () => {
    setIsActiveDropdown((prev) => !prev);
  };

  // 정렬 바꾸기
  const handleClickOrderButton = (order) => {
    setApiQuery((prev) => ({
      ...prev,
      order,
    }));
    setPageBar((prev) => ({
      ...prev,
      currentStartPage: 0,
      activePage: 0,
    }));
    setIsActiveDropdown((prev) => !prev);
  };

  return (
    <main className="flex justify-center pt-[26px] pb-[140px]">
      <section className="pc:w-[1200px] tablet:w-[740px] mobile:w-[400px] flex flex-col gap-[24px]">
        {screenType !== "mobile" && (
          <header className="flex justify-between">
            <h1 className="text-[20px] font-[700] text-secondary-800">
              판매 중인 상품
            </h1>
            <div className="flex items-center gap-[12px]">
              <InputTextarea
                InputOrTextarea="input"
                placeholder="검색할 상품을 입력해주세요"
                onChange={(e) => setInputTemp(() => e.target.value)}
                value={inputTemp}
                classNames="pc:w-[325px] tablet:w-[250px] h-[42px] px-[20px] py-[9px]"
              />
              <Link to="/registration">
                <Button classNames="w-[133px] h-[42px] rounded-[8px]">
                  상품 등록하기
                </Button>
              </Link>
              <DropdownList
                currentOrder={apiQuery.order}
                onClick={() => handleClickDropdown()}
                onClickOrderButton={handleClickOrderButton}
                isActive={isActiveDropdown}
              />
            </div>
          </header>
        )}
        {screenType === "mobile" && (
          <header className="flex flex-col gap-[10px]">
            <div className="flex justify-between">
              <h1 className="text-[20px] font-[700] text-secondary-800">
                판매 중인 상품
              </h1>
              <Link to="/registration">
                <Button classNames="w-[133px] h-[42px] rounded-[8px]">
                  상품 등록하기
                </Button>
              </Link>
            </div>
            <div className="flex justify-between items-center gap-[12px]">
              <InputTextarea
                InputOrTextarea="input"
                placeholder="검색할 상품을 입력해주세요"
                onChange={(e) => setInputTemp(() => e.target.value)}
                value={apiQuery.keyword}
                classNames="w-[250px] h-[42px] px-[20px] py-[9px]"
              />
              <DropdownList
                currentOrder={apiQuery.order}
                onClick={() => handleClickDropdown()}
                onClickOrderButton={handleClickOrderButton}
                isActive={isActiveDropdown}
              />
            </div>
          </header>
        )}
        <ul className="grid pc:grid-cols-5 tablet:grid-cols-3 mobile:grid-cols-2 pc:gap-[24px] tablet:gap-[10px]">
          {data.renderingData.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              price={item.price}
              favoriteCount={item.favorite}
            />
          ))}
        </ul>
        <footer className="flex justify-center gap-[4px] pt-[19px]">
          <PageButton
            disabled={pageBar.currentStartPage <= 0}
            content="<"
            onClick={() => handleClickPageGroupChangeButton.prev()}
          />
          {pageBar.currentPageList.map((page) => (
            <PageButton
              key={page}
              content={page + 1}
              isActive={pageBar.activePage === page}
              onClick={() => handleClickPageButton(page)}
            />
          ))}
          <PageButton
            disabled={
              !isActiveNextPageGroupChangeButton(
                data.totalCount,
                apiQuery.limit,
                pageBar.currentStartPage,
                pageBar.groupSize
              )
            }
            content=">"
            onClick={() => handleClickPageGroupChangeButton.next()}
          />
        </footer>
      </section>
    </main>
  );
}

export default ItemsPage;
