import {USER_DATA} from "./userData.js";

const emailInput = document.querySelector("#email_input");
const pwInput = document.querySelector("#pw_input");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const loginBtn = document.querySelector("#login_btn");

const visibleBtn = document.querySelectorAll(".visible_btn");

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

//에러 메시시지 표시 함수
const showError = (input, msg) => {
    clearError(input);

    input.classList.add("show_error");

    const errorMsg = document.createElement("div");
    errorMsg.classList.add("error_msg");
    errorMsg.innerText = msg;

    input.parentElement.insertAdjacentElement("afterend", errorMsg);
}

//에러 메시시지 제거 함수
const clearError = (input) => {
    const errorMsg = input.parentElement.nextElementSibling;
    input.classList.remove("show_error");

    if (errorMsg && errorMsg.classList.contains("error_msg")) {
        errorMsg.remove()
    }
};

//로그인 버튼 활성화 함수
const toggleLoginBtnState = () => {
    const isEmailValid = emailRegex.test(emailInput.value);
    const isPwValid = pwRegex.test(pwInput.value);

    //이메일, 비밀번호 모두 유효하면 활성화
    if (isEmailValid && isPwValid) {
        loginBtn.disabled = false;
        loginBtn.classList.add("activate");
    }
    //로그인 버튼 비활성화
    else {
        loginBtn.disabled = true;
        loginBtn.classList.remove("activate");
    }
}

//모달 팝업 표시 함수
const showModal = (msg) => {
    modalMsg.innerHTML = msg;
    modal.classList.add("show")
}

//모달 팝업 제거 함수
const closeModal = () => {
    modal.classList.remove("show");
}

closeBtn.addEventListener("click", closeModal);


//로그인 성공/실패
const loginErrorModal = () => {
    const userData = USER_DATA.find((element) => element.email === emailInput.value);
    console.log(userData)

    const isEmailNotFound = !userData;
    const isPwIncorrect = userData && userData.password !==pwInput.value;

    //데이터 일치하지 않으면 로그인 실패, 모달 팝업
    if (isEmailNotFound || isPwIncorrect) {
        showModal(msgList.loginErrorModalMsg);
    }
    //일치하면 로그인 성공, 페이지 이동
    else {
        window.location.href = "../items.html";
    }
}

loginBtn.addEventListener("click", loginErrorModal);

//이메일 유효성 검사 함수
const validEmail = (e) => {
    const email = e.target;
    
    //입력 값이 없을 경우
    if (!email.value.trim()) {
        showError(email, msgList.emailInputErrorMsg);
    }
    //이메일 형식이 맞지 않을 경우
    else if (!emailRegex.test(email.value)) {
        showError(email, msgList.emailValidErrorMsg);
    }
    else {
        clearError(email);
    }

    toggleLoginBtnState();
}

//비밀번호 유효성 검사 함수
const validPw = (e) => {
    const pw = e.target;

    //입력 값이 없을 경우
    if (!pw.value.trim()) {
        showError(pw, msgList.pwInputErrorMsg);
    }
    //값이 8자 미만일 경우
    else if(pw.value.length < 8) {
        showError(pw, msgList.pwLengthErrorMsg);
    }
    //비밀번호 형식이 맞지 않을 경우
    else if(!pwRegex.test(pw.value)) {
        showError(pw, msgList.pwValidErrorMsg);
    }
    else {
        clearError(pw);
    }

    toggleLoginBtnState();
}

emailInput.addEventListener("blur", validEmail);
pwInput.addEventListener("blur", validPw);

//비밀번호 보기 함수
const visibleOn = (e) => {
    const btn = e.target;
    const input = btn.previousElementSibling;
    input.classList.toggle("active_visible");

    if (input.classList.contains("active_visible")) {
        btn.src = "./assets/btn_visibility_on.svg";
        input.type = "text";
    }
    else {
        btn.src = "./assets/btn_visibility_off.svg";
        input.type = "password";
    }
}

visibleBtn.forEach((btn) =>{
    btn.addEventListener("click", visibleOn);
})