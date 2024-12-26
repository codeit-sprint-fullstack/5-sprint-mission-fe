document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector("#email-Input");
  const passwordInput = document.querySelector("#password-Input");
  const RepasswordInput = document.querySelector("#Repassword-Input");
  const togglePassword = document.querySelector("#togglePassword");
  const toggleRePassword = document.querySelector("#toggleRePassword");
  const signupBtn = document.querySelector(".signup-button");
  
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

  const validateRePassword  = () => {
    const passwordValue = passwordInput.value.trim();
    const RepasswordValue = RepasswordInput.value.trim();

    if (startLoad) return true;

  
    if (!RepasswordValue) {
      createErrorMessage(RepasswordInput, "비밀번호를 입력해주세요.");
      return false;
    } else if (RepasswordValue !== passwordValue) {
      createErrorMessage(RepasswordInput, "비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      removeErrorMessage(RepasswordInput);
      return true;
    }
  };
  

  // input에 빈 값 or errorm messege 있으면 로그인 버튼 비활성화
  // input에 유효값이 있다면 로그인 버튼 활성화
  // 활성화 된 로그인 버튼은 아이템으로 이동

   // 회원가입 버튼 초기 비활성화 설정
   const disableSignupButton = () => {
    signupBtn.style.backgroundColor = "var(--inputtextcolor)";
    signupBtn.style.pointerEvents = "none";
    signupBtn.style.cursor = "not-allowed";
    signupBtn.setAttribute("disabled", "true");
  };

  disableSignupButton();
  
  const toggleSignupBtn = () => {

    if(startLoad) return false;

      if (validateEmail() && validatePassword() && validateRePassword()) {
      signupBtn.style.backgroundColor = "var(--inputfocuscolor)";
      signupBtn.style.pointerEvents = "";
      // cursor가 pointer(link)를 나타낸다.
      signupBtn.style.cursor = "pointer";
      //Attribute : 모든 속성값을 읽음
      //disabled : 값이 true면 비활성화, false면 활성화
      signupBtn.removeAttribute("disabled");
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

  toggleRePassword.addEventListener("click", () => {
    if (RepasswordInput.type === "password"){
      RepasswordInput.type = "text";
    } else {
      RepasswordInput.type = "password";
    }
    });
  
  
  //이벤트 발생
  emailInput.addEventListener ("blur", () => {
    startLoad = false;
    validateEmail();
    toggleSignupBtn();
  });
  emailInput.addEventListener ("input", () => {
    removeErrorMessage(emailInput);
    toggleSignupBtn();
  });
  
  
  passwordInput.addEventListener ("blur", () => {
    startLoad = false;
    validatePassword();
    toggleSignupBtn();
  });

  passwordInput.addEventListener ("input", () => {
    removeErrorMessage(passwordInput);
    toggleSignupBtn();
  });


  RepasswordInput.addEventListener ("blur", () => {
    startLoad = false;
    validateRePassword();
    toggleSignupBtn();
  });
  RepasswordInput.addEventListener ("input", () => {
    removeErrorMessage(RepasswordInput);
    toggleSignupBtn();
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
  

// 회원가입을 위해 이메일, 닉네임, 비밀번호, 비밀번호 확인을 입력한 뒤, 회원가입 버튼을 클릭하세요. 그 후에는 다음 조건에 따라 회원가입 가능 여부를 alert로 알려주세요.
// 입력한 이메일이 이미 데이터베이스(USER_DATA)에 존재하는 경우, '사용 중인 이메일입니다'라는 메시지를 alert로 표시합니다.
// 입력한 이메일이 데이터베이스(USER_DATA)에 없는 경우, 회원가입이 성공적으로 처리되었으므로 로그인 페이지(”/login”)로 이동합니다.
// 오류 메시지 모달을 구현합니다. 모달 내 내용은 alert 메시지와 동일합니다.
// (사용 중인 이메일입니다.)

  document.querySelector("#modal-closeBtn").addEventListener("click", closeModal);

  signupBtn.addEventListener("click", (e) => {
    // 페이지 새로고침 방지
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const RepasswordValue = RepasswordInput.value.trim();
    //find : 배열에서 특정 조건을 만족하는 요소를 찾아 첫 번째 요소로 반환
    const user = USER_DATA.find((user) => user.email === emailValue);
  
      if (!user){
        showModal("사용 중인 이메일입니다.");
      } else if (user.password !== passwordValue && passwordValue !== RepasswordValue) {
        showModal("사용 중인 이메일입니다.");
      } else {
        window.location.href = "./login.html";
      }
  
  });
  
  toggleSignupBtn();
  });
  