import axios from "axios";
import { logout } from "./authService";

/* 기능: API 설정
 * API 기본 URL과 axios 인스턴스 설정
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* 로직: 인증 처리
 * 요청 인터셉터: API 요청 시 인증 토큰 자동 추가
 */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* 로직: 에러 처리
 * 응답 인터셉터: 401 인증 오류 자동 처리 및 로그아웃
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.href = "/login?expired=true";
      }

      return Promise.reject(
        new Error("인증이 만료되었습니다. 다시 로그인해 주세요.")
      );
    }

    return Promise.reject(error);
  }
);

export default api;
