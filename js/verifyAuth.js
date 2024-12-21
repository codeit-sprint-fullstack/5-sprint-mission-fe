//에러 메시지 표시 함수
export const showError = (input, msg) => {
    clearError(input);

    input.classList.add("show-error");

    const errorMsg = document.createElement("div");
    errorMsg.classList.add("error-msg");
    errorMsg.innerText = msg;

    input.parentElement.insertAdjacentElement("afterend", errorMsg);
}

//에러 메시지 제거 함수
export const clearError = (input) => {
    const errorMsg = input.parentElement.nextElementSibling;
    input.classList.remove("show-error");
    if (errorMsg && errorMsg.classList.contains("error-msg")) {
        errorMsg.remove()
    }
};

//모달 팝업 표시 함수
export const showModal = (msg, modal, modalMsg) => {
    modalMsg.innerHTML = msg;
    modal.classList.add("show")
}

//모달 팝업 제거 함수
export const closeModal = (modal) => modal.classList.remove("show");

//이메일 유효성 검사 함수
export const validEmail = (e, msgList, emailRegex, toggleBtnState) => {
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

    toggleBtnState();
}

//비밀번호 유효성 검사 함수
export const validPw = (e, msgList, pwRegex, toggleBtnState) => {
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

    toggleBtnState();
}

//비밀번호 보기 함수
export const visibleOn = (e) => {
    const btn = e.target;
    const input = btn.previousElementSibling;
    input.classList.toggle("active-visible");

    input.type = input.classList.contains("active-visible") ? "text" : "password";
    btn.src = input.classList.contains("active-visible") ? "./assets/btn_visibility_on.svg" : "./assets/btn_visibility_off.svg";
}