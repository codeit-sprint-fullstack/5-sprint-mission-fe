const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("emailInput");
    const nicknameInput = document.querySelector(".nickname_input input");
    const passwordInput = document.getElementById("passwordInput");
    const checkPasswordInput = document.getElementById("checkPasswordInput");
    const signupButton = document.getElementById("login_bt");
    const showPasswordIcon = "../../img/eye.png";
    const hidePasswordIcon = "../../img/secret.png";

    // 입력 값 유효성 검사 함수
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = (password) => password.length >= 8;
    const isNicknameValid = (nickname) => nickname.trim().length > 0;
    const isPasswordMatch = (password, checkPassword) => password === checkPassword;

    // 에러 메시지 및 테두리 표시 함수
    function showError(input, message) {
        clearError(input);
        input.classList.add("input-error"); 
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = message;
        input.parentElement.insertAdjacentElement("afterend", errorMessage);
    }

    // 에러 메시지 및 테두리 제거 함수
    function clearError(input) {
        input.classList.remove("input-error"); 
        const nextElement = input.parentElement.nextElementSibling;
        if (nextElement && nextElement.classList.contains("error-message")) {
            nextElement.remove();
        }
    }

    // 이메일 유효성 검사
    emailInput.addEventListener("focusout", function () {
        if (!isEmailValid(emailInput.value.trim())) {
            showError(emailInput, "잘못된 이메일 형식입니다.");
        } else {
            clearError(emailInput);
        }
    });

    // 이메일 유효성 검사
    passwordInput.addEventListener("focusout", function () {
        if (!isPasswordValid(passwordInput.value.trim())) {
            showError(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
        } else {
            clearError(passwordInput);
        }
    });

    
    // 비밀번호 확인 검사
    checkPasswordInput.addEventListener("focusout", function () {
        if (!isPasswordMatch(passwordInput.value.trim(), checkPasswordInput.value.trim())) {
            showError(checkPasswordInput, "비밀번호가 일치하지 않습니다.");
        } else {
            clearError(checkPasswordInput);
        }
    });

    // 버튼 활성화 체크
    function checkInputs() {
        const emailValid = isEmailValid(emailInput.value.trim());
        const nicknameValid = isNicknameValid(nicknameInput.value.trim());
        const passwordValid = isPasswordValid(passwordInput.value.trim());
        const passwordMatch = isPasswordMatch(passwordInput.value.trim(), checkPasswordInput.value.trim());

        if (emailValid && nicknameValid && passwordValid && passwordMatch) {
            activateSignupButton();
        } else {
            deactivateSignupButton();
        }
    }

    // 버튼 활성화
    function activateSignupButton() {
        signupButton.classList.add("active");
        signupButton.style.pointerEvents = "auto";
    }

    // 버튼 비활성화
    function deactivateSignupButton() {
        signupButton.classList.remove("active");
        signupButton.style.pointerEvents = "none";
    }






        
    // 버튼 활성화 상태 업데이트 (모든 입력 필드의 변화 반영)
    [emailInput, nicknameInput, passwordInput, checkPasswordInput].forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    const togglePassword = document.getElementById("togglePassword");

    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.src = showPasswordIcon;
        } else {
            passwordInput.type = "password";
            togglePassword.src = hidePasswordIcon;
        }
    });
    const togglePassword2 = document.getElementById("togglePassword2");

    togglePassword2.addEventListener("click", function () {
        if (checkPasswordInput.type === "password") {
            checkPasswordInput.type = "text";
            togglePassword2.src = showPasswordIcon;
        } else {
            checkPasswordInput.type = "password";
            togglePassword2.src = hidePasswordIcon; 
        }
    });



    const messageModal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    const confirmButton = document.getElementById("confirmButton");

    // 모달 메시지 표시 함수
    function showModalMessage(message) {
        modalMessage.innerText = message;
        messageModal.style.display = "block"; 
    }

    // 회원가입 버튼 클릭 이벤트
    function handleSignUp() {
        const email = emailInput.value.trim();
        const nickname = nicknameInput.value.trim();
        const password = passwordInput.value.trim();

        let users = JSON.parse(window.localStorage.getItem("users")) || [];
        const localEmailExists = users.some(user => user.email === email);
        const emailExists = USER_DATA.find(user => user.email === email)


        if (localEmailExists || emailExists) {
            showModalMessage("사용중인 이메일입니다.");
        } else { 
            users.push({ email, nickname, password });
            localStorage.setItem("users", JSON.stringify(users));
            showModalMessage("회원가입이 완료되었습니다.");
        }
        
        
    };
    signupButton.addEventListener("click", handleSignUp);   


        
    
    function handleConfirm() {
        console.log(modalMessage);
        messageModal.style.display = "none"; 
        if (modalMessage.innerText === "회원가입이 완료되었습니다.") { 
            window.location.href = "../login.html"; 
        }
    }

    // 버튼 클릭 이벤트 추가
    confirmButton.addEventListener("click", handleConfirm);

    // 엔터키 이벤트 추가
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") { 
            if (messageModal.style.display === "block") { 
                handleConfirm(); 
            } else {
                handleSignUp(); 
            }
        }
    });



    

});
