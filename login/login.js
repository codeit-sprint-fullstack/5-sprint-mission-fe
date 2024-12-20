//input에서 focus out할 때, 값이 없을 경우 input 빨강테두리+에러메세지
const emailBox = document.querySelector("#uid");
const pwdBox = document.querySelector("#password");
const errorMsgEmail_N = document.querySelector("#error-message-email-none");
const errorMsgPwd = document.querySelector("#error-message-pwd");

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
    errorMsgPwd.style.display = "block";
  } else {
    event.target.style.border = "none";
    errorMsgPwd.style.display = "none";
  }
});

//이메일 유효성 검사
const errorMsgEmail_T =document.querySelector("#error-message-email-type");
const emailRegex = /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/

function emailcheck(emailBox) {
  return /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(emailBox);
}

emailBox.addEventListener("input", (e) => {
  if (!e.target.value.length) {
    errorMsgEmail_T.style.display = "none";
    return;
  }
  if (emailcheck(e.target.value)) errorMsgEmail_T.style.display = "none";
  else errorMsgEmail_T.style.display = "block";
})
