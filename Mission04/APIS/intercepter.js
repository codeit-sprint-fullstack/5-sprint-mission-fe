import axios from "axios";

const instance = axios.create({
  baseURL: `https://sprint-mission-api.vercel.app`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer YOUR_TOKEN`;
  config.params = {
    ...config.params,
  }; 
  return config;
});

// instance.interceptors.response.use(
//   (response) => {
//     if (response.status < 200 || response.status >= 300) {
//       console.error(`HTTP Error! Status: ${response.status} - ${response.statusText}`);
//       return null;
//     }
//     return response.data;
//   },
//   (error) => {
//     console.error("Error Response:", error.response || error.message);
//     return Promise.reject(error); // 에러를 호출한 곳으로 다시 전달
//   }
// );

export default instance;

instance.interceptors.response.use(
  (response) => response, // Pass successful responses directly
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("404 Page Not Found", error.response);
        return Promise.reject(new Error("찾을 수 없음")); // Reject with a custom error message
      } else if (error.response.status === 400) {
        console.error("400 Bad Request", error.response);
        return Promise.reject(new Error("유효성 검사 오류")); // Reject with a custom error message
      }
    }
    return Promise.reject(error); // Reject other errors as-is
  }
);

