import { useState, useEffect } from "react";
import axios from "axios";

const URL = "https://five-sprint-mission-be-zs3c.onrender.com/products";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  likes: number; // 좋아요 수
  createdAt: string;
  updatedAt: string;
}

interface UseItemsResult {
  data: Product[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
}

const useItems = (
  searchTerm: string,
  currentPage: number,
  itemsPerPage: number,
  orderBy: string
): UseItemsResult => {
  const [data, setData] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    const fetchItems = async (): Promise<void> => {
      try {
        setLoading(true);
        const apiEndpoint = `${URL}?page=${currentPage}&limit=${itemsPerPage}&orderBy=${orderBy}&keyword=${searchTerm}`;
        console.log("API 요청 URL:", apiEndpoint);
        const response = await axios.get(apiEndpoint);
        console.log("API 응답 데이터:", response.data);
        console.log("현재 페이지:", currentPage);
        console.log("아이템 개수:", itemsPerPage);

        setData(response.data.products || []);
        setTotalProducts(response.data.totalProducts || 0);
      } catch (e) {
        setError(e as Error);
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage, orderBy, itemsPerPage, searchTerm]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return {
    data,
    loading,
    error,
    totalPages,
  };
};

export default useItems;
