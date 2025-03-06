"use client";

import { localStorageKeys } from "../service/auth/authInstance";
import { useQueryClient } from "@tanstack/react-query";
import { articleKeys, commentKeys, productKeys } from "./queryKeys";

/*
로그인/회원가입하고 로컬스토리지 저장/쿼리 무효화
*/
export const setLocalStorage = ({
  refreshToken,
  accessToken,
}: {
  refreshToken?: string;
  accessToken: string;
}) => {
  const queryClient = useQueryClient();

  localStorage.setItem(localStorageKeys.refreshToken, refreshToken ?? "");
  localStorage.setItem(localStorageKeys.accessToken, accessToken);

  // 관련 쿼리 모두 무효화
  queryClient.invalidateQueries({ queryKey: commentKeys.all });
  queryClient.invalidateQueries({ queryKey: articleKeys.all });
  queryClient.invalidateQueries({ queryKey: productKeys.all });
};
