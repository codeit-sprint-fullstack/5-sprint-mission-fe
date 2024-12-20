//input에서 focus out할 때, 값이 없을 경우 input 빨강테두리+에러메세지
const emailBox = document.querySelector("#uid");
const pwdBox = document.querySelector("#password");
const errorMsgEmail_N = document.querySelector("#error-message-email-none");
const errorMsgPwd_N = document.querySelector("#error-message-pwd-none");


emailBox.addEventListener("focusout", (event)=> {
  if(!event.target.value) {
    event.target.style.border = "1px solid red";
    errorMsgEmail_N.style.display = "block";
    } else {
      event.target.style.border = "none";
      errorMsgEmail_N.style.display = "none";
    }
  });

pwdBox.addEventListener("focusout", (event)=> {
  if(!event.target.value) {
    event.target.style.border = "1px solid red";
    errorMsgPwd_N.style.display = "block";
  } else {
    event.target.style.border = "none";
    errorMsgPwd_N.style.display = "none";
  }
});

//이메일 유효성 검사 및 에러메세지
const errorMsgEmail_T =document.querySelector("#error-message-email-type");
const emailRegex = /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/

function emailcheck(emailBox) {
  return /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(emailBox);
};

emailBox.addEventListener("input", (e) => {
  if (!e.target.value.length) {
    errorMsgEmail_T.style.display = "none";
    return;
  }
  if (emailcheck(e.target.value)) errorMsgEmail_T.style.display = "none";
  else errorMsgEmail_T.style.display = "block";
  return;
});

//비밀번호 유효성 검사 및 에러메세지
const errorMsgPwd_T =document.querySelector("#error-message-pwd-type");

function pwdcheck(pwdBox) {
  return /^[a-zA-Z0-9]{8,}$/.test(pwdBox);
};

pwdBox.addEventListener("input", (e) => {
  if (!e.target.value.length) {
    errorMsgPwd_T.style.display = "none";
    return;
  }
  if (pwdcheck(e.target.value)) errorMsgPwd_T.style.display = "none";
  else errorMsgPwd_T.style.display = "block";
});

//로그인버튼 활성화 비활성화