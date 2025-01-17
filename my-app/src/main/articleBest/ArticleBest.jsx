import "./articleBest.css";

export function ArticleBest({ info }) {
  if (info === undefined) {
    return <div>로딩중</div>;
  }
  return (
    <div id="articleBest">
      <p id="productBestTitle">베스트 상품</p>
      <div id="articleBestBox">
        {info.map((item, index) => {
          return (
            <div className="articleBestBoxContents">
              <div
                className="articleBestProductImg"
                style={{ backgroundImage: `url(${item.images})` }}
              ></div>
              <p className="articleBestProductName">{item.name}</p>
              <p className="articleBestProductPrice">{item.price}원</p>
              <div className="articleBestProductFavoriteCount">
                <img
                  src={process.env.PUBLIC_URL + "/img/ic_heart.png"}
                  alt=""
                />
                <p>{item.favoriteCount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
