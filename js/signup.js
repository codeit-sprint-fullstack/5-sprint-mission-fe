import {USER_DATA} from "./userData.js";

const emailInput = document.querySelector("#email_input");
const pwInput = document.querySelector("#pw_input");
const pwConfirmInput = document.querySelector("#confirm_pw_input");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const signupBtn = document.querySelector("#signup_btn");

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
    pwConfirmMsg: "비밀번호가 일치하지 않습니다.",
    signupErrorModalMsg: "사용 중인 이메일입니다."
}

signupBtn.disabled = true;

//에러 메시지 표시 함수
const showError = (input, msg) => {
    clearError(input);

    input.classList.add("show_error");

    const errorMsg = document.createElement("div");
    errorMsg.classList.add("error_msg");
    errorMsg.innerText = msg;

    input.parentElement.insertAdjacentElement("afterend", errorMsg);
}

//에러 메시지 제거 함수
const clearError = (input) => {
    const errorMsg = input.parentElement.nextElementSibling;
    input.classList.remove("show_error");

    if (errorMsg && errorMsg.classList.contains("error_msg")) {
        errorMsg.remove()
    }
};

//회원가입 버튼 활성화 함수
const toggleSignupBtnState = () => {
    const isEmailValid = emailRegex.test(emailInput.value);
    const isPwValid = pwRegex.test(pwInput.value);
    const isPwConfirmed = (pwInput.value === pwConfirmInput.value);

    //이메일, 비밀번호, 확인 모두 유효하면 활성화
    if (isEmailValid && isPwValid &&isPwConfirmed) {
        signupBtn.disabled = false;
        signupBtn.classList.add("activate");
    }
    //버튼 비활성화
    else {
        signupBtn.disabled = true;
        signupBtn.classList.remove("activate");
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


//회원가입 성공/실패
const validSignup = () => {
    const isEmailTaken = USER_DATA.some((element) => element.email === emailInput.value);

    //사용 중인 이메일
    if (isEmailTaken) {
        showModal(msgList.signupErrorModalMsg);
    }
    //일치하면 회원가입 성공, 페이지 이동
    else {
        window.location.href = "./login.html";
    }
}

signupBtn.addEventListener("click", validSignup);

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

    toggleSignupBtnState();
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

    toggleSignupBtnState();
}

//비밀번호 확인 함수
const confirmPw = (e) => {
    const targetPw = e.target;

    if (!targetPw.value.trim()) {
        showError(targetPw, msgList.pwInputErrorMsg);
    }
    else if (targetPw.value !== pwInput.value) {
        showError(targetPw, msgList.pwConfirmMsg);
    }
    else {
        clearError(targetPw);
    }

    toggleSignupBtnState();
}

emailInput.addEventListener("blur", validEmail);
pwInput.addEventListener("blur", validPw);
pwConfirmInput.addEventListener("blur", confirmPw);

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