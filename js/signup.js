import { USER_DATA } from "./userDataList.js";
import { validEmail, validPw, validNickname, confirmPw } from "./verifyAuth.js";
import { showModal, closeModal, visibleOn } from "./controlUI.js";

const emailInput = document.querySelector("#email-input");
const nicknameInput = document.querySelector("#nickname-input");
const pwInput = document.querySelector("#pw-input");
const pwConfirmInput = document.querySelector("#confirm-pw-input");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const signupBtn = document.querySelector("#auth-btn");

const visibleBtn = document.querySelectorAll(".visible-btn");

const modal = document.querySelector("#modal-bg");
const modalMsg = document.querySelector("#modal-msg");
const closeBtn = document.querySelector("#close-btn");

const msgList = {
    emailInputErrorMsg: "이메일을 입력해주세요.",
    emailValidErrorMsg: "잘못된 이메일 형식입니다.",
    nickameInputErrorMsg: "닉네임을 입력해주세요.",
    pwInputErrorMsg: "비밀번호를 입력해주세요.",
    pwLengthErrorMsg: "비밀번호를 8자 이상 입력해주세요.",
    pwValidErrorMsg: "잘못된 비밀번호 형식입니다.",
    pwConfirmMsg: "비밀번호가 일치하지 않습니다.",
    signupErrorModalMsg: "사용 중인 이메일입니다."
}

signupBtn.disabled = true;

//버튼 활성화 함수
const toggleBtnState = () => {
    const isEmailValid = emailRegex.test(emailInput.value);
    const isNicknameValid = (nicknameInput.value.trim() !== "");
    const isPwValid = pwRegex.test(pwInput.value);
    const isPwConfirmed = (pwInput.value === pwConfirmInput.value);

    //이메일, 닉네임, 비밀번호, 확인 모두 유효하면 활성화
    if (isEmailValid && isNicknameValid && isPwValid && isPwConfirmed) {
        signupBtn.disabled = false;
        signupBtn.classList.add("activate");
    }
    //버튼 비활성화
    else {
        signupBtn.disabled = true;
        signupBtn.classList.remove("activate");
    }
}

//회원가입 성공/실패
const validSignup = () => {
    const isEmailTaken = USER_DATA.some((element) => element.email === emailInput.value);

    isEmailTaken
    ? showModal(msgList.signupErrorModalMsg, modal, modalMsg)
    : (window.location.href = "./login.html");
}

emailInput.addEventListener("blur", (e) => validEmail(e, msgList, emailRegex, toggleBtnState));
nicknameInput.addEventListener("blur", (e) => validNickname(e, msgList, toggleBtnState));
pwInput.addEventListener("blur", (e) => validPw(e, msgList, pwRegex, toggleBtnState));
pwConfirmInput.addEventListener("blur", (e) => confirmPw(e, msgList, pwInput, toggleBtnState));
signupBtn.addEventListener("click", validSignup);
closeBtn.addEventListener("click", () => closeModal(modal));
visibleBtn.forEach((btn) => btn.addEventListener("click", visibleOn));