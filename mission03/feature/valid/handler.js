// import
import {
  addErrorMessage,
  removeErrorMessage,
  getErrorMessage,
} from "./setError.js";
import {
  isEmpty,
  isValidEmail,
  isValidPassword,
  isMatchPassword,
} from "./condition.js";

// 빈값 확인 핸들러
const emptyHandler = (input) => {
  if (isEmpty(input)) {
    const message = getErrorMessage(input.id);
    addErrorMessage(input, message);
    return true; // 비어 있으면 추가 검증 중단을 위해 true 반환
  }
  return false;
};

// 닉네임 핸들러
const nicknameHandler = (input) => {
  if (emptyHandler(input)) return; // isEmpty인 경우 중단
  removeErrorMessage(input); // 비어있지 않은 경우 에러 메시지 삭제
};

// 이메일 핸들러
const validEmailHandler = (input) => {
  if (emptyHandler(input)) return; // isEmpty인 경우 중단

  // 비어있지 않은 경우 유효한 이메일인지 체크
  if (!isValidEmail(input)) {
    addErrorMessage(input, "잘못된 이메일 형식입니다.");
  } else {
    removeErrorMessage(input);
  }
};

// 비밀번호 핸들러
const validPasswordHandler = (input) => {
  if (emptyHandler(input)) return; // isEmpty인 경우 중단

  // 비어있지 않은 경우 유효한 이메일인지 체크
  if (!isValidPassword(input)) {
    addErrorMessage(input, "비밀번호를 8자 이상 입력해주세요.");
  } else {
    removeErrorMessage(input);
  }
};

// 비밀번호 확인 핸들러
const validPasswordCheckHandler = (input) => {
  if (emptyHandler(input)) return; // isEmpty인 경우 중단

  // 비어있지 않은 경우 유효한 이메일인지 체크
  if (!isMatchPassword(input)) {
    addErrorMessage(input, "비밀번호가 일치하지 않습니다.");
  } else {
    removeErrorMessage(input);
  }
};

// input.id에 따른 handler
const handler = {
  email: validEmailHandler,
  nickname: nicknameHandler,
  password: validPasswordHandler,
  "password-check": validPasswordCheckHandler,
};

// id에 따라 handler 반환
export const validHandler = (id) => handler[id] || "알 수 없는 핸들러입니다.";
