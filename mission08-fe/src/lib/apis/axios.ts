import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

// CustomAxiosRequestConfig 정의: _retry 속성 추가
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// CustomErrorResponse 정의
interface CustomErrorResponse {
  message: string;
}

const BASE_URL_LOCAL = process.env.API_URL || "http://localhost:8000";

const axiosDefault = (baseURL: string): AxiosInstance => {
  const axiosInstance = createAxiosInstance(baseURL);
  requestInterceptor(axiosInstance);
  responseInterceptor(axiosInstance);
  return axiosInstance;
};

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  return axios.create({ baseURL, withCredentials: true });
};

// 요청 인터셉터
const requestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      // 쿼리 설정
      config.params = {
        ...(config.params || {}),
      };
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
};

// 비동기 리프레시 로직
const handleTokenRefresh = async (
  axiosInstance: AxiosInstance,
  error: AxiosError<CustomErrorResponse>
) => {
  try {
    await axiosInstance.post("/auth/refresh");
    // config가 undefined일 가능성을 배제하기 위해 타입 단언 사용
    const config = error.config as CustomAxiosRequestConfig;
    config._retry = true;
    return axiosInstance.request(config);
  } catch (refreshError) {
    return Promise.reject(refreshError);
  }
};

// 응답 인터셉터
const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<CustomErrorResponse>) => {
      if (error.response) {
        const config = error.config as CustomAxiosRequestConfig;
        if (error.response.status === 401 && !config._retry) {
          return handleTokenRefresh(axiosInstance, error);
        }
        throw error;
      } else if (error.request) {
        console.error("요청은 전송되었으나 응답을 받지 못했습니다.");
      } else {
        console.error(`요청 설정 중 에러 발생: ${error.message}`);
      }
      return Promise.reject(error);
    }
  );
};

export const apiLocal = axiosDefault(BASE_URL_LOCAL);
