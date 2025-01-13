import { /*useState,*/ useEffect } from "react";
import ProductCard from "./ProductCard";
// import productService from "../apis/productService";

const BestProducts = () => {
  //   const [bestProducts, setBestProducts] = useState([]);

  const bestProducts = [
    {
      id: 226,
      name: "푸바오 찾아 떠나는 청두 여행!!",
      description: "제 딸 푸바오가 있는 쓰촨성 청두로 날아가 보세요!!!",
      price: 99999999,
      tags: ["푸바오", "러바오", "아이바오", "루이바오", "후이바오"],
      images: [
        "https://image.hanatour.com/usr/cms/resize/800_0/2024/08/11/10000/687449d1-4e4f-4952-b6d1-5342465880f5.jpg",
      ],
      ownerId: 177,
      favoriteCount: 33,
      createdAt: "2024-09-23T11:25:06.306Z",
      updatedAt: "2024-12-26T00:10:07.428Z",
    },
    {
      id: 199,
      name: "아이폰 16 pro",
      description: "따끈한 아이폰!",
      price: 1290000,
      tags: [],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/98/1726837429259/iphone.jpg",
      ],
      ownerId: 98,
      favoriteCount: 12,
      createdAt: "2024-09-20T13:03:49.397Z",
      updatedAt: "2024-12-03T07:30:07.916Z",
    },
    {
      id: 197,
      name: "갤럭시 버즈3",
      description: "버즈3 입니다~",
      price: 500000,
      tags: ["이어폰"],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/107/1726730417522/buds.jpg",
      ],
      ownerId: 107,
      favoriteCount: 8,
      createdAt: "2024-09-19T07:20:17.749Z",
      updatedAt: "2024-11-04T08:48:04.001Z",
    },
    {
      id: 355,
      name: "단풍잎",
      description: "단풍잎 하나 사세요",
      price: 1000,
      tags: ["단풍", "단풍잎"],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1728454687724/leaf-6760484_640.jpg",
      ],
      ownerId: 36,
      favoriteCount: 6,
      createdAt: "2024-10-09T06:18:33.271Z",
      updatedAt: "2024-12-19T07:09:24.722Z",
    },
    {
      id: 114,
      name: "갤럭시 탭 S7",
      description: "삼성 갤럭시 탭 S7",
      price: 350000,
      tags: [],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png",
      ],
      ownerId: 1,
      favoriteCount: 6,
      createdAt: "2024-07-29T05:45:03.249Z",
      updatedAt: "2024-07-29T05:45:03.249Z",
    },
    {
      id: 107,
      name: "퀸사이즈 침대",
      description: "퀸사이즈 침대 프레임",
      price: 500000,
      tags: ["가구"],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png",
      ],
      ownerId: 1,
      favoriteCount: 6,
      createdAt: "2024-07-29T05:45:03.249Z",
      updatedAt: "2024-07-29T05:45:03.249Z",
    },
    {
      id: 103,
      name: "갤럭시 탭 S7",
      description: "삼성 갤럭시 탭 S7",
      price: 350000,
      tags: [],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png",
      ],
      ownerId: 1,
      favoriteCount: 6,
      createdAt: "2024-07-29T05:45:03.249Z",
      updatedAt: "2024-07-29T05:45:03.249Z",
    },
    {
      id: 97,
      name: "퀸사이즈 침대",
      description: "퀸사이즈 침대 프레임",
      price: 500000,
      tags: ["가구"],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png",
      ],
      ownerId: 1,
      favoriteCount: 6,
      createdAt: "2024-07-29T05:45:03.249Z",
      updatedAt: "2024-07-29T05:45:03.249Z",
    },
    {
      id: 95,
      name: "갤럭시 탭 S7",
      description: "삼성 갤럭시 탭 S7",
      price: 350000,
      tags: [],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png",
      ],
      ownerId: 1,
      favoriteCount: 6,
      createdAt: "2024-07-29T05:45:03.249Z",
      updatedAt: "2024-07-29T05:45:03.249Z",
    },
    {
      id: 88,
      name: "퀸사이즈 침대",
      description: "퀸사이즈 침대 프레임",
      price: 500000,
      tags: ["가구"],
      images: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png",
      ],
      ownerId: 1,
      favoriteCount: 6,
      createdAt: "2024-07-29T05:45:03.249Z",
      updatedAt: "2024-07-29T05:45:03.249Z",
    },
  ];

  useEffect(() => {
    // productService
    //   .getProducts()
    //   .then((response) => {
    //     setBestProducts(response.list);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  return (
    <div className="mt-[26px] mb-[40px] pt-[64px]">
      <div className="w-full px-6 mx-auto" style={{ maxWidth: "1200px" }}>
        <h2 className="text-lg font-bold mb-4">베스트 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestProducts.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className={`
                // 풀사이드 4개 태블릿 2개 모바일 1개 나머지는 숨기기
                w-full
                ${index === 0 ? "" : "hidden md:block"} 
                ${index >= 2 ? "md:hidden lg:block" : ""}
              `}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestProducts;
