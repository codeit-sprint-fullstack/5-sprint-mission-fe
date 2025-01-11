import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import ProductCard from "../bestproduct/ProductCard";
import productService from "../apis/productService";
import Pagination from "./Pagination";

const ProductList = () => {
  // const products = [
  //     {
  //       "id": 15,
  //       "name": "레노버 노트북",
  //       "description": "레노버 아이디어패드 5",
  //       "price": 800000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 4,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-07-29T05:45:03.249Z"
  //     },
  //     {
  //       "id": 14,
  //       "name": "갤럭시 S21",
  //       "description": "삼성 갤럭시 S21",
  //       "price": 600000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-11-04T07:05:08.516Z"
  //     },
  //     {
  //       "id": 13,
  //       "name": "아이패드",
  //       "description": "애플 아이패드 10.2인치",
  //       "price": 450000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-11-02T04:53:07.717Z"
  //     },
  //     {
  //       "id": 12,
  //       "name": "퀸사이즈 침대",
  //       "description": "퀸사이즈 침대 프레임",
  //       "price": 500000,
  //       "tags": [
  //         "가구"
  //       ],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-09-24T06:27:06.783Z"
  //     },
  //     {
  //       "id": 11,
  //       "name": "판다인형",
  //       "description": "귀여운 판다인형입니다",
  //       "price": 30000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-09-24T00:20:49.433Z"
  //     },
  //     {
  //       "id": 10,
  //       "name": "맥북 프로",
  //       "description": "애플 맥북 프로 13인치",
  //       "price": 1500000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-11-05T03:49:28.400Z"
  //     },
  //     {
  //       "id": 9,
  //       "name": "스니커즈",
  //       "description": "편안한 스니커즈",
  //       "price": 100000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-09-23T08:50:50.020Z"
  //     },
  //     {
  //       "id": 8,
  //       "name": "갤럭시 탭 S7",
  //       "description": "삼성 갤럭시 탭 S7",
  //       "price": 350000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-09-23T08:56:45.396Z"
  //     },
  //     {
  //       "id": 7,
  //       "name": "보스 헤드폰",
  //       "description": "보스 노이즈 캔슬링 헤드폰 700",
  //       "price": 350000,
  //       "tags": [],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 1,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-09-23T08:46:17.234Z"
  //     },
  //     {
  //       "id": 6,
  //       "name": "사무용 의자",
  //       "description": "편안한 사무용 의자",
  //       "price": 120000,
  //       "tags": [
  //         "가구"
  //       ],
  //       "images": [
  //         "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
  //       ],
  //       "ownerId": 1,
  //       "favoriteCount": 0,
  //       "createdAt": "2024-07-29T05:45:03.249Z",
  //       "updatedAt": "2024-09-23T09:10:47.588Z"
  //     }
  //   ];
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  //   const pageSize = 5;

  useEffect(() => {
    productService
      .getProducts(currentPage, 10, "recent")
      .then((response) => {
        setProducts(response.list);
        setTotalCount(response.totalCount);
        console.log("총 개수:", response.totalCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, totalCount]);

  return (
    <div className="mb-[140px]">
      <div className="w-full px-6 mx-auto" style={{ maxWidth: "1200px" }}>
        {/* 해더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold mb-4">판매중인 상품</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                // value={searchQuery}
                // onChange={handleSearch}
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => console.log("상품 등록하기 클릭")}
            >
              상품 등록하기
            </button>
            {/* TODO: 커스텀 셀렉터 만들기 */}
            <select
              //   value={sortOption}
              //   onChange={handleSort}
              className="border rounded-lg px-4 py-2"
            >
              <option value="latest">최신순</option>
              <option value="liked">좋아요순</option>
            </select>
          </div>
        </div>
        {/* 상품 카드들 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductList;
