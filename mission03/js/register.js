import {errorMessages} from "./accountCommon.js";
import {popMessages} from "./accountCommon.js";
import {errorBox} from "./accountCommon.js";
import {handleVisibilityIcon} from "./accountCommon.js";

// members 기본 데이터
let members = {
    'codeit@codeit.com' : {
        pw: 'codeit101!',
        nick: '코드잇기본계정',
    },
    'codeit2@codeit.com' : {
        pw: 'codeit202!',
        nick: '코드잇기본계정',
    },
    'codeit3@codeit.com' : {
        pw: 'codeit303!',
        nick: '코드잇기본계정',
    },
    'codeit4@codeit.com' : {
        pw: 'codeit404!',
        nick: '코드잇기본계정',
    },
    'codeit5@codeit.com' : {
        pw: 'codeit505!',
        nick: '코드잇기본계정',
    },
};

const passInput = document.querySelector(".passInput");
const emailInput = document.querySelector(".emailInput");
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const modal = document.querySelector(".modal");
const popMessage = document.querySelector(".popMessage");
const popCloseBtn = document.querySelector(".popCloseBtn");
const passMust = document.createElement("div");
const emailMust = document.createElement("div");
const nickInput = document.querySelector(".nickInput");
const passInputEqual = document.querySelector(".passInputEqual");
const signupBtn = document.querySelector(".signup");
const passEqualMust = document.createElement("div");
const nickMust = document.createElement("div");

signupBtn.classList.add("deactive");
signupBtn.disabled = true;

let passCheckBool = 0;
let passEqualCheckBool = 0;
let emailCheckBool = 0;
let nickCheckBool = 0;

//회원가입 버튼 활성화
function signupEnable () {
    signupBtn.classList.remove("deactive");
    signupBtn.classList.add("active");
    signupBtn.disabled = false;
}

//회원가입 버튼 비활성화
function signupDisable () {
    signupBtn.classList.remove("active");
    signupBtn.classList.add("deactive");
    signupBtn.disabled = true;
}

//회원가입 버튼 활성화를 위한 조건 확인
function allCheckBool() {
    return passCheckBool && passEqualCheckBool && emailCheckBool && nickCheckBool;
}

//Pop 모달창 활성화
function modalPopAlert (message){
    modal.style.display = "flex";
    popMessage.textContent = message;
}

//Pop 모달창 비활성화
popCloseBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
})

//패스워드 검증 로직
function passCheck(pV) {

    if(!pwPattern.test(pV)){
        errorBox(errorMessages.passError, passMust, passInput);
        passCheckBool = 0;
        signupDisable();
        return false;
    }
    passCheckBool = 1;
    if(allCheckBool()) signupEnable();
    return true;
}

// login 의 emailCheck 와 다름. (+ Registered Check)
function emailCheck(eV){
    const emailGood = !emailPattern.test(eV) || eV.length >= 30;
    if(emailGood){
        errorBox(errorMessages.emailTypeError, emailMust,emailInput);
        emailCheckBool = 0;
        signupDisable();
        return false;
    }
    if(emailRegisteredCheck(eV)){
        errorBox(errorMessages.emailExistError, emailMust,emailInput);
        emailCheckBool = 0;
        signupDisable();
        return false;
    }
    emailCheckBool = 1;
    if(allCheckBool()) signupEnable();
    return true;
}


// 패스워드 확인 검증
function passEqualCheck (pV) {
    if(pV !== passInput.value){
        errorBox(errorMessages.passEqualError, passEqualMust,passInputEqual);
        passEqualCheckBool = 0;
        signupDisable();
        return false;
    }
    passEqualCheckBool = 1;
    if(allCheckBool()) signupEnable();
    return true;
}

// 닉네임 검증
function nickCheck (nickname) {
    if(nickname.length >= 8){
        errorBox(errorMessages.nickLengthError, nickMust, nickInput);
        nickCheckBool = 0;
        signupDisable();
        return false;
    }
    nickCheckBool = 1;
    if(allCheckBool()) signupDisable();
    return true;
}

//등록된 이메일 검증
function emailRegisteredCheck (email) {
    
    //회원가입 처음 시도할 시, 로컬 스토리지에 기본으로 members 값 넣어줌
    if(!window.localStorage.members) window.localStorage.members = JSON.stringify(members);

    members = JSON.parse(window.localStorage.members);
    return members[email] ? true : false;

}

    
emailInput.addEventListener("focusout", (event) => {
    let emailVal = emailInput.value;
    emailCheck(emailVal);
})

emailInput.addEventListener("focusin", (event) => {
    emailMust.textContent = "";
    emailInput.style.border = "1px solid var(--maincolor)";
})

passInput.addEventListener("focusout", (event) => {
    let passVal = passInput.value;
    passCheck(passVal);
})

passInput.addEventListener("focusin", (event) => {
    passMust.textContent = "";
    passInput.style.border = "1px solid var(--maincolor)";
})


passInputEqual.addEventListener("focusout", (event) => {
    let passEqualVal = passInputEqual.value;
    passEqualCheck(passEqualVal);
})

passInputEqual.addEventListener("focusin", (event) => {
    passEqualMust.textContent= "";
    passInputEqual.style.border = "1px solid var(--maincolor)";
})



nickInput.addEventListener("focusout", (event) => {
    let nickVal = nickInput.value;
    nickCheck(nickVal);

})

nickInput.addEventListener("focusin", (event) => {
    nickMust.textContent ="";
    nickInput.style.border = "1px solid var(--maincolor)";

})



//회원가입 버튼 누를 시
signupBtn.addEventListener("click", (event) => {

    //등록되지 않은 이메일이고, 패스워드 확인과 패스워드의 input이 같은지.
    const isRegisterConfirm = !emailRegisteredCheck(emailInput.value) && passInput.value === passInputEqual.value

  
    if(isRegisterConfirm){

        const registerMember = {};
        registerMember.pw = passInput.value;
        registerMember.nick = nickInput.value;
        members[emailInput.value] = registerMember;

        window.localStorage.members = JSON.stringify(members);
        modalPopAlert(popMessages.registerSuccess);
        setTimeout(function(){
                    location.href="./login.html"
        }, 2000);

    }
    else modalPopAlert(popMessages.registerError);
    

})




const vector = document.querySelectorAll(".vector");
const passwordVisiblityIcon = vector[0];
const passwordCheckVisiblityIcon = vector[1];
passwordVisiblityIcon.addEventListener("click", handleVisibilityIcon);
passwordCheckVisiblityIcon.addEventListener("click", handleVisibilityIcon);