// import
import { USER_DATA } from "../../data/USER_DATA.js";
import { alertDialog } from "../modal/modalHandler.js";

// DOM
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const isMatchEmail = (data) => email.value.trim() === data.email;
const isMatchPassword = (data) => password.value.trim() === data.password;

export const verifyLogin = () => {
  const matchData = USER_DATA.find((data) => isMatchEmail(data)); // match된 data 저장, data 없으면 undefined

  if (!matchData) {
    // 일치하는 mail이 없는 경우
    alertDialog("이메일이 일치하지 않습니다"); // 이메일 일치하지 않을 경우 alert 열고 return
    return false;
  }
  if (!isMatchPassword(matchData)) {
    // 일치하는 password가 없는 경우
    alertDialog("비밀번호가 일치하지 않습니다"); // 비밀번호 일치하지 않을 경우 alert 열고 return
    return false;
  }

  return true; // 이메일 비번 둘다 맞는 경우 url로 이동
};

export const verifySignUp = () => {
  const matchData = USER_DATA.find((data) => isMatchEmail(data)); // match된 data 저장, data 없으면 undefined

  if (matchData) {
    // 일치하는 메일이 있는 경우
    alertDialog("사용 중인 이메일입니다.");
    return false;
  }

  return true;
};
