import { USER_DATA } from './userDatabase.js';
import { validateEmail, validatePassword, validateAlias, validateConfirmPassword, errorMessageList } from "./validate.js"
export { inputEmail, inputPW, inputAlias, inputConfirmPW };

const inputEmail = document.querySelector("#email");
const inputPW = document.querySelector("#password");
const inputAlias = document.querySelector("#alias") || null;;
const inputConfirmPW = document.querySelector("#confirmPassword");
export const confirmButton = document.querySelector(".confirmbutton") || null;;

document.addEventListener("DOMContentLoaded", () => {
  const inputs = [inputEmail, inputPW, inputAlias, inputConfirmPW];
  const validators = [
    (value) => validateEmail(value, confirmButton),
    (value) => validatePassword(value, confirmButton),
    (value) => validateAlias(value, confirmButton),
    (value, confirmValue) => validateConfirmPassword(inputPW.value, value, confirmButton)
  ];

  // 공통 에러 메시지 처리 함수
  const displayValidationError = (inputField, errorField, validationResult) => {
    if (!validationResult.valid) {
      errorField.textContent = validationResult.message;
      errorField.classList.add("error-message");
      inputField.style.border = "1px solid red";
    } else {
      errorField.textContent = "";
      errorField.classList.remove("error-message");
      inputField.style.border = "";  // Reset the border
    }
  };
  
  // 이메일, 비밀번호, 닉네임, 비밀번호 확인 유효성 검사 후 에러 메시지 처리
  const emailValidError = document.createElement('p');
  emailValidError.classList.add('error-message');

  const pwValidError = document.createElement('p');
  pwValidError.classList.add('error-message');

  const confirmPwError = document.createElement('p');
  confirmPwError.classList.add('error-message');

  // alias input 칸이 있을 때만 이벤트 리스너 설정
  if (inputAlias) {
    const aliasValidError = document.createElement("p");
    aliasValidError.id = "alias-error";
    console.log(inputAlias);
    inputAlias.parentElement.appendChild(aliasValidError);

    // 닉네임 input에서 focus out 할 때 이벤트리스너 설정
    inputAlias.addEventListener("focusout", () => {
      console.log("Focus out triggered for alias"); //test

      const alias = inputAlias.value;

  // Check if alias is empty
      const validationResult = validateAlias(alias);
      displayValidationError(inputAlias, aliasValidError, validationResult);
    });
  }

  // 이메일 유효성 검증 에러메시지 태그 추가
  emailValidError.id = "email-error";
  inputEmail.parentElement.appendChild(emailValidError);

  // 비밀번호 유효성 검증 에러메시지 태그 추가
  pwValidError.id = "password-error";
  inputPW.parentElement.parentElement.appendChild(pwValidError);

  // 이메일 input에서 focus out 할 때 이벤트리스너 설정
  inputEmail.addEventListener("focusout", () => {
    const email = inputEmail.value;
    const validationResult = validateEmail(email);
    displayValidationError(inputEmail, emailValidError, validationResult);
  });

  // 비밀번호 input에서 focus out 할 때 이벤트리스너 설정
  inputPW.addEventListener("focusout", () => {
    const password = inputPW.value;
    const validationResult = validatePassword(password);
    displayValidationError(inputPW, pwValidError, validationResult);
  });

  // 비밀번호 확인 유효성 검증 에러메시지 태그 추가
  // inputConfirmPW가 존재하는 경우에만 처리
  if (inputConfirmPW) {
    inputConfirmPW.parentElement.parentElement.appendChild(confirmPwError);

    // 비밀번호 확인 유효성 검사
    inputConfirmPW.addEventListener('focusout', () => {
      const confirmPassword = inputConfirmPW.value;
      const password = inputPW.value;
      console.log("focus out triggered for confirm PW");

      const validationResult =
        !confirmPassword
          ? { valid: false, message: '비밀번호를 확인해주세요.' }
          : confirmPassword !== password
          ? { valid: false, message: '비밀번호가 일치하지 않습니다.' }
          : { valid: true, message: '' };

      displayValidationError(inputConfirmPW, confirmPwError, validationResult);
    });
  }
});
