"use client";
import { Flex } from "@chakra-ui/react";
import { Layout } from "./componants/Layout";
import { BestGoodsGrid } from "./componants/BestGoodsGrid";
import { useEffect, useState } from "react";
import { PageNation } from "./componants/PageNation";
import { GoodsGrid } from "./componants/GoodsGrid";
import { GoodsItem } from "./componants/GoodsItem";
import { BestGoodsItem } from "./componants/BestGoodsItem";
import { debounce } from "./hook/hook";
import useProductStore from "./api/api";

const StorePage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [bestPageSize, setBestPageSize] = useState<number>(4);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [serch, setSerch] = useState<{ order: string; keyWord: string }>({
    order: "recent",
    keyWord: " ",
  });

  const {
    Products,
    bestProducts,
    totalPage,
    fetchBestProducts,
    fetchProducts,
  } = useProductStore();

  useEffect(() => {
    const handleResize = debounce(() => {
      setBestPageSize(Math.min(4, Math.floor(window.innerWidth / 300)));
      setPageSize(Math.min(10, Math.floor(window.innerWidth / 240) * 2));
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    fetchBestProducts(1, bestPageSize);
  }, [bestPageSize]);
  useEffect(() => {
    fetchProducts(page, pageSize, serch.order, serch.keyWord);
    setPageCount(Math.ceil(totalPage / pageSize));
  }, [page, pageSize, serch, pageCount]);
  return (
    <Flex w={"full"} h={"full"}>
      <Layout>
        <BestGoodsGrid title="베스트 상품" girdWidth={bestPageSize}>
          {bestProducts.map((row, index: number) => {
            return <BestGoodsItem key={index} {...row} />;
          })}
        </BestGoodsGrid>
        <GoodsGrid
          title="판매 중인 상품"
          girdWidth={pageSize}
          serch={serch}
          setSerch={setSerch}
        >
          {Products.map((row, index: number) => {
            return <GoodsItem key={index} {...row} />;
          })}
        </GoodsGrid>
        <PageNation page={page} setPage={setPage} count={pageCount} />
      </Layout>
    </Flex>
  );
};

export default StorePage;
