// import axios from "axios";
const instances = {};

/** 인스턴스 생성
 * @param               instanceName
 * @description     인스턴스명 (String)
 * @param               baseURL
 * @description     기본 주소값 (String)
 */
export async function createAxiosInstance(baseURL) {
  if (!instances[baseURL]) {
    const axiosInstance = axiosDefault(baseURL);
    requestInterceptor(axiosInstance);
    responseInterceptor(axiosInstance);
    instances[baseURL] = axiosInstance;
  }
  return instances[baseURL];
}

function axiosDefault(baseURL) {
  return axios.create({
    baseURL,
    headers: { "Content-Type": "application/JSON" },
  });
}

function requestInterceptor(instance) {
  instance.interceptors.request.use(
    (config) => {
      const key = localStorage.getItem("testToken");
      if (key) {
        config.headers.tokenAuth = key;
        console.log("토큰을 서버에 전송했습니다.");
      }
      return config;
    },
    (error) => {
      console.log("리퀘스트 에러 발생!");
      return error;
    }
  );
}

function responseInterceptor(instance) {
  instance.interceptors.response.use(
    (response) => {
      console.log("response 정상적으로 확인...");
      return response;
    },
    (error) => {
      console.log("response 에서 에러가 발견되었습니다!");
      return Promise.reject(error);
    }
  );
}
