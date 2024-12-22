import { email, pwd, validateInput, removeWhitespace } from "/js/authUtils.js";
import { existEmailAndPwd } from "/js/localstorage.js";

const loginBtn = document.getElementById("login-btn");
const pwdBtn = document.getElementById("pwd-btn");

/**
 * 입력(이메일, 비밀번호) 유효성 검사
 */
email.input.addEventListener("input", removeWhitespace);
pwd.input.addEventListener("input", removeWhitespace);

const updateLoginButtonState = () => {
  const isEmailValid = email.validator();
  const isPwdValid = pwd.validator();
  loginBtn.disabled = !(isEmailValid && isPwdValid);
};

email.input.addEventListener("focusout", () => validateInput(email, updateLoginButtonState));
pwd.input.addEventListener("focusout", () => validateInput(pwd, updateLoginButtonState));

/**
 * 로그인 시도
 */
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-container button");

loginBtn.addEventListener("click", () => {
  const emailValue = email.input.value;
  const pwdValue = pwd.input.value;

  if (existEmailAndPwd(emailValue, pwdValue)) {
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
