import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004",
  timeout: 5000, // 5초 제한
  headers: {
    "Content-Type": "application/json",
  },
});

// // 요청 인터셉터 (요청을 보내기 전에 실행)
// api.interceptors.request.use(
//   (config) => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 응답 인터셉터 (응답을 받은 후 실행)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   }
// );

export default api;
