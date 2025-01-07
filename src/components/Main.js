import "./Main.css";

function Main() {
  return (
    <>
      <div className="mainContainer">
        <div>
          <h2>베스트 상품</h2>
          <div>상품 목록</div>
        </div>
        <div>
          <div className="sellProducts">
            <h2>판매 중인 상품</h2>
            <div>상품등록</div>
          </div>
          <div>상품목록</div>
        </div>
        <div>페이지네이션</div>
      </div>
    </>
  );
}

export default Main;
