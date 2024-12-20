//이메일input에서 focus out할 때, 값이 없을 경우 input 빨강테두리+에러메세지
const emailBox = document.querySelector("#uid");
const pwdBox = document.querySelector("#password");
const errorMsgEmail = document.querySelector("#error-message-email");
const errorMsgPwd = document.querySelector("#error-message-pwd");

emailBox.addEventListener("focusout", (event)=> {
  if(!event.target.value) {
    event.target.style.border = "1px solid red";
    errorMsgEmail.style.display = "block";
    } else {
      event.target.style.border = "none";
      errorMsgEmail.style.display = "none";
    }
  });

pwdBox.addEventListener("mouseout", (event)=> {
  if(!event.target.value) {
    event.target.style.border = "1px solid red";
    errorMsgPwd.style.display = "block";
  } else {
    event.target.style.border = "none";
    errorMsgPwd.style.display = "none";
  }
})