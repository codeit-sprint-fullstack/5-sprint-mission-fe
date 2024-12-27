////input에서 focus out할 때, 값이 없을 경우 input 빨강테두리+에러메세지
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

////이메일 유효성 검사 및 에러메세지
const errorMsgEmail_T =document.querySelector("#error-message-email-type");
const emailRegex = /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{3,}$/

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

////비밀번호 유효성 검사 및 에러메세지
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

////로그인버튼 활성화 비활성화
const loginButton = document.getElementById("login-btn")
//Q.위에서 유효성 검사한 값에 알맞지 않을 경우 비활성화하는 방법 질문하기
let loginButtonCheck = true 

function checkLabel() {
  if (emailBox.value.trim() === '' || pwdBox.value.trim() === '') {
    loginButton.disabled = true;
    loginButtonCheck = true;
    loginButton.style.backgroundColor = "#9CA3AF";
    // console.log("버튼 비활성화");
  } else {
    loginButton.disabled = false;
    loginButtonCheck = false;
    loginButton.style.backgroundColor = "#3692FF";
    loginButton.style.cursor = "pointer";
    // console.log("버튼 활성화");
  }
}

emailBox.addEventListener('input',checkLabel);
pwdBox.addEventListener('input',checkLabel);

//활성화버튼 클릭 시 페이지 이동
function siteinItems() {
  window.location.href ="../items/items.html";
}

// loginButton.addEventListener("click", (e) => {
//   // console.log("loginButtonCheck",loginButtonCheck);
//   if (!loginButtonCheck) {
//     console.log("on2");
//     // siteinItems();
//   } 
// })

////로그인 성공 여부
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const alertBox = document.querySelector(".alert_box");
const alertButton = document.querySelector(".alrert-btn");
const overlay = document.querySelector(".overlay");

function handleLogin () {
  let dataFound = false;
  for (let i = 0; i < USER_DATA.length; i++) {
  // console.log ("USER_DATA[i].email",USER_DATA[i].email)
  // console.log ("USER_DATA[i].password",USER_DATA[i].password)
  // console.log ("emailBox.value",emailBoxVal)
  // console.log ("pwdBox.value", pwdBoxVal)
  const emailBoxVal = emailBox.value;
  const pwdBoxVal = pwdBox.value;
  if (USER_DATA[i].email === emailBoxVal && USER_DATA[i].password === pwdBoxVal) {
    // console.log("데이터랑 입력값이 일치!!");
    dataFound = true;
    break;
  }
} 
if (dataFound) {
  window.location.href = "../items/items.html";
} else {
  alertBox.style.display = "block";
  overlay.style.display = "block";
}
}

loginButton.addEventListener("click", handleLogin);

alertButton.addEventListener("click", (e) => {
  alertBox.style.display = "none";
  overlay.style.display = "none";
});

////비밀번호 토글창
const togglePwd = document.querySelector("#toggle-password");
const iconImage = togglePwd.querySelector("img");
//console.log("아이콘이미지2확인",iconImage);
togglePwd.addEventListener("click", () => {
  if (pwdBox.type === "password") {
    pwdBox.type = "text";
    iconImage.src = "btn_visibility_on_24px.png";
  } else {
    pwdBox.type = "password";
    iconImage.src = "btn_visibility_off_24px.png";
  }
})