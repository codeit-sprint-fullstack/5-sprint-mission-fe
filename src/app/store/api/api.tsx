import { create } from "zustand";
import axios from "axios";

const productAxios = axios.create({
  baseURL: "https://panda-market-api.vercel.app/products",
  headers: { "Content-Type": "application/json" },
});

interface ProductState {
  bestProducts: {
    name: string;
    price: string;
    favoriteCount: number;
    images: string[];
  }[]; // 베스트 상품 데이터
  Products: {
    name: string;
    price: string;
    favoriteCount: number;
    images: string[];
  }[]; // 최근 상품 데이터
  loading: boolean; // 로딩 상태
  error: string | null; // 에러 상태
  totalPage: number;
  fetchBestProducts: (page: number, pageSize: number) => Promise<void>; // 베스트 상품 데이터 로드
  fetchProducts: (
    page: number,
    pageSize: number,
    orderBy: string,
    keyword: string
  ) => Promise<void>; // 최근 상품 데이터 로드
}

const useProductStore = create<ProductState>((set) => ({
  bestProducts: [],
  Products: [],
  loading: false,
  error: null,
  totalPage: 0,

  // 베스트 상품 가져오기
  fetchBestProducts: async (page, pageSize) => {
    set({ loading: true, error: null });
    try {
      const params = { page, pageSize, orderBy: "favorite", keyword: "" };
      const response = await productAxios.get("", { params });
      set({ bestProducts: response.data.list, loading: false });
    } catch (err: unknown) {
      set({ error: err.message, loading: false });
    }
  },

  // 최근 상품 가져오기
  fetchProducts: async (page, pageSize, orderBy, keyword) => {
    set({ loading: true, error: null });
    try {
      const params = { page, pageSize, orderBy, keyword };
      const response = await productAxios.get("", { params });
      set({
        Products: response.data.list,
        loading: false,
        totalPage: response.data.totalCount,
      });
    } catch (err: unknown) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useProductStore;
