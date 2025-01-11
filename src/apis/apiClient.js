import axios from "axios";

const API_BASE_URL = "https://panda-market-api.vercel.app"; // 기본 API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 요청 시간 제한 (5초)
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (API 요청 전에 실행됨)
apiClient.interceptors.request.use(
  (config) => {
    console.log("🚀 API 요청:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ 요청 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (API 응답 후 실행됨)
apiClient.interceptors.response.use(
  (response) => response.data, // API 응답 데이터를 직접 반환
  (error) => {
    console.error("❌ 응답 오류:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * ✅ 공통 API 요청 함수
 * @param {string} method - 요청 방식 ('get', 'post', 'put', 'patch', 'delete')
 * @param {string} url - 요청할 API 경로
 * @param {object} [data] - 요청 데이터 (POST, PUT, PATCH일 경우)
 * @param {object} [params] - 쿼리 파라미터 (GET일 경우)
 * @returns {Promise<any>} - API 응답 데이터
 */
const request = async (method, url, data = null, params = null) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params,
    });
    return response;
  } catch (error) {
    console.error(`❌ API ${method.toUpperCase()} 요청 실패 (${url}):`, error);
    throw error;
  }
};

// API 요청을 수행할 메서드 모음
const api = {
  get: (url, params) => request("get", url, null, params),
  post: (url, data) => request("post", url, data),
  put: (url, data) => request("put", url, data),
  patch: (url, data) => request("patch", url, data),
  delete: (url) => request("delete", url),
};

export default api;