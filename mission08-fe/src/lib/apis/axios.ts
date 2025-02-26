import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL_LOCAL = process.env.API_URL || "http://localhost:8000";

const axiosDefault = (baseURL: string) => {
  const axiosInstance = createAxiosInstance(baseURL);
  requestInterceptor(axiosInstance);
  responseInterceptor(axiosInstance);

  return axiosInstance;
};

const createAxiosInstance = (baseURL: string) => {
  return axios.create({ baseURL, withCredentials: true });
};

// 요청 인터셉터
const requestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 쿼리 설정
      config.params = {
        ...(config.params || {}), // params가 undefined일 경우 빈 객체로 처리
      };
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error); // 요청 실패 시 에러를 전달
    }
  );
};

// 응답 인터셉터
interface CustomErrorResponse {
  message: string;
}
const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response, // 성공 응답 처리
    (error: AxiosError<CustomErrorResponse>) => {
      // 에러 로깅
      if (error.response) {
        // const customMessage = error.response.data?.message;
        // // error.customMessage = customMessage; // 추가할려면 ts 어떻게 해야하는가?
        // console.error(`에러 응답: ${error.response.status} - ${customMessage}`);
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

// baseUrl로 axiosInstance 생성
export const apiLocal = axiosDefault(BASE_URL_LOCAL);
