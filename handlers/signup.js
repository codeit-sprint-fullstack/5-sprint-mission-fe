import { email, pwd, validateInput, removeWhitespace } from "/js/authUtils.js";
import { createNewUser } from "/js/localstorage.js";

const signupBtn = document.getElementById("signup-btn");
const pwdBtns = document.querySelectorAll(".pwd-btn");

/**
 * 입력(이메일, 비밀번호) 유효성 검사
 */
email.input.addEventListener("input", removeWhitespace);
pwd.input.addEventListener("input", removeWhitespace);

const pwdConfirm = {
  input: document.getElementById("pwd-confirm"),
  error: document.getElementById("pwd-confirm-error"),
  validator: function (pwd) {
    return this.input.value === pwd
  },
  text: {
    invalid: "비밀번호가 일치하지 않습니다.",
    empty: "비밀번호가 일치하지 않습니다.",
  }
}

const updateSignupButtonState = () => {
  const isEmailValid = email.validator();
  const isPwdValid = pwd.validator();
  const isPwdConfirmValid = pwdConfirm.validator(pwd.input.value);
  signupBtn.disabled = !(isEmailValid && isPwdValid && isPwdConfirmValid);
};

email.input.addEventListener("focusout", () => validateInput(email, updateSignupButtonState));
pwd.input.addEventListener("focusout", () => validateInput(pwd, updateSignupButtonState));
pwdConfirm.input.addEventListener("focusout", () => validateInput(pwdConfirm, updateSignupButtonState, pwd.input.value));

/**
 * 회원가입 시도
 */
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-container button");

signupBtn.addEventListener("click", () => {
  const emailValue = email.input.value;
  const pwdValue = pwd.input.value;
  const pwdConfirmValue = pwdConfirm.input.value;

  const validateSignup = (pwdValue === pwdConfirmValue) && createNewUser(emailValue, pwdValue);

  if (validateSignup) {
    window.location.href = "/login";
  } else modal.style.display = "flex";
});

modalBtn.addEventListener("click", () => modal.style.display = "none");

/**
 * 비밀번호 show / hide
 */
pwdBtns.forEach((item) => item.addEventListener("click", (e) => {
  const { target } = e;
  const isHidden = target.dataset.state === "hide";

  target.dataset.state = isHidden ? "show" : "hide";
  target.className = `fas ${isHidden ? 'fa-eye' : 'fa-eye-slash'}`;
  target.parentElement.previousElementSibling.type = isHidden ? "text" : "password";
}));