import api from "./api";

/**
 * 로그인 API
 * @param {Object} credentials - 로그인 정보 (이메일, 비밀번호)
 * @returns {Promise<Object>} 로그인 결과 및 토큰
 */
export const signIn = async (credentials) => {
  try {
    const response = await api.post("/auth/signIn", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 회원가입 API
 * @param {Object} userData - 회원가입 정보
 * @returns {Promise<Object>} 회원가입 결과 및 토큰
 */
export const signUp = async (userData) => {
  try {
    const response = await api.post("/auth/signUp", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 사용자 정보 조회 API
 * @returns {Promise<Object>} 사용자 정보
 */
export const getUserInfo = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 오류:", error);
    throw error;
  }
};

/**
 * 로그아웃 함수
 */
export const logout = () => {
  console.log(
    "로그아웃 시작: 토큰 삭제 전",
    localStorage.getItem("accessToken")
  );

  // 로컬 스토리지에서 토큰 제거
  localStorage.removeItem("accessToken");

  // 세션 스토리지에서도 제거
  sessionStorage.removeItem("accessToken");

  // 쿠키에서도 제거 (혹시 쿠키에 저장된 경우를 대비)
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // 삭제 후 확인
  console.log(
    "로그아웃 완료: 토큰 삭제 후",
    localStorage.getItem("accessToken")
  );

  // 추가 확인: 토큰이 여전히 존재하는지 확인
  if (localStorage.getItem("accessToken")) {
    console.error("로그아웃 실패: 토큰이 여전히 존재함");
  } else {
    console.log("로그아웃 성공: 토큰이 완전히 제거됨");
  }
};

// signOut은 logout과 같은 함수이므로 alias로 제공
export const signOut = logout;

/**
 * 토큰 저장
 * @param {string} token - JWT 토큰
 */
export const saveToken = (token) => {
  localStorage.setItem("accessToken", token);
  console.log("토큰 저장됨:", token);
};

/**
 * JWT 토큰 디코딩 헬퍼 함수
 * @param {string} token - JWT 토큰
 * @returns {Object|null} 디코딩된 토큰 페이로드 또는 null
 */
const decodeToken = (token) => {
  try {
    // JWT는 header.payload.signature 형태로 구성됨
    // payload 부분을 추출하여 디코딩
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // atob는 Base64 디코딩 함수
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("토큰 디코딩 에러:", error);
    return null;
  }
};

/**
 * 토큰의 만료 여부 확인
 * @param {string} token - JWT 토큰
 * @returns {boolean} 토큰 만료 여부
 */
const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded) return true;

    // exp는 토큰 만료 시간 (초 단위)
    const currentTime = Date.now() / 1000; // 현재 시간을 초 단위로 변환

    console.log(
      "토큰 만료 시간:",
      new Date(decoded.exp * 1000).toLocaleString()
    );
    console.log("현재 시간:", new Date(currentTime * 1000).toLocaleString());
    console.log("만료 여부:", decoded.exp < currentTime);

    return decoded.exp < currentTime; // 만료 시간이 현재 시간보다 이전이면 만료된 것
  } catch (error) {
    console.error("토큰 만료 확인 에러:", error);
    return true; // 에러 발생시 만료된 것으로 간주
  }
};

/**
 * 토큰 확인 (존재 + 유효성)
 * @returns {boolean} 유효한 토큰 존재 여부
 */
export const hasToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    // 토큰이 없으면 false 반환
    if (!token) {
      console.log("토큰 없음");
      return false;
    }

    // 토큰이 만료되었는지 확인
    if (isTokenExpired(token)) {
      console.log("토큰 만료됨, 자동 로그아웃 처리");
      // 만료된 토큰은 자동으로 제거 (로그아웃 처리)
      logout();
      return false;
    }

    console.log("유효한 토큰 존재");
    return true;
  }
  return false;
};
