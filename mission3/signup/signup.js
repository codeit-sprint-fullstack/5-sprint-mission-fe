const $ = (selector) => document.querySelector(selector);
const emailInput = $(".email-input");
const passwordInput = $(".password-input");
const pleaseEmail = $(".pleaseEmail-message");
const noneEmail = $(".noneEmail-message");
const pleasePassword = $(".pleasePassword-message");
const strongPassword = $(".strongPassword-maessage");
const nicknameInput = $(".nickname-input");
const strongNickname = $(".strongNickname-maessage");
const confirmPasswordInput = $(".confirm-password-input");
const confirmPasswordError = $(".confirm-password-message");
const modal = $(".modal-overlay");
const modalCloseBtn = $(".modal-close-btn");
const vector = $(".vector");
const vectorOpen = $(".vector-open");
const confirmVector = $(".confirm-vector")
const confirmVectorOpen = $(".confirm-vector-open")
const signupButton = $(".signup-button")

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]

const setOutline = (input, color) => {
  input.style.outline = `1px solid ${color}`;
}
const validateInputValueFail = (type) => {
    if (type === "email") {
      pleaseEmail.classList.remove('hide');
      noneEmail.classList.add('hide');
      setOutline(emailInput,"#F74747");
    } else if (type === "password") {
      pleasePassword.classList.remove('hide');
      strongPassword.classList.add('hide');
      setOutline(passwordInput, "#F74747");
    } else if (type === "emailPattern") {
      pleaseEmail.classList.add('hide');
      noneEmail.classList.remove('hide');
      setOutline(emailInput, "#F74747");
    } else if (type === "passwordFilter") {
      pleasePassword.classList.add('hide');
      strongPassword.classList.remove('hide');
      setOutline(passwordInput, "#F74747");
    } else if (type === "emailHide") {
      pleaseEmail.classList.add('hide');
      noneEmail.classList.add('hide');
      setOutline(emailInput, "#3692FF");
    } else if (type === "passwordHide") {
      pleasePassword.classList.add('hide');
      strongPassword.classList.add('hide');
      setOutline(passwordInput, "#3692FF");
    } else if (type === "nicknameFail") {
      strongNickname.classList.remove('hide');
      strongNickname.classList.remove('hide');
      setOutline(nicknameInput, "#F74747");
    } else if (type === "nicknameSuccess") {
      strongNickname.classList.add('hide');
      setOutline(nicknameInput, "#3692FF");
    } else if (type === "confirmPasswordFail") {
      confirmPasswordError.classList.remove('hide');
      setOutline(confirmPasswordInput, "#F74747");
    } else if (type === "confirmPasswordSuccess") {
      confirmPasswordError.classList.add('hide');
      setOutline(confirmPasswordInput, "#3692FF");
    }
  }

emailInput.onkeyup = function() {
  const value = emailInput.value.trim()

  // 이메일패턴
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 값이 없을경우
  if (!value.length) {
    validateInputValueFail("email")
  } else {
  //이메일 유효성 검사
   if (!emailPattern.test(value)) {
    validateInputValueFail("emailPattern")
   } else {
    // 이메일 형식이 맞을 경우: 모든 메세지 숨김
    validateInputValueFail("emailHide")
   }
  }
}

nicknameInput.onkeyup = function () {
  let value = nicknameInput.value.trim()
  // 값이 2글자 미만인경우
  if (value.length < 2) {
    validateInputValueFail("nicknameFail")
  } else {
    validateInputValueFail("nicknameSuccess")
  }
}

passwordInput.onkeyup = function() {
  let value = passwordInput.value.trim()
  // 값이 없을경우
  if (!value.length) {
    validateInputValueFail("password")
  } else {
    // 값이 8글자 미만인 경우: 메세지 출력
    if (value.length < 8) {
      validateInputValueFail("passwordFilter")
    } else {
      // 값이 8글자 이상인 경우: 모든 메세지 숨김
      validateInputValueFail("passwordHide")
    }
  }
}

passwordInput.addEventListener('keyup', confirmPasswordInput)
confirmPasswordInput.onkeyup = function () {
  function isMatch (password1, Password2) {
    return password1 === Password2
  }
    //비밀번호와 불일치 할 경우: 메세지 출력
    if (!isMatch(passwordInput.value, confirmPasswordInput.value)) {
      validateInputValueFail("confirmPasswordFail")
    } else {
      // 비밀번호와 일치 할 경우: 메세지 숨김
      validateInputValueFail("confirmPasswordSuccess")
    }
}

vector.classList.remove('hide');

// 비밀번호 보이기/숨기기 
const togglePassword = (show) => {
  if (show) {
    passwordInput.type = "text";
    vector.classList.add("hide");
    vectorOpen.classList.remove("hide");
  } else {
    passwordInput.type = "password";
    vector.classList.remove("hide");
    vectorOpen.classList.add("hide");
  }
};

// 비밀번호 확인 보이기/숨기기
const toggleConfirmPassword = (show) => {
  if (show) {
    confirmPasswordInput.type = "text";
    confirmVector.classList.add("hide");
    confirmVectorOpen.classList.remove("hide");
  } else {
    confirmPasswordInput.type = "password";
    confirmVector.classList.remove("hide");
    confirmVectorOpen.classList.add("hide");
  }
}

vector.addEventListener("click", () => togglePassword(true))
vectorOpen.addEventListener("click", () => togglePassword(false))
confirmVector.addEventListener("click", () => toggleConfirmPassword(true))
confirmVectorOpen.addEventListener("click", () => toggleConfirmPassword(false))

// 회원가입 버튼 활성화 상태 업데이트
const updatesignupButtonState = () => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  const isPasswordValid = passwordInput.value.trim().length >= 8;
  const isNicknameValid = nicknameInput.value.trim().length >= 2;
  const isConfirmPasswordValid = passwordInput.value === confirmPasswordInput.value;

  if (isEmailValid && isPasswordValid && isNicknameValid && isConfirmPasswordValid) {
    signupButton.disabled = false;
    signupButton.classList.add("active");
  } else {
    signupButton.disabled = true;
    signupButton.classList.remove("active");
  }
};

// 이메일과 비밀번호의 유효성 검사 후 버튼 상태 업데이트
emailInput.addEventListener("keyup", updatesignupButtonState);
passwordInput.addEventListener("keyup", updatesignupButtonState);
nicknameInput.addEventListener("keyup", updatesignupButtonState);
confirmPasswordInput.addEventListener("keyup", updatesignupButtonState);

// 모달 제어
const modalControl = (modalType) => {
  if (modalType == 'open') {
    modal.classList.remove('hide');
  } else if (modalType == 'close') {
    modal.classList.add('hide');
  }
};

modalCloseBtn.addEventListener ('click', () => {
  modalControl('close');
})

signupButton.onclick = function () {
  const inputEmail = emailInput.value.trim();

  if (!inputEmail) {
    validateInputValueFail("email")
    return;
  } else {
    emailInput.style.outline = "";
  }
  
  // USER_DATA 배열에서 이메일 찾기
  const foundUser = USER_DATA.find(user => user.email !== inputEmail);

  if (foundUser) {
    modalControl('open');
  } else {
    window.location.href = "../login/index.html";
  }
}