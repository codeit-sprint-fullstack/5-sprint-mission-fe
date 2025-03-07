import axios, { AxiosInstance } from "axios";

//유저 기능 요청을 위한 axios 인스턴스 생성
const instances: Record<string, AxiosInstance> = {};

const baseURL = "https://panda-market-api.vercel.app";

export const localStorageKeys = {
  accessToken: "acct",
  refreshToken: "reft",
};

const AxiosDefault = (baseURL: string): AxiosInstance => {
  if (!instances[baseURL]) {
    const axiosInstance = createAxiosInstance(baseURL);
    requestInterceptor(axiosInstance);
    responseInterceptor(axiosInstance);
    instances[baseURL] = axiosInstance;
  }
  return instances[baseURL];
};

const createAxiosInstance = (baseURL: string) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return axiosInstance;
};

const requestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.getItem(localStorageKeys.accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(function (response) {
    return response;
  });
};

export const authInstance = AxiosDefault(baseURL);
