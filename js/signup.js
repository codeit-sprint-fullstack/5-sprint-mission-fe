import { USER_DATA, email, pwd, removeWhitespace, updateInvalidMessage } from "/js/authUtils.js";

const signupBtn = document.getElementById("signup-btn");
const pwdBtns = document.querySelectorAll(".pwd-btn");

/**
 * 입력(이메일, 비밀번호) 유효성 검사
 */
email.input.addEventListener("input", removeWhitespace);
pwd.input.addEventListener("input", removeWhitespace);

//유효성 검사
const pwdConfirm = {
  input: document.getElementById("pwd-confirm"),
  error: document.getElementById("pwd-confirm-error"),
  validator: function (pwd) {
    return this.input.value === pwd
  },
  text: {
    unvalid: "비밀번호가 일치하지 않습니다.",
    empty: "비밀번호가 일치하지 않습니다.",
  }
}

const updateSignupButtonState = () => {
  const isEmailValid = email.validator();
  const isPwdValid = pwd.validator();
  const isPwdConfirmValid = pwdConfirm.validator(pwd.input.value);
  signupBtn.disabled = !(isEmailValid && isPwdValid && isPwdConfirmValid);
};

const updateSignupInput = (element, confirm) => {
  const value = element.input.value;

  updateInvalidMessage(value, element.error, element.text);
  if (!value || !element.validator(confirm)) element.input.classList.add("error");
  else element.input.classList.remove("error");

  updateSignupButtonState();
}

email.input.addEventListener("focusout", () => updateSignupInput(email));
pwd.input.addEventListener("focusout", () => updateSignupInput(pwd));
pwdConfirm.input.addEventListener("focusout", () => updateSignupInput(pwdConfirm, pwd.input.value));

/**
 * 회원가입 시도
 */
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-container button");

function existUser(email) {
  return USER_DATA.some(user => user.email === email);
}

signupBtn.addEventListener("click", () => {
  const emailValue = email.input.value;
  const pwdValue = pwd.input.value;
  const pwdConfirmValue = pwdConfirm.input.value;

  const validateSignup = !existUser(emailValue) && (pwdValue === pwdConfirmValue);

  if(validateSignup) {
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