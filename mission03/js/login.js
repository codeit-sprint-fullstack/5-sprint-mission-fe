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
const loginBtn = document.querySelector(".login");

loginBtn.classList.add("deactive");
loginBtn.disabled = true;

let passCheckBool = 0;
let emailCheckBool = 0;

function loginEnable () {
    loginBtn.classList.remove("deactive");
    loginBtn.classList.add("active");
    loginBtn.disabled = false;
}

function loginDisable () {
    loginBtn.classList.remove("active");
    loginBtn.classList.add("deactive");
    loginBtn.disabled = true;
}

function passCheck(pV) {

    if(!pwPattern.test(pV)){
        errorBox(errorMessages.passError, passMust, passInput);
        passCheckBool = 0;
        loginDisable();
        return false;
    }
    passCheckBool = 1;
    if(passCheckBool && emailCheckBool) loginEnable();
    return true;
}


function emailCheck(eV){
    const emailPatternCheck = emailPattern.test(eV) && eV.length < 30;
    if(!emailPatternCheck){
        errorBox(errorMessages.emailTypeError, emailMust, emailInput);
        emailCheckBool = 0;
        loginDisable();
        return false;
    }
    emailCheckBool = 1;
    if(passCheckBool && emailCheckBool) loginEnable();
    return true;
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

function modalPopAlert (message){
    modal.style.display = "flex";
    popMessage.textContent = message;
}

popCloseBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
})

function login (email, pw) {
    if(members[email]){

        if(!window.localStorage.members) window.localStorage.members = JSON.stringify(members);
        members = JSON.parse(window.localStorage.members);
        const isMember = (members[email].pw === pw);

        if(isMember){
            setTimeout(function(){
                location.href="./items.html"
            }, 2000);
            modalPopAlert(popMessages.loginSuccess);
        }
        else modalPopAlert(popMessages.loginError);
    }
    else modalPopAlert(popMessages.loginError);
}

loginBtn.addEventListener("click", (event) => {
    
    let email = emailInput.value;
    let pw = passInput.value;
    login(email, pw);

})

const vector = document.querySelector(".vector");
vector.addEventListener("click", handleVisibilityIcon);