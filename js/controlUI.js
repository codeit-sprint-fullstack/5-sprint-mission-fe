//에러 메시지 표시 함수
export const showError = (input, msg) => {
    clearError(input);

    input.classList.add("show-error");

    const errorMsg = document.createElement("div");
    errorMsg.classList.add("error-msg");
    errorMsg.innerText = msg;

    input.parentElement.insertAdjacentElement("afterend", errorMsg);
}

//에러 메시지 제거 함수
export const clearError = (input) => {
    const errorMsg = input.parentElement.nextElementSibling;
    input.classList.remove("show-error");
    if (errorMsg && errorMsg.classList.contains("error-msg")) {
        errorMsg.remove()
    }
};

//모달 팝업 표시 함수
export const showModal = (msg, modal, modalMsg) => {
    modalMsg.innerHTML = msg;
    modal.classList.add("show")
}

//모달 팝업 제거 함수
export const closeModal = (modal) => modal.classList.remove("show");

//비밀번호 보기 함수
export const visibleOn = (e) => {
    const btn = e.target;
    const input = btn.previousElementSibling;
    input.classList.toggle("active-visible");

    input.type = input.classList.contains("active-visible") ? "text" : "password";
    btn.src = input.classList.contains("active-visible") ? "./assets/btn_visibility_on.svg" : "./assets/btn_visibility_off.svg";
}