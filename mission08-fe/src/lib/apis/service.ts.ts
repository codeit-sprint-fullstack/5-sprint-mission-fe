"use server"; // revalidateTag 사용을 위해 필요

import type { Query } from "@/types";
import { apiLocal as api } from "./axios";
import { revalidateTag } from "next/cache";

type EndPoint = `/${string}`;
type FetchOptions =
  | { cache: "no-store" | "no-cache" | "force-cache" }
  | { next: { revalidate?: number; tags?: string[] } };

// 조회 요청 함수
export const fetchData = async <T>(
  endPoint: EndPoint,
  fetchOptions?: FetchOptions,
  params?: Query
): Promise<T> => {
  try {
    const response = await api.get(endPoint, {
      adapter: "fetch",
      fetchOptions,
      params,
    });
    const result: T = response.data;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 생성 요청 함수
export const postData = async <T>(
  endPoint: EndPoint,
  data: T,
  tags?: string[]
): Promise<boolean> => {
  try {
    await api.post(endPoint, data);

    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 수정 요청 함수
export const patchData = async <T>(
  endPoint: EndPoint,
  data: T,
  tags?: string[]
): Promise<boolean> => {
  try {
    await api.patch(endPoint, data);

    if (tags) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 삭제 요청 함수
export const deleteData = async (
  endPoint: EndPoint,
  tags?: string[]
): Promise<boolean> => {
  try {
    await api.delete(endPoint);

    if (tags) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const reactQueryGet = async <T>(endPoint: EndPoint) => {
  const response = await api.get(endPoint);
  const data: T = response.data;
  return data;
};
