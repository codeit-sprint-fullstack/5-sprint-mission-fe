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
    const passwordInput = document.getElementById("passwordInput");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.getElementById("loginButton");
    const showPasswordIcon = "./eye.png";
    const hidePasswordIcon = "./secret.png";

    // 초기 로그인 버튼 비활성화
    loginButton.classList.add("inactive");
    loginButton.disabled = true;

    // 에러 메시지 표시
    function showError(input, message) {
        clearError(input);
        input.parentElement.classList.add("input-error");
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = message;
        input.parentElement.insertAdjacentElement("afterend", errorMessage);
    }

    // 에러 메시지 제거
    function clearError(input) {
        input.parentElement.classList.remove("input-error");
        const nextElement = input.parentElement.nextElementSibling;
        if (nextElement && nextElement.classList.contains("error-message")) {
            nextElement.remove();
        }
    }

    // 이메일 유효성 검사
    emailInput.addEventListener("focusout", function () {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
             showError(emailInput, "잘못된 이메일 형식입니다.");
        } 
        else {
            clearError(emailInput);
        }
    });

    // 비밀번호 유효성 검사
    passwordInput.addEventListener("focusout", function () {
        if (passwordInput.value.length < 8) {
            showError(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
        } 
        else {
            clearError(passwordInput);
        }
    });


    // 입력 값 유효성 검사
    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isPasswordValid(password) {
        return password.length >= 8;
    }

    // 로그인 버튼 활성화 체크
    function checkInputs() {
        const emailValid = isEmailValid(emailInput.value.trim());
        const passwordValid = isPasswordValid(passwordInput.value.trim());

        if (emailValid && passwordValid) {
            activateLoginButton();
        } else {
            deactivateLoginButton();
        }
}




    // 버튼 활성화
    function activateLoginButton() {
        loginButton.classList.add("active");
        loginButton.style.pointerEvents = "auto";
    }

    // 버튼 비활성화
    function deactivateLoginButton() {
        loginButton.classList.remove("active");
        loginButton.style.pointerEvents = "none";
    }






    emailInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);

    // 비밀번호 보기/숨기기 기능
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.src = showPasswordIcon;
        } else {
            passwordInput.type = "password";
            togglePassword.src = hidePasswordIcon;
        }
    });




    //  로그인 버튼 클릭 이벤트
    // loginButton.addEventListener("click", function () {
    //     const email = emailInput.value.trim();
    //     const password = passwordInput.value.trim();

    //     const user = USER_DATA.find(user => user.email === email);

    //     if (!user) {
    //         alert("비밀번호가 일치하지 않습니다.");
    //     } else if (user.password !== password) {
    //         alert("비밀번호가 일치하지 않습니다.");
    //     } else {
    //         window.location.href = "../items/items.html"; // 페이지 이동
    //     }
    // });
    // document.addEventListener("keyup", function (event) {
    //     if (event.key === "Enter") {
    //         loginButton.click(); // 로그인 버튼 클릭 이벤트 호출
    //     }
    // });

    // 모달 관련 요소
    const messageModal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    const confirmButton = document.getElementById("confirmButton");

    // 모달 메시지 표시 함수
    function showModalMessage(message) {
        modalMessage.innerText = message; // 메시지 삽입
        messageModal.style.display = "block"; // 모달 보이기
    }

    
    // 로그인 버튼 클릭 이벤트 수정
    loginButton.addEventListener("click", function () {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        const user = USER_DATA.find(user => user.email === email);
        
        if (!user || user.password !== password) {
            showModalMessage("비밀번호가 일치하지 않습니다.");
        } else {
            window.location.href = "../items/items.html"; // 페이지 이동
        }
    });
    loginButton.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            loginButton.click(); // 로그인 버튼 클릭 이벤트 호출
        }
    });
    

    // 공통 이벤트 핸들러 함수
    function handleCloseModal(event) {
        if (event.type === "click" || (event.type === "keyup" && event.key === "Enter")) {
            messageModal.style.display = "none"; // 모달 숨기기
        }
    }
    // 클릭 및 키업 이벤트 리스너 추가
    confirmButton.addEventListener("click", handleCloseModal);
    confirmButton.addEventListener("keyup", handleCloseModal);


});


