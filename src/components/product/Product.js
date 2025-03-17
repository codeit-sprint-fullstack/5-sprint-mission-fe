import Image from "next/image";
import searchIcon from "@public/Img/input-icon/ic_search.png";
import Link from "next/link";
import { useState, useMemo } from "react";
import ProductList from "./ProductList";
import ProductCustomSelect from "./ProductCustomSelect";

export default function Product({ products = [] }) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    return sortOrder === "recent"
      ? result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : result.sort((a, b) => (b.favoriteCount || 0) - (a.favoriteCount || 0));
  }, [products, search, sortOrder]);

  return (
    <>
      <div className="flex flex-col w-full gap-[24px]">
        <section className="flex  justify-between">
          <p className="text-xl text-custom-text-black-800 font-bold">게시글</p>
          <Link
            href={"/article/modify"}
            className="px-6 py-2 text-nowrap bg-custom-color-blue text-base text-white font-semibold rounded-lg "
          >
            글쓰기
          </Link>
        </section>

        <section className="relative flex gap-[13px] md:gap-[6px] xl:gap-[16px]">
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-[40px] py-[9px] bg-custom-input-gray-100 rounded-xl focus:outline-none"
          />
          <Image
            src={searchIcon}
            alt="검색 아이콘"
            width={24}
            className="absolute w-[24px] left-[16px] top-1/2 transform -translate-y-1/2"
          />
          <ProductCustomSelect
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </section>

        <section className="flex flex-col md:gap-[16px] xl:gap-[24px]">
          <ProductList products={filteredProducts} />
        </section>
      </div>
    </>
  );
}
