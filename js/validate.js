
//[ ] 이메일, 비밀번호, 비밀번호 확인 input에 필요한 유효성 검증 함수를 만들고 적용해 주세요.
//[ ] 이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
//[ ] 이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
//[ ] 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다
//[ ] 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.
//[ ] input 에 빈 값이 있거나 에러 메세지가 있으면 ‘로그인’ 버튼은 비활성화 됩니다.
//[ ] Input 에 유효한 값을 입력하면 ‘로그인' 버튼이 활성화 됩니다.
//[ ] 활성화된 ‘로그인’ 버튼을 누르면 “/items” 로 이동합니다


import { USER_DATA } from './userDatabase.js';

export const errorMessageList = {
  emailInputErrorMsg: "이메일을 입력해주세요.",
  emailValidErrorMsg: "잘못된 이메일 형식입니다.",
  pwInputErrorMsg: "비밀번호를 입력해주세요.",
  pwValidErrorMsg: "비밀번호를 8자 이상 15자 미만 영어 대소문자, 숫자, 특수문자를 조합하여 입력해주세요.",
  aliasInputErrorMsg: "닉네임을 입력해주세요.",
  confirmPwErrorMsg: "비밀번호가 일치하지 않습니다.",
  loginErrorMsg: "이메일 또는 비밀번호가 잘못 되었습니다."
};


// Function to validate the email format and length
// 이메일 유효성 검증 함수 
console.log("USER_DATA is: ", USER_DATA);//test
export const validateEmail = (email) => {
  console.log("Validating email:", email); //test
  const emailValCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+$/; ///^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //Check if email is empty 
  //입력값이 없을 경우
  if (!email) {
    return { valid: false, message: errorMessageList.emailInputErrorMsg };
  }
  // Check if email format is valid
  if (!emailValCheck.test(email)) {
    return { valid: false, message: errorMessageList.emailValidErrorMsg };
  }

  return { valid: true, message: "" }; // If all checks pass, return valid
};

// Function to validate the password format and length
// 비밀번호 유효성 검증 함수
export const validatePassword = (password) => {
  console.log("Validating password:", password); 
  const pwValCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  // Check if password is empty
  if (!password) {
    return { valid: false, message: errorMessageList.pwInputErrorMsg };
  }

  // Check if password length is between 8 and 15 characters
  if (password.length < 8 || password.length > 15 || !pwValCheck.test(password)) {

    return { valid: false, message: errorMessageList.pwValidErrorMsg };
  }

  // Check if password contains a letter, a special character, and a number
  if (!pwValCheck.test(password)) {

    return { valid: false, message: errorMessageList.pwValidErrorMsg };
  }

  return { valid: true, message: "" }; // If all checks pass, return valid
};


// Function to validate the nickname
export const validateAlias = (alias) => {
  if (!alias) {

    return { valid: false, message: errorMessageList.aliasInputErrorMsg };
  }
  return { valid: true, message: "" }; 
};

// Function to validate the password confirmation field
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {

    return { valid: false, message: errorMessageList.pwInputErrorMsg };
  }
  if (password !== confirmPassword) {

    return { valid: false, message: errorMessageList.confirmPwErrorMsg };
  }
  return { valid: true, message: "" }; // If passwords match, return valid
};


