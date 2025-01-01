import { inputEmail, inputPW, inputAlias, inputConfirmPW, confirmButton } from './eventListener.js'
import { USER_DATA } from './userDatabase.js';

//로그인 버튼 토글 함수
const toggleConfirmButton = () => {
  const emailValid = inputEmail && inputEmail.value !== "";
  const passwordValid = inputPW && inputPW.value !== "";
  const aliasValid = inputAlias ? inputAlias.value !== "" : true; // Only check alias on signup page
  const confirmPasswordValid = inputConfirmPW ? inputConfirmPW.value !== "" : true; // Only check confirm password on signup page

  //테스트 
  console.log('emailValid:', emailValid);
  console.log('passwordValid:', passwordValid);
  console.log('aliasValid:', aliasValid);
  console.log('confirmPasswordValid:', confirmPasswordValid);


  //모든 필드값 입력 시 버튼 활성화
  const isValid = emailValid && passwordValid && aliasValid && confirmPasswordValid;
  confirmButton.disabled = !isValid;

//버튼 비활성화 시 호버 비활성화
  if (confirmButton.disabled) {
    confirmButton.classList.remove('hover-enabled');
  } else {
    confirmButton.classList.add('hover-enabled');
  }
};


//모든 input값 null 아닌지 확인
const inputs = [inputEmail, inputPW, inputAlias, inputConfirmPW].filter(input => input !== null);

// Event listeners 
inputs.forEach(input => {
  input.addEventListener('input', toggleConfirmButton);
});


document.addEventListener('DOMContentLoaded', toggleConfirmButton);


//------------------------------------------------
//비밀번호 마스킹 토글


// 비밀번호 마스킹 토글 함수
const handleVisibleButton = (event, inputID) => {
  const visibleButton = event.currentTarget; // 클릭된 아이콘 요소
  const inputField = document.querySelector(inputID); // 비밀번호 입력 필드

  // 비밀번호 마스킹 처리
  if (inputField.type === "password") {
    inputField.type = "text";
    visibleButton.src = "/btn_visibility_on_24px.svg";
  } else {
    inputField.type = "password";
    console.log("비밀번호 마스킹");
    visibleButton.src = "/btn_visibility_off.svg";
  }
};

// 아이콘 버튼 요소 가져오기
const showPassword = document.querySelector(".visible-btn");
const showConfirmPassword = document.querySelector(".visible-btn2"); // 수정된 클래스

// 클릭 이벤트 등록
if (showPassword && document.querySelector("#password")) {
  showPassword.addEventListener("click", (event) => handleVisibleButton(event, "#password"));
}

if (showConfirmPassword && document.querySelector("#confirmPassword")) {
  showConfirmPassword.addEventListener("click", (event) => handleVisibleButton(event, "#confirmPassword"));
}
