import {errorMessages} from "./accountCommon.js";
import {popMessages} from "./accountCommon.js";
import {errorBox} from "./accountCommon.js";
import {handleVisibilityIcon} from "./accountCommon.js";

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


function modalPopAlert (message){
    modal.style.display = "flex";
    popMessage.textContent = message;
}

popCloseBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
})

function passCheck(pV) {

    if(!pwPattern.test(pV)){
        errorBox(errorMessages.passError, passMust, passInput);
        return false;
    }
    return true;
}

// login 의 emailCheck 와 다름. (+ Registered Check)
function emailCheck(eV){
    const emailCheckBool = !emailPattern.test(eV) || eV.length >= 30;
    if(emailCheckBool){
        errorBox(errorMessages.emailTypeError, emailMust,emailInput);
        return false;
    }
    if(emailRegisteredCheck(eV)){
        errorBox(errorMessages.emailExistError, emailMust,emailInput);
        return false;
    }
    return true;
}



function passEqualCheck (pV) {
    if(pV !== passInput.value){
        errorBox(errorMessages.passEqualError, passEqualMust,passInputEqual);
        return false;
    }
    return true;
}


function nickCheck (nickname) {
    if(nickname.length >= 8){
        errorBox(errorMessages.nickLengthError, nickMust, nickInput);
        return false;
    }
    return true;
}


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




signupBtn.addEventListener("click", (event) => {

    const isRegisterConfirm = !emailRegisteredCheck(emailInput.value) && emailInput.value !== ""  && passInput.value === passInputEqual.value  && emailInput.value.length < 30 && nickInput.value.length < 8  && pwPattern.test(passInput.value);

  
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