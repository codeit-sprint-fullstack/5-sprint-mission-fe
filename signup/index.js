const email = document.querySelector("#input_email");
const EmailTextEmptyToggle = (num) => document.querySelector(".em_text1").classList.toggle('hiden', num);
const EmailTextMissToggle = (num) => document.querySelector(".em_text2").classList.toggle('hiden', num);
const nickname = document.querySelector("#input_nickname");
const pwd = document.querySelector("#input_pwd");
const pwdTextEmptyToggle = (num) => document.querySelector(".pwd_text1").classList.toggle('hiden', num);
const pwdTextMissToggle = (num) => document.querySelector(".pwd_text2").classList.toggle('hiden', num);
const PwdImg = document.querySelector("#pwd_hiden_img");
const pwdcheckout = document.querySelector("#input_pwd_checkout");
const PwdCheckTextEmptyToggle = (num) => document.querySelector(".pwd_check_text1").classList.toggle('hiden', num);
const PwdCheckTextMissToggle = (num) => document.querySelector(".pwd_check_text2").classList.toggle('hiden', num);
const PwdCheckImg = document.querySelector("#pwdcheck_hiden_img");
const signupbox = document.querySelector("#signup");
const signup = () => signupbox.style.background = '#3692FF';

const EmPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const PwdPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const valigadeLength = (length) => length >= 8;
const EmptyValue = (event) => event.target.value === "";
const EmailPatterncheck = (email) => EmPattern.test(email); 
const PwdPatterncheck = (pwd) => PwdPattern.test(pwd); 
const PwdSame = () => pwd.value === pwdcheckout.value;
const TureLine = (e) => e.target.style.outline = '1px solid #3692FF';
const FalesLine = (e) => e.target.style.outline = '1px solid RED';
const AllTrue = {
    email : false,
    name : false,
    pwd : false,
    pwdcheck : false,
}

function executeIfAllTrue(obj, callback) {
    const all = Object.values(obj).every(value => value === true);
    if (all) {
        callback();
    }
}

email.addEventListener("focusout", function (e) {
    if(EmptyValue(e)){
        FalesLine(e);
        EmailTextEmptyToggle(0);
        EmailTextMissToggle(1);
    }else {
        EmailTextEmptyToggle(1);
        if(EmailPatterncheck(e.target.value)){
            EmailTextMissToggle(1);
            TureLine(e);
            AllTrue.email = true;
            executeIfAllTrue(AllTrue, () => signup());
        }else{
            EmailTextMissToggle(0);
            FalesLine(e);
        }   
    }
});

nickname.addEventListener("focusout", function (e) {
    if(EmptyValue(e)){
    }else{
        TureLine(e);
        AllTrue.name = true;
        executeIfAllTrue(AllTrue, () => signup());
    } 
});

pwd.addEventListener("focusout", function (e) {
    if(EmptyValue(e)){
        FalesLine(e);
        pwdTextEmptyToggle(0);
        pwdTextMissToggle(1);
    }else {
        pwdTextEmptyToggle(1);
        if(PwdPatterncheck(e.target.value)){
            pwdTextMissToggle(1);
            TureLine(e)
            AllTrue.pwd = true;
            executeIfAllTrue(AllTrue, () => signup());
        }else{
            pwdTextMissToggle(0);
            FalesLine(e);
        }
    }
});

PwdImg.addEventListener("click", function (e) {
    if(PwdImg.classList == 'pwd_img off'){
        pwd.setAttribute('type', 'text')
        PwdImg.classList.toggle('off');
    }else{
        pwd.setAttribute('type', 'password')
        PwdImg.classList.toggle('off');
    }
});

pwdcheckout.addEventListener("focusout", function (e) {
    if(EmptyValue(e)){
        FalesLine(e);
        PwdCheckTextEmptyToggle(0);
        PwdCheckTextMissToggle(1);
    }else {
        PwdCheckTextEmptyToggle(1);
        if(PwdSame()){
            PwdCheckTextMissToggle(1);
            TureLine(e)
            AllTrue.pwdcheck = true;
            executeIfAllTrue(AllTrue, () => signup());
        }else{
            PwdCheckTextMissToggle(0);
            FalesLine(e);
        }
    }
});

PwdCheckImg.addEventListener("click", function (e) {
    if(PwdCheckImg.classList == 'pwd_img off'){
        pwdcheckout.setAttribute('type', 'text')
        PwdCheckImg.classList.toggle('off');
    }else{
        pwdcheckout.setAttribute('type', 'password')
        PwdCheckImg.classList.toggle('off');
    }
});


signupbox.addEventListener("click", function (e) {
    executeIfAllTrue(AllTrue, () => location.href='../item/')
});

