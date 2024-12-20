const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.getElementById("loginButton");
    const messageModal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    const confirmButton = document.getElementById("confirmButton");
    const showPasswordIcon = "../img/eye.png"; // 비밀번호 보기 아이콘 경로
    const hidePasswordIcon = "../img/secret.png"; // 비밀번호 숨기기 아이콘 경로

    // 이메일 및 비밀번호 유효성 검사 함수
    const isEmailValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password => password.length >= 8;

    // 입력 값 확인 및 버튼 활성화
    const checkInputs = () => {
        const emailValid = isEmailValid(emailInput.value.trim());
        const passwordValid = isPasswordValid(passwordInput.value.trim());

        if (emailValid && passwordValid) {
            activateLoginButton();
        } else {
            deactivateLoginButton();
        }
    };

    [emailInput, passwordInput].forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    const activateLoginButton = () => {
        loginButton.classList.add("active");
        loginButton.style.pointerEvents = "auto";
    };

    const deactivateLoginButton = () => {
        loginButton.classList.remove("active");
        loginButton.style.pointerEvents = "none";
    };

    // 로그인 처리 함수
    const handleLogin = () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const local = JSON.parse(localStorage.getItem("users")) || [];
        const passiveData = USER_DATA.find( user => user.email === email);
        const user = local.find(user => user.email === email);
       
       

        if (passiveData || user) {
            window.location.href = "../items/items.html";
        }
        else if(!user || user.password !== password) {
            showModalMessage("비밀번호가 일치하지 않습니다.");
        } else {
            window.location.href = "../items/items.html"; // 로그인 성공 시 이동
        }
     
        

    };

    // 모달 메시지 표시 함수
    const showModalMessage = message => {
        modalMessage.innerText = message; // 메시지 삽입
        messageModal.style.display = "block"; // 모달 보이기
    };

    // 모달 닫기 처리 함수
    const handleCloseModal = () => {
        messageModal.style.display = "none"; // 모달 숨기기
    };

    loginButton.addEventListener("click", handleLogin);
    confirmButton.addEventListener("click", handleCloseModal);

    // 비밀번호 보기/숨기기 기능 추가
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // 비밀번호 표시
            togglePassword.src = showPasswordIcon; // 아이콘 변경
        } else {
            passwordInput.type = "password"; // 비밀번호 숨김
            togglePassword.src = hidePasswordIcon; // 아이콘 변경
        }
    });

    // 엔터키 이벤트 추가
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            if (messageModal.style.display === "block") {
                handleCloseModal(); // 모달이 열려 있다면 닫기
            } else {
                handleLogin(); // 로그인 처리
            }
        }
    });

    // 이메일 및 비밀번호 포커스아웃 시 에러 처리
    emailInput.addEventListener("focusout", function () {
        if (!isEmailValid(emailInput.value.trim())) {
            showError(emailInput, "잘못된 이메일 형식입니다.");
        } else {
            clearError(emailInput);
        }
    });

    passwordInput.addEventListener("focusout", function () {
        if (!isPasswordValid(passwordInput.value.trim())) {
            showError(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
        } else {
            clearError(passwordInput);
        }
    });

    // 에러 메시지 표시 함수
    const showError = (input, message) => {
        clearError(input);
        input.parentElement.classList.add("input-error");
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = message;
        input.parentElement.insertAdjacentElement("afterend", errorMessage);
    };

    // 에러 메시지 제거 함수
    const clearError = input => {
        input.parentElement.classList.remove("input-error");
        const nextElement = input.parentElement.nextElementSibling;
        if (nextElement && nextElement.classList.contains("error-message")) {
            nextElement.remove();
        }
    };
});
