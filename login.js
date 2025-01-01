// errortext.color = "#F74747";
// input focusout시 border-color  "#F74747";
/*이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다
비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다. */
// error text
// email = "이메일을 입력해주세요" , 형식이 틀릴 경우 = "잘못된 이메일 형식입니다."
// passward = "비밀번호를 입력해주세요." , 8자이하 "비밀번호를 8자 이상 입력해주세요."
//  로그인 및 회원가입 페이지의 이메일, 비밀번호, 비밀번호 확인 input에 필요한 유효성 검증 함수를 만들고 적용해 주세요
document.addEventListener("DOMContentLoaded", () => {
const emailInput = document.querySelector("#email-Input");
const passwordInput = document.querySelector("#password-Input");
const togglePassword = document.querySelector("#togglePassword");
const loginBtn = document.querySelector(".login-button");

const USER_DATA = [
           { email: 'codeit1@codeit.com', password: "codeit101!" },
	         { email: 'codeit2@codeit.com', password: "codeit202!" },
           { email: 'codeit3@codeit.com', password: "codeit303!" },
           { email: 'codeit4@codeit.com', password: "codeit404!" },
 	         { email: 'codeit5@codeit.com', password: "codeit505!" },
           { email: 'codeit6@codeit.com', password: "codeit606!" },
]

//에러 메세지 생성
const createErrorMessage = (input, message) => {
  removeErrorMessage(input);
  //Element : 엘리먼트를 추상화한 객체
  const errorContainer = input.parentElement.nextElementSibling;
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  errorElement.style.color = "#F74747" ;
  input.style.borderColor = "#F74747" ;
  input.classList.add("error");
  errorContainer.appendChild(errorElement);
};

const removeErrorMessage = (input) => {
  input.classList.remove("error");
  input.style.borderColor = "";
  const errorContainer = input.parentElement.nextElementSibling;
  errorContainer.innerHTML = "";
};

let startLoad = true;

const validateEmail = () => {
  //emailinput에 들어가는 볼륨 확인
  //trim() 양끝 공백 제거
  const emailValue = emailInput.value.trim();
  const emailxp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (startLoad) return true;

   if (!emailValue) {
    createErrorMessage(emailInput, "이메일을 입력해주세요.");
    return false;
    //test() : 패턴이 일치하는지 확인하는 불리언 반환 매서드
  } else if (!emailxp.test(emailValue)){
    createErrorMessage(emailInput, "잘못된 이메일 형식입니다.");
    return false;
  } else {
    removeErrorMessage(emailInput);
    return true;
  }
};

const validatePassword  = () => {
  const passwordValue = passwordInput.value.trim();

  if (startLoad) return true;

  if (!passwordValue) {
    createErrorMessage(passwordInput, "비밀번호를 입력해주세요.");
    return false;
  } else if (passwordValue.length < 8) {
    createErrorMessage(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
    return false;
  } else {
    removeErrorMessage(passwordInput);
    return true;
  }
};

// input에 빈 값 or errorm messege 있으면 로그인 버튼 비활성화
// input에 유효값이 있다면 로그인 버튼 활성화
// 활성화 된 로그인 버튼은 아이템으로 이동

const disableSignupButton = () => {
  loginBtn.style.backgroundColor = "var(--inputtextcolor)";
  loginBtn.style.pointerEvents = "none";
  loginBtn.style.cursor = "not-allowed";
  loginBtn.setAttribute("disabled", "true");
};

disableSignupButton();

const toggleLoginBtn = () => {
  loginBtn.setAttribute("disabled", "true");
  if(startLoad) return false;

    if (validateEmail() && validatePassword()) {
    loginBtn.style.backgroundColor = "var(--inputfocuscolor)";
    loginBtn.style.pointerEvents = "";
    // cursor가 pointer(link)를 나타낸다.
    loginBtn.style.cursor = "pointer";
    //Attribute : 모든 속성값을 읽음
    //disabled : 값이 true면 비활성화, false면 활성화
    loginBtn.removeAttribute("disabled", "false");
  } else {
    disableSignupButton();
  }
};

// 눈모양 아이콘 비밀번호 표시/ 숨기기 토글 = 기본상태는 숨김
togglePassword.addEventListener("click", () => {
if (passwordInput.type === "password"){
  passwordInput.type = "text";
} else {
  passwordInput.type = "password";
}
});

//이벤트 발생
emailInput.addEventListener ("blur", () => {
  startLoad = false;
  validateEmail();
  toggleLoginBtn();
});
emailInput.addEventListener ("input", () => {
  removeErrorMessage(emailInput);
  toggleLoginBtn();
});


passwordInput.addEventListener ("blur", () => {
  startLoad = false;
  validatePassword();
  toggleLoginBtn();
});
passwordInput.addEventListener ("input", () => {
  removeErrorMessage(passwordInput);
  toggleLoginBtn();
});


// 이메일이 데이터베이스에 없거나 이메일은 일치하지만 비밀번호가 틀린경우 "비밀번호가 일치하지 않습니다." alert messege 표시
// 오류 메시지 모달을 구현합니다. 모달 내 내용은 alert 메시지와 동일합니다.
// (비밀번호가 일치하지 않습니다.)
const showModal = (message) => {
  const modal = document.querySelector("#error-modal");
  const modalMessage = document.querySelector("#modal-message");
  modalMessage.textContent = message;
  modal.classList.add("show");
};

const closeModal = () => {
  const modal = document.querySelector("#error-modal");
  modal.classList.remove("show")
};

document.querySelector("#modal-closeBtn").addEventListener("click", closeModal);

loginBtn.addEventListener("click", (e) => {
  // 페이지 새로고침 방지
  e.preventDefault();

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  //find : 배열에서 특정 조건을 만족하는 요소를 찾아 첫 번째 요소로 반환
  const user = USER_DATA.find((user) => user.email === emailValue);

    if (!user){
      showModal("비밀번호가 일치하지 않습니다.");
    } else if (user.password !== passwordValue) {
      showModal("비밀번호가 일치하지 않습니다.");
    } else {
      window.location.href = "./items.html";
    }

});

toggleLoginBtn();
});




