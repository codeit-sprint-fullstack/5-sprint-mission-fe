import { showError, clearError } from "./controlUI.js";

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

//닉네임 확인 함수
export const validNickname = (e, msgList, toggleBtnState) => {
    const nickname = e.target;

    if (!nickname.value.trim()) {
        showError(nickname, msgList.nickameInputErrorMsg);
    }
    else {
        clearError(nickname);
    }

    toggleBtnState();
}

//비밀번호 확인 함수
export const confirmPw = (e, msgList, pwInput, toggleBtnState) => {
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

    toggleBtnState();
}