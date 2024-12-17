document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const togglePassword = document.getElementById("togglePassword");
    const showPasswordIcon = "./eyes.png";
    const hidePasswordIcon = "./secret.png";

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
        if (!emailInput.value) {
            showError(emailInput, "이메일을 입력해주세요.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, "잘못된 이메일 형식입니다.");
        } else {
            clearError(emailInput);
        }
    });

    // 비밀번호 유효성 검사
    passwordInput.addEventListener("focusout", function () {
        if (!passwordInput.value) {
            showError(passwordInput, "비밀번호를 입력해주세요.");
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
        } else {
            clearError(passwordInput);
        }
    });

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
});
