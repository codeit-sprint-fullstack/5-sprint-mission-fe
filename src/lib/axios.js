import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
  // baseURL: `http://${process.env.NEXT_PUBLIC_DATABASE_HOST}:${process.env.NEXT_PUBLIC_DATABASE_PORT}`,
});

instance.interceptors.request.use(
  (config) => {
    // 브라우저 환경에서만 localStorage 접근
    if (typeof window !== "undefined") {
      const token = window.localStorage
        .getItem("access_token")
        ?.replace(/"/g, "");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (typeof window !== "undefined") {
        // localStorage에서 refresh token 가져오기
        const refreshToken = window.localStorage
          .getItem("refresh_token")
          ?.replace(/"/g, "");
        if (refreshToken) {
          // refresh token을 사용하여 새로운 access token 요청
          const response = await instance.post("/auth/refresh-token", {
            refreshToken,
          });
          const newAccessToken = response.data.accessToken;
          // 새로운 access token을 localStorage에 업데이트
          window.localStorage.setItem(
            "access_token",
            JSON.stringify(newAccessToken)
          );
          // 원래 요청의 헤더 업데이트 후 재시도
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest._retry = true;
          return instance(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
