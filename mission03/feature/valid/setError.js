// 에러 메시지 추가
export const addErrorMessage = (input, message) => {
  const field = input.closest(".field"); // form의 가장 가까운 field
  const inputContainer = input.parentElement; // input에 해당하는 input-container
  const errorMessage = field.querySelector(".error-message"); // .error-message 요소
  const pTag = document.createElement("p"); // p 태그 추가

  // 에러 메시지 있고, 기존 에러 메시지와 매개변수 에러메시지가 다를 경우, 메시지 바꾸기
  if (errorMessage) {
    if (errorMessage.textContent !== message) {
      errorMessage.textContent = message; // 메시지 교체
    }
    return; // 기존 메시지가 동일하거나 교체 후 종료
  }

  // 에러 메시지 없을 때 작업
  inputContainer.classList.add("invalid"); // input-container에 invalid CSS style 추가
  pTag.classList.add("error-message"); // error-message CSS style 추가
  pTag.textContent = message; // 에러 메시지 입력
  field.append(pTag); // 에러 메시지 필드에 추가
};

// 에러 메시지 삭제
export const removeErrorMessage = (input) => {
  const field = input.closest(".field"); // form의 가장 가까운 field
  const inputContainer = input.parentElement; // input에 해당하는 input-container
  const errorMessage = field.querySelector(".error-message"); // .error-message 요소

  if (!errorMessage) return; // 에러 메시지가 없으면 종료

  errorMessage.remove(); // .error-message 요소 삭제
  inputContainer.classList.remove("invalid"); // input-container에 invalid CSS style 삭제
};

// input.id에 따른 에러메시지
const errorMessages = {
  email: "이메일을 입력해주세요.",
  nickname: "닉네임을 입력해주세요.",
  password: "비밀번호를 입력해주세요.",
  "password-check": "비밀번호를 확인해주세요.",
};
// 에러 메시지 반환함수
export const getErrorMessage = (id) =>
  errorMessages[id] || "알 수 없는 에러입니다.";
