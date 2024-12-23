import { USER_DATA } from "./userDataList.js";
import { validEmail, validPw } from "./verifyAuth.js";
import { showModal, closeModal, visibleOn } from "./controlUI.js";

const emailInput = document.querySelector("#email-input");
const pwInput = document.querySelector("#pw-input");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const loginBtn = document.querySelector("#auth-btn");

const visibleBtn = document.querySelectorAll(".visible-btn");

const modal = document.querySelector("#modal-bg");
const modalMsg = document.querySelector("#modal-msg");
const closeBtn = document.querySelector("#close-btn");

const msgList = {
    emailInputErrorMsg: "이메일을 입력해주세요.",
    emailValidErrorMsg: "잘못된 이메일 형식입니다.",
    pwInputErrorMsg: "비밀번호를 입력해주세요.",
    pwLengthErrorMsg: "비밀번호를 8자 이상 입력해주세요.",
    pwValidErrorMsg: "잘못된 비밀번호 형식입니다.",
    loginErrorModalMsg: "이메일 또는 비밀번호가 잘못 되었습니다."
}

loginBtn.disabled = true;

//버튼 활성화 함수
const toggleBtnState = () => {
    const isEmailValid = emailRegex.test(emailInput.value);
    const isPwValid = pwRegex.test(pwInput.value);

    //이메일, 비밀번호 모두 유효하면 활성화
    if (isEmailValid && isPwValid) {
        loginBtn.disabled = false;
        loginBtn.classList.add("activate");
    }
    //버튼 비활성화
    else {
        loginBtn.disabled = true;
        loginBtn.classList.remove("activate");
    }
}

//로그인 성공/실패
const validLogin = () => {
    const userData = USER_DATA.find((element) => element.email === emailInput.value);

    const isEmailNotFound = !userData;
    const isPwIncorrect = userData && userData.password !==pwInput.value;

    if (isEmailNotFound || isPwIncorrect) {
        showModal(msgList.loginErrorModalMsg, modal, modalMsg);
    }
    else {
        (window.location.href = "../items.html");
    }
}

emailInput.addEventListener("blur", (e) => validEmail(e, msgList, emailRegex, toggleBtnState));
pwInput.addEventListener("blur", (e) => validPw(e, msgList, pwRegex, toggleBtnState));
loginBtn.addEventListener("click", validLogin);
closeBtn.addEventListener("click", () => closeModal(modal));
visibleBtn.forEach((btn) => btn.addEventListener("click", visibleOn));