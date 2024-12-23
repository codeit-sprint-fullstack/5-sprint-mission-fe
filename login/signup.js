const emailBox = document.querySelector("#uid");
const nickBox = document.querySelector("#unickname");
const pwdBox = document.querySelector("#password");
const pwdCheckBox = document.querySelector("#passwordcheck");
const errorMsgEmail_N = document.querySelector("#error-message-email-none");
const errorMsgPwd_N = document.querySelector("#error-message-pwd-none");

////focus out일 때 테두리 및 메세지지
emailBox.addEventListener("focusout", (event)=> {
  if(!event.target.value) {
    event.target.style.border = "1px solid red";
    errorMsgEmail_N.style.display = "block";
    } else {
      event.target.style.border = "none";
      errorMsgEmail_N.style.display = "none";
    }
  })

  pwdBox.addEventListener("focusout", (event)=> {
    if(!event.target.value) {
      event.target.style.border = "1px solid red";
      errorMsgPwd_N.style.display = "block";
    } else {
      event.target.style.border = "none";
      errorMsgPwd_N.style.display = "none";
    }
  })

  ////이메일 유효성 검사 및 메세지
  const errorMsgEmail_T =document.querySelector("#error-message-email-type");
  const emailRegex = /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/
  
  function emailcheck(emailBox) {
    return /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{3,}$/.test(emailBox);
  }
  
  emailBox.addEventListener("input", (e) => {
    if (!e.target.value.length) {
      errorMsgEmail_T.style.display = "none";
      return;
    }
    if (emailcheck(e.target.value)) errorMsgEmail_T.style.display = "none";
    else errorMsgEmail_T.style.display = "block";
    return;
  })

  ////비밀번호 유효성 검사 및 메세지
  const errorMsgPwd_T =document.querySelector("#error-message-pwd-type");

  function pwdcheck(pwdBox) {
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~@#$!%*?&])[a-zA-Z\d~@#$!%*?&]{8,}$/.test(pwdBox);
  }

  pwdBox.addEventListener("input", (e) => {
  if (!e.target.value.length) {
    errorMsgPwd_T.style.display = "none";
    return;
  }
  if (pwdcheck(e.target.value)) errorMsgPwd_T.style.display = "none";
  else errorMsgPwd_T.style.display = "block";
  })

////회원가입버튼 활성화 비활성화
const joinButton = document.getElementById("join-btn")

let joinButtonCheck = true;

function checkInput() {
  if (emailBox.value.trim() === '' || pwdBox.value.trim() === '' 
  || nickBox.value.trim() === ''|| pwdCheckBox.value.trim() === '') {
    joinButton.disabled = true;
    joinButtonCheck = true;
    joinButton.style.backgroundColor = "#9CA3AF";
    // console.log("버튼 비활성화");
  } else {
    joinButton.disabled = false;
    joinButtonCheck = false;
    joinButton.style.backgroundColor = "#3692FF";
    joinButton.style.cursor = "pointer";
    // console.log("버튼 활성화");
  }
}

emailBox.addEventListener('input',checkInput);
nickBox.addEventListener('input',checkInput);
pwdBox.addEventListener('input',checkInput);
pwdCheckBox.addEventListener('input',checkInput);

//활성화버튼 클릭 시 페이지 이동
function siteinLogin() {
  window.location.href ="./login.html";
}

joinButton.addEventListener("click", (e) =>{
  if (!joinButtonCheck) {
    console.log("로그인페이지로 사이트 이동");
    siteinLogin();
  }
})
