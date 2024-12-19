//일단 과제 내용 먼저 만들고 나중에 변수 이름 스타일 통일하기

const emailInput = document.querySelector("#email_input");
const pwInput = document.querySelector("#pw_input");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const loginBtn = document.querySelector("#login_btn");

const visibleBtn = document.querySelectorAll(".visible_btn");

const msgList = {
    emailInputErrorMsg: "이메일을 입력해주세요.",
    emailValidErrorMsg: "잘못된 이메일 형식입니다.",
    pwInputErrorMsg: "비밀번호를 입력해주세요.",
    pwLengthErrorMsg: "비밀번호를 8자 이상 입력해주세요.",
    pwValidErrorMsg: "잘못된 비밀번호 형식입니다."
}

//에러 메세지 표시 함수
const showError = (input, msg) => {
    clearError(input);

    input.classList.add("showError");

    const errorMsg = document.createElement("div");
    errorMsg.classList.add("errorMsg");
    errorMsg.innerText = msg;

    input.parentElement.insertAdjacentElement("afterend", errorMsg);
}

//에러 메세지 제거 함수
const clearError = (input) => {
    const errorMsg = input.parentElement.nextElementSibling;
    input.classList.remove("showError");

    if (errorMsg && errorMsg.classList.contains("errorMsg")) {
        errorMsg.remove()
    }
};

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
}

emailInput.addEventListener("blur", validEmail);
pwInput.addEventListener("blur", validPw);
