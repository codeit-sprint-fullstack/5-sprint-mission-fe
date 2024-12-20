import { USER_DATA } from "../../data/USER_DATA";

// 나중에 다시 보기 일단 코드잇 문제 풀러가기

/**
 * 로컬 스토리지 get / set >> USER_DATA
 * - 로그인 시 :
 *   - get(email ,pwd)
 * - 회원가입 시 :
 *   - get(email)
 *   - set(email, pwd)
 */
// localStorage.clear();
const STORAGE_USER_DATA = "pandamarket";

if (!localStorage.getItem(STORAGE_USER_DATA)) {
  localStorage.setItem(STORAGE_USER_DATA, JSON.stringify(USER_DATA));
}

function getUserData() {
  return JSON.parse(localStorage.getItem(STORAGE_USER_DATA));
}

function existEmail(email) {
  const userData = getUserData();
  return userData.some((user) => user.email === email);
}

export function existEmailAndPwd(email, pwd) {
  const userData = getUserData();
  return userData.some((user) => user.email === email && user.password === pwd);
}

export function createNewUser(email, password) {
  if (existEmail(email)) return false;

  const userData = getUserData();
  userData.push({ email, password });
  localStorage.setItem(STORAGE_USER_DATA, JSON.stringify(userData));
  return true;
}
