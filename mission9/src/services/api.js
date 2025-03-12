import axios from "axios";
import { logout } from "./authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      // 토큰이 있으면 헤더에 추가
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized 에러 처리 (토큰 만료)
    if (error.response && error.response.status === 401) {
      console.error("인증 오류 발생 (401):", error.response.data);

      // 토큰 제거 (로그아웃)
      logout();

      // 로그인 페이지로 리다이렉트 (Next.js의 라우터를 직접 사용할 수 없으므로 window.location 사용)
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        console.log("401 오류로 인한 로그인 페이지 리다이렉트");
        window.location.href = "/login?expired=true";
      }

      return Promise.reject(
        new Error("인증이 만료되었습니다. 다시 로그인해 주세요.")
      );
    }

    // 기타 에러 처리
    return Promise.reject(error);
  }
);

export default api;
