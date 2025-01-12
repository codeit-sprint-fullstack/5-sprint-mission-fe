import { useState, useEffect } from "react"; // 상태관리를 위한 useState, 컴포넌트가 마운트될때 데이터 fetching(비동기 작업)을 수행할 useEffect
import "./App.css";
import ItemCard from "./item_card"; // 상품정보를 보여줄 ItemCard 컴포넌트
import { fetchProducts } from "./api"; // API에서 데이터를 가져오는 함수 fetchProducts 불러오기

function App() {
  const [products, setProducts] = useState([]); // 전체 상품  목록을 저장할 상태 products 선언, 초기값 빈 배열
  const [bestProducts, setBestProducts] = useState([]); // 베스트 상품 목록을 저장할 상태 bestProudcts 선언, 초기값 빈 배열
  const [loading, setLoading] = useState(true); // 데이터를 가져오는 동안 로딩 상태를 관리하기 위한 loading 상태, 초기값 true
  const [error, setError] = useState(null); // 에러 상태 시 에러 메시지를 저장할 error 상태 선언, 초기값 null

  useEffect(() => {
    async function loadProducts() {
      //비동기함수 loadProducts()호출하여 데이터를 가져오기
      try {
        // 베스트 상품 데이터 가져오기
        const data = await fetchProducts(); //API에서 상품 데이터를 가져와서 data에 저장

        // 전체 상품 설정
        setProducts(data.list || []);
        //API에서 가져온 **전체 상품 목록(data.list)**을 products 상태에 저장, data.list가 null 또는 undefined일 경우, 빈 배열 []을 설정하여 오류를 방지

        // 상위 4개의 베스트 상품만 설정
        const sortedBestProducts = data.list.slice(0, 4);
        setBestProducts(sortedBestProducts);

        setLoading(false); // 초기상태 setLoading(true)-> api 요청이 완료되기 전까지 계속 true 상태. API 요청이 성공적으로 완료되거나 에러가 발생하여 요청이 종료되면 setLoading(false)를 호출하여 로딩 상태를 종료
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        // API 요청 중 에러가 발생할 수 있으므로, 에러를 try...catch 블록으로 처리합니다.  실패했을 때 에러 메시지 알리고
        setLoading(false); // 에러가 발생해도 로딩상태 종료
      }
    }

    loadProducts(); // 호출하여 데이터를 불러온다
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } //loading이 true일 때는 데이터를 아직 받아오지 않은 상태임을 화면에 “Loading…” 메시지를 통해 보여줌

  if (error) {
    return <p>Error: {error}</p>;
  } //error가 null이 아닐 때 화면에 표시하여 에러가 발생했음을 알림, 데이터 로딩에 실패했음을 알려줌

  return (
    <>
      <header id="home-header">
        <div className="left-section">
          <img src="/logo.png" style={{ width: "153px", height: "51px" }} />
          <div className="nav-menu">자유게시판</div>
          <div className="nav-menu">중고마켓</div>
        </div>
        <a href="login.html">
          <button id="login">로그인</button>
        </a>
      </header>

      <div id="container">
        {/* 베스트 상품 섹션 */}
        <div id="best-item">
          <h2 className="best-title">베스트 상품</h2>
          <div className="best-items">
            {/* bestProducts 상태에 저장된 베스트 상품 데이터를 map 메서드로 순회하며 각각의 ItemCard 컴포넌트를 렌더링합니다. */}
            {bestProducts.map((product) => (
              <ItemCard
                key={product.id}
                imageUrl={
                  product.images[0] ? product.images[0] : "/default-image.png"
                }
                name={product.name}
                price={product.price}
                likes={product.favoriteCount} // 좋아요 수 표시
              />
            ))}
          </div>
        </div>

        {/* 판매 중인 상품 섹션 */}
        <div id="selling-item">
          <h2 className="selling-title">판매 중인 상품</h2>
          <div className="selling-items">
            {/* products 상태에 저장된 전체 상품 데이터를 map 메서드로 순회하며 각각의 ItemCard 컴포넌트를 렌더링합니다. */}
            {products.map((product) => (
              <ItemCard
                key={product.id}
                imageUrl={
                  product.images[0] ? product.images[0] : "/default-image.png"
                }
                name={product.name}
                price={product.price}
                likes={product.likes}
              />
            ))}
          </div>
        </div>
      </div>

      <footer>
        <div>
          <p>©codeit - 2024</p>
        </div>
        <div id="policy_box">
          <p>
            <a href="privacy.html">Privacy Policy</a>
          </p>
          <p>
            <a href="FAQ.html">FAQ</a>
          </p>
        </div>
        <div id="footer_ic">
          <p>
            <a href="https://www.facebook.com/codeit.kr/" target="_blank">
              <img src="/ic_facebook.png" />
            </a>
          </p>
          <p>
            <a href="https://x.com/codeitkr" target="_blank">
              <img src="/ic_twitter.png" />
            </a>
          </p>
          <p>
            <a
              href="https://www.youtube.com/channel/UCCM79CPm2WbBYTRaiNEExbg"
              target="_blank"
            >
              <img src="/ic_youtube.png" />
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/codeit_kr/" target="_blank">
              <img src="/ic_instagram.png" />
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
