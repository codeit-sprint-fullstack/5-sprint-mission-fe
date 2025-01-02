// 에러 메시지 모음
export const errorMessages =
{
    emailTypeError : "잘못된 이메일 형식입니다.",
    emailLengthError : "이메일이 너무 깁니다.",
    emailExistError : "이미 존재하는 이메일입니다.",
    passError : "비밀번호가 올바르지 않습니다.",
    passLengthError : "비밀번호를 8자 이상 16자리 미만으로 입력해주세요.",
    passTypeError : "비밀번호는 대문자, 소문자, 특수기호를 허용하고, 특수기호가 반드시 1개이상 있어야합니다.",
    passEqualError : "비밀번호가 일치하지 않습니다.",
    nickLengthError : "닉네임이 너무 깁니다.",
};

// Pop 메시지 모음
export const popMessages =
{
    loginError : "아이디 또는 비밀번호가 일치하지 않습니다.",
    loginSuccess : "로그인 성공! 2초후 자동으로 이동됩니다.",
    registerSuccess : "회원가입 완료. 2초뒤 자동으로 이동됩니다.",
    registerError : "이메일과 비밀번호가 제대로 입력되었는지 다시 확인해보세요.",
};   

// 에러박스 컴포넌트
export function errorBox (message, must, input) {
    must.textContent = message;
    must.classList.add("errorBox")
    input.style.border = "1px solid red";
    input.parentElement.parentElement.append(must);
}

// 비밀번호 숨김/보이기 기능
let visibleStatus = 0;
export const handleVisibilityIcon = (event) => {
    const visibilityIcon = event.target;
    if(!visibleStatus){
        visibleStatus = 1;
        visibilityIcon.src = "img/vector_hide.png";
        visibilityIcon.parentElement.firstElementChild.type = "text";
    }
    else{
        visibleStatus = 0;
        visibilityIcon.src = "img/vector.png";
        visibilityIcon.parentElement.firstElementChild.type = "password";
    }
}