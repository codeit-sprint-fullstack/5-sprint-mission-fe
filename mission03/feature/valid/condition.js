// input값이 비어 있는가?
export const isEmpty = (input) => input.value.trim() === "";

// 유효한 이메일 구조인가?
export const isValidEmail = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 검증용 정규 표현식
  const value = input.value.trim(); // 입력값 공백 제거
  return emailRegex.test(value);
};

// 비밀번호 길이가 8자리 이상인가?
export const isValidPassword = (input) => input.value.trim().length >= 8;

// 비민번호 확인이 비밀번호와 동일한가?
export const isMatchPassword = (input) => {
  // 매개변수 input === passwordCheckFrom
  const form = input.closest("form"); // input이 속한 form 요소 찾기
  const passwordForm = form.querySelector("#password"); // form 안의 #password 필드 찾기
  return input.value.trim() === passwordForm.value.trim();
};

export const isAllValid = (inputs) => {
  // 모든 input 요소가 유효한지 체크하는 함수
  for (const input of inputs) {
    const field = input.closest(".field"); // 가까운 field 요소 가져오기
    const errorMessage = field.querySelector(".error-message"); // field의 에러 메시지 가져오기

    if (isEmpty(input) || errorMessage) return false; // 비어있거나 오류 메시지가 있으면 유효하지 않음
  }

  return true; // 모든 요소에 값이 있고 오류 메시지가 없으면 유효함
};
