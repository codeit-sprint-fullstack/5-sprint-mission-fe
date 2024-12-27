import { verifyParams, isEmpty } from "./checkError.js";
import { REQUIRED_FIELDS, INIT_GET_PARAMS } from "./constants.js";

export const fetchHandler = async (url, method, params = null) => {
  // 공통 fetch 핸들러 함수
  const category = new URL(url).pathname.split("/")[1]; // 첫 번째 경로 추출
  const fields = method === "GET" ? REQUIRED_FIELDS[method] : REQUIRED_FIELDS[method]?.[category] || null;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (params) {
    verifyParams(fields, params); // params 에러 처리
    console.log("verifyParams");
    if (method !== "GET" && method !== "DELETE") {
      options.body = JSON.stringify(params); // GET, DELETE 요청에는 body를 포함하지 않음
    }
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn("리소스를 찾을 수 없습니다. 이미 삭제되었을 수 있습니다.");
        return; // 404 처리
      }
      throw new Error(`HTTP error! status: ${response.status}`); // HTTP 에러 처리
    }

    console.log(`\n${category}에 대한 ${method} 처리가 완료되었습니다`);

    if (method === "DELETE") return;

    const data = await response.json();
    return data; // delete 메서드를 제외하고 data 반환
  } catch (error) {
    console.error(error);
  }
};

export const initParams = (key, params) => {
  const value = params[key];
  const init = isEmpty(value) ? INIT_GET_PARAMS[key] : value; // GET메서드 params 속성 init 값 설정
  params[key] = init; // params에도 초기값 설정
};

export const getList = (baseUrl, params) => {
  const url = new URL(baseUrl);
  for (const key in params) {
    initParams(key, params);
    url.searchParams.append(key, params[key]);
  }
  console.log(url.toString());
  return fetchHandler(url, "GET", params);
};

export const getItem = (baseUrl, id) => {
  const url = baseUrl + `/${id}`;
  return fetchHandler(url, "GET");
};

export const createItem = (baseUrl, params) => {
  const url = baseUrl;
  return fetchHandler(url, "POST", params);
};

export const patchItem = (baseUrl, id, params) => {
  const url = baseUrl + `/${id}`;
  return fetchHandler(url, "PATCH", params);
};

export const deleteItem = (baseUrl, id) => {
  const url = baseUrl + `/${id}`;
  fetchHandler(url, "DELETE");
};
