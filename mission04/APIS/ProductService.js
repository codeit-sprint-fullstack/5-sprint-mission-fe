const baseUrl = `https://sprint-mission-api.vercel.app/products`;

const fetchHandler = async (url, method, params = null) => {
  // 공통 fetch 핸들러 함수
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // GET, DELETE 요청에는 body를 포함하지 않음
  if (params && method !== "GET" && method !== "DELETE") {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // HTTP 에러 처리
  const data = await response.json();
  return data;
};

export const getProductList = (params) => {
  // 상품 목록 조회
  const url = new URL(baseUrl);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  return fetchHandler(url, "GET");
};

export const getProduct = async (id) => {
  // 상품 상세 조회
  const url = baseUrl + `/${id}`;
  return fetchHandler(url, "GET");
};

export const createProduct = async (params) => {
  // 상품 등록
  const url = baseUrl;
  return fetchHandler(url, "POST", params);
};

export const patchProduct = async (id, params) => {
  // 게시글 수정
  const url = baseUrl + `/${id}`;
  return fetchHandler(url, "PATCH", params);
};

export const deleteProduct = (id) => {
  // 게시글 삭제
  const url = baseUrl + `/${id}`;
  return fetchHandler(url, "DELETE");
};
