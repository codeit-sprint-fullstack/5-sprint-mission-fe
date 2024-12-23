//  input 에 빈 값이 있거나 에러 메세지가 있으면  ‘로그인’ 버튼은 비활성화 됩니다.
// Input 에 유효한 값을 입력하면  ‘로그인' 버튼이 활성화 됩니다.
//  활성화된 ‘로그인’ 버튼을 누르면  “/items” 로 이동합니다


// HTML DOM
const emailInput = document.getElementById("email")
const nicknameInput = document.getElementById("nickname")
const passwordInput = document.getElementById("password")
const confirmpwInput = document.getElementById("confirm-password")

const errorEmail = document.getElementById("email-error")
const errorNickname = document.getElementById("nickname-error")
const errorPw = document.getElementById("password-error")
const errorConfirmpw = document.getElementById("confirm-password-error")


// 이메일 유효성 검사
if (emailInput) {
    emailInput.addEventListener("focusout", () => {
        if (!emailInput.value) {
            emailInput.style.outline = "2.5px solid red";
            errorEmail.textContent = "이메일을 입력해주세요";
        } else if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            emailInput.style.outline = "2.5px solid red";
            errorEmail.textContent = "잘못된 이메일 형식입니다";
        } else {
            emailInput.style.outline = "none";
            errorEmail.textContent = "";
        }
    });
}

// 닉네임 유효성 검사 (signup.html)
if (nicknameInput) {
    nicknameInput.addEventListener("input", () => {
        if (!nicknameInput.value) {
            nicknameInput.style.outline = "2.5px solid red";
            errorNickname.textContent = "닉네임을 입력해 주세요";
        } else if (nicknameInput.value.length < 2) {
            nicknameInput.style.outline = "2.5px solid red";
            errorNickname.textContent = "닉네임을 2자 이상 입력해 주세요"; // 객체로 묶어봐
        } else {
            nicknameInput.style.outline = "none";
            errorNickname.textContent = "";
        }
    });
}

// 비밀번호 유효성 검사
if (passwordInput) {
    passwordInput.addEventListener("input", () => {
        if (!passwordInput.value) {
            passwordInput.style.outline = "2.5px solid red";
            errorPw.textContent = "비밀번호를 입력해주세요";
        } else if (passwordInput.value.length < 8) {
            passwordInput.style.outline = "2.5px solid red";
            errorPw.textContent = "비밀번호를 8자 이상 입력해주세요";
        } else {
            passwordInput.style.outline = "none";
            errorPw.textContent = "";
        }
    });
}

// 비밀번호 확인 검사 (signup.html)
if (confirmpwInput) {
    confirmpwInput.addEventListener("input", () => {
        if (!confirmpwInput.value) {
            confirmpwInput.style.outline = "2.5px solid red";
            errorConfirmpw.textContent = "비밀번호를 다시 한 번 입력해주세요";
        } else if (confirmpwInput.value !== passwordInput.value) {
            errorConfirmpw.textContent = "비밀번호가 일치하지 않습니다";
        } else {
            confirmpwInput.style.outline = "none";
            errorConfirmpw.textContent = "";
        }
    });
}

// 비밀번호 토글
const passwordEye = document.getElementById("password-toggle")
const confirmEye = document.getElementById("confirm-password-toggle")

if(passwordInput) {
    passwordEye.addEventListener("click", () => {
        if(passwordInput.type === "password") {
            passwordInput.type = "text"
            passwordEye.src = "images/icons/eye-visible.svg"
        } else {
            passwordInput.type = "password"
            passwordEye.src = "images/icons/eye-invisible.svg"
        }
    })
}

if(confirmpwInput) {
    confirmEye.addEventListener("click", () => {
        if(confirmpwInput.type === "password") {
            confirmpwInput.type = "text"
            confirmEye.src = "images/icons/eye-visible.svg"
        } else {
            confirmpwInput.type = "password"
            confirmEye.src = "images/icons/eye-invisible.svg"
        }
    })
}

// 버튼 활성화
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");

// button 유효성 검사
if(loginButton){
    function loginbtnValidate() {
        let emailValid = false;
        let passwordValid = false;
        if (emailInput) {
            emailValid = emailInput.value.includes("@") && emailInput.value.includes(".");
        }
    
        if (passwordInput) {
            passwordValid = passwordInput.value.length >= 8;
        }
    
        loginButton.disabled = !(emailValid && passwordValid);
    }
    }
    
if (emailInput) emailInput.addEventListener("input", loginbtnValidate);
if (passwordInput) passwordInput.addEventListener("input", loginbtnValidate);

if(signupButton){
function signupbtnValidate() {
    let emailValid = false;
    let passwordValid = false;
    let nicknameValid = false; 
    let confirmPasswordValid = false;

    if (emailInput) {
        emailValid = emailInput.value.includes("@") && emailInput.value.includes(".");
    }

    if (passwordInput) {
        passwordValid = passwordInput.value.length >= 8;
    }

    if (nicknameInput) {
        nicknameValid = nicknameInput.value.length >= 2;
    }

    if (confirmpwInput) {
        confirmPasswordValid = confirmpwInput.value === passwordInput.value;
    }

    signupButton.disabled = !(emailValid && passwordValid && nicknameValid && confirmPasswordValid);
}
}

if (emailInput) emailInput.addEventListener("input", signupbtnValidate);
if (passwordInput) passwordInput.addEventListener("input", signupbtnValidate);
if (nicknameInput) nicknameInput.addEventListener("input", signupbtnValidate);
if (confirmpwInput) confirmpwInput.addEventListener("input", signupbtnValidate);

// 유저 데이터베이스

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const modalBackground = document.querySelector(".modal-background")
const modalContainer = document.querySelector(".modal-container")
const modalMessage = document.querySelector(".modal-message")

if(loginButton){
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i = 0; i < USER_DATA.length; i++) {
        const user = USER_DATA[i];
    
        if (user.email === emailInput.value) {
            if (user.password === passwordInput.value) {
            window.location.href = "./items.html";
            return; // 성공하면 함수 종료
            } else {
            modalBackground.style.display = "block"
            modalContainer.style.display = "flex"
            loginButton.style.display = "none"
            modalMessage.textContent = "비밀번호가 일치하지 않습니다"
            return; // 비밀번호가 틀리면 함수 종료
            }
        }
    }
    modalBackground.style.display = "block"
    modalContainer.style.display = "flex"
    loginButton.style.display = "none"
    modalMessage.textContent = "이메일이 존재하지 않습니다"
})
}

const modalButton = document.querySelector(".modalbtn")
if(signupButton){
signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i = 0; i < USER_DATA.length; i++){  //find 사용 // UI관련 코드묶기
        const user = USER_DATA[i];
        if (user.email === emailInput.value){
            modalBackground.style.display = "block"
            modalContainer.style.display = "flex"
            signupButton.style.display = "none"
            modalMessage.textContent = "사용 중인 이메일입니다" 
            return;
        }
    }
    modalBackground.style.display = "block"
    modalContainer.style.display = "flex"
    signupButton.style.display = "none"
    modalMessage.textContent = "판다마켓의 회원이 되셨습니다!"
    modalButton.textContent = "로그인"
    modalButton.addEventListener("click", ()=>{
        window.location.href = "./login.html";
    })
})
}

