import { USER_DATA, email, pwd, removeWhitespace, updateInvalidMessage } from "/js/authUtils.js";

const loginBtn = document.getElementById("login-btn");
const pwdBtn = document.getElementById("pwd-btn");

/**
 * 입력(이메일, 비밀번호) 유효성 검사
 */
email.input.addEventListener("input", removeWhitespace);
pwd.input.addEventListener("input", removeWhitespace);

//유효성 검사
const updateLoginButtonState = () => {
  const isEmailValid = email.validator();
  const isPwdValid = pwd.validator();
  loginBtn.disabled = !(isEmailValid && isPwdValid);
};

const updateLoginInput = (element) => {
  const value = element.input.value;

  updateInvalidMessage(value, element.error, element.text);
  if (!value || !element.validator()) element.input.classList.add("error");
  else element.input.classList.remove("error");

  updateLoginButtonState();
}

email.input.addEventListener("focusout", () => updateLoginInput(email));
pwd.input.addEventListener("focusout", () => updateLoginInput(pwd));

/**
 * 로그인 시도
 */
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-container button");

function validateUser(email, pwd) {
  return USER_DATA.some(user => user.email === email && user.password === pwd);
}

loginBtn.addEventListener("click", () => {
  const emailValue = email.input.value;
  const pwdValue = pwd.input.value;

  if(validateUser(emailValue, pwdValue)) {
    window.location.href = "/items";
  } else modal.style.display = "flex";
});

modalBtn.addEventListener("click", () => modal.style.display = "none");

/**
 * 비밀번호 show / hide
 */
pwdBtn.addEventListener("click", (e) => {
  const { target } = e;
  const isHidden = target.dataset.state === "hide";

  target.dataset.state = isHidden ? "show" : "hide";
  target.className = `fas ${isHidden ? 'fa-eye' : 'fa-eye-slash'}`;
  target.parentElement.previousElementSibling.type = isHidden ? "text" : "password";
});
