import searchIcon from "../../../../../shared/assets/search_icon.png";

export function SearchItems({ onSearch }) {
  //입력받은 키워드 상위 컴포넌트에 전달해 파라미터 업데이트
  const handleBlur = (e) => {
    const value = e.target.value.trim();
    onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      onSearch(value);
    }
  };

  return (
    <div id="search-items-wrapper">
      <input
        id="input-search-keyword"
        name="keyword"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <img id="item-search-icon" src={searchIcon} alt="돋보기 아이콘" />
    </div>
  );
}
