import axios, { AxiosInstance } from "axios";

// 백엔드 미션에서 제작한 서버로 요청하는 instance
const instances: Record<string, AxiosInstance> = {};

const baseURL = "https://panda-prisma.onrender.com";

const AxiosDefault = (baseURL: string): AxiosInstance => {
  if (!instances[baseURL]) {
    const axiosInstance = createAxiosInstance(baseURL);
    // responseInterceptor(axiosInstance);
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
    withCredentials: true, // 쿠키를 주고받기 위해 필요한 설정
  });
  return axiosInstance;
};

// const responseInterceptor = (axiosInstance: AxiosInstance) => {
//   axiosInstance.interceptors.response.use(function (response) {
//     return response;
//   });
// };

export const myInstance = AxiosDefault(baseURL);
