import { Query } from "@/types";
import { apiLocal } from "./axios";

type FetchOptions =
  | { cache: "no-store" | "no-cache" | "force-cache" }
  | { next: { revalidate: number } }
  | { next: { tags: string[] } };

// GET 요청 함수
export const fetchData = async <T>(
  endPoint: string,
  fetchOptions: FetchOptions = { cache: "no-store" },
  params?: Query
): Promise<T | null> => {
  try {
    const response = await apiLocal.get(endPoint, {
      adapter: "fetch",
      fetchOptions,
      params,
    });
    const result: T = response.data;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// POST 요청 함수
export const postData = async <T>(
  endPoint: string,
  data: T
): Promise<T | null> => {
  try {
    const response = await apiLocal.post(endPoint, data);
    const result: T = response.data;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// PATCH 요청 함수
export const patchData = async <T>(
  endPoint: string,
  data: T
): Promise<T | null> => {
  try {
    const response = await apiLocal.patch(endPoint, data);
    const result: T = response.data;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteData = async (endPoint: string): Promise<boolean> => {
  try {
    await apiLocal.delete(endPoint);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
