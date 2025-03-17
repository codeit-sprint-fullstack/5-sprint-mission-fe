import api from "./api";

/* 기능: 로그인
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

/* 기능: 회원가입
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

/* 기능: 사용자 정보 조회
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

/* 기능: 로그아웃
 * 모든 저장소(localStorage, sessionStorage, cookie)에서 토큰 제거
 */
export const logout = () => {
  /* 로직: 토큰 제거 */
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// signOut은 logout의 별칭
export const signOut = logout;

/* 기능: 토큰 저장
 * @param {string} token - JWT 토큰
 */
export const saveToken = (token) => {
  localStorage.setItem("accessToken", token);
};

/* 로직: JWT 토큰 디코딩
 * @param {string} token - JWT 토큰
 * @returns {Object|null} 디코딩된 토큰 페이로드 또는 null
 */
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("토큰 디코딩 에러:", error);
    return null;
  }
};

/* 로직: 토큰 만료 확인
 * @param {string} token - JWT 토큰
 * @returns {boolean} 토큰 만료 여부
 */
const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("토큰 만료 확인 에러:", error);
    return true;
  }
};

/* 기능: 토큰 유효성 검사
 * @returns {boolean} 유효한 토큰 존재 여부
 */
export const hasToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;
    if (isTokenExpired(token)) {
      logout();
      return false;
    }
    return true;
  }
  return false;
};
