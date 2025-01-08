const $ = (selector) => document.querySelector(selector);
const emailInput = $(".email-input");
const passwordInput = $(".password-input");
const pleaseEmail = $(".pleaseEmail-message");
const noneEmail = $(".noneEmail-message");
const pleasePassword = $(".pleasePassword-message");
const strongPassword = $(".strongPassword-maessage");
const loginButton = $(".login-button");
const modal = $(".modal-overlay");
const modalCloseBtn = $(".modal-close-btn");
const vector = $(".vector");
const vectorOpen = $(".vector-open");

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
    }
  }

emailInput.onkeyup = function() {
  const value = emailInput.value.trim()

  // 이메일패턴
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 값이 없을경우
  if (!value.length) {
    validateInputValueFail("email");
  } else {
  //이메일 유효성 검사
   if (!emailPattern.test(value)) {
    validateInputValueFail("emailPattern");
   } else {
    validateInputValueFail("emailHide");
   }
  }
}

passwordInput.onkeyup = function() {
  let value = passwordInput.value.trim()
  const lengthFilter = value.length < 8

  // 값이 없을경우
  if (!value.length) {
    validateInputValueFail("password");
  } else {
    // 값이 8미만인 경우 메세지 출력
    if (lengthFilter) {
      validateInputValueFail("passwordFilter");
    } else {
      // 값이 8이상인 경우 메세지 숨김
      validateInputValueFail("passwordHide");
    }
  }
}

// 로그인 버튼 활성화 상태 업데이트
const updateLoginButtonState = () => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  const isPasswordValid = passwordInput.value.trim().length >= 8;

  if (isEmailValid && isPasswordValid) {
    loginButton.disabled = false;
    loginButton.classList.add("active");
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove("active");
  }
};

// 이메일과 비밀번호의 유효성 검사 후 버튼 상태 업데이트
emailInput.addEventListener("keyup", updateLoginButtonState);
passwordInput.addEventListener("keyup", updateLoginButtonState);

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

loginButton.onclick = function () {
  const inputEmail = emailInput.value.trim();
  const inputPassword = passwordInput.value.trim();
  
  // USER_DATA 배열에서 이메일/비밀번호 조합 찾기
  const foundUser = USER_DATA.find(user => user.email === inputEmail && user.password === inputPassword);

  if (foundUser) {
    window.location.href = "../items/items.html";
  } else {
    modalControl('open');
  }
}

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

vector.classList.remove('hide');

vector.addEventListener("click", () => togglePassword(true))
vectorOpen.addEventListener("click", () => togglePassword(false))

