// import
import { isEmpty } from "../valid/condition.js";
import { verifyLogin, verifySignUp } from "../auth/verifyAuth.js";
import { isAllValid } from "../valid/condition.js";

// DOM
const form = document.querySelector("form");
const button = form.querySelector("button");
const inputs = form.querySelectorAll("input");
const pageName = inputs.length === 2 ? "login" : "signup";
const url =
  pageName === "login" ? "../../html/items.html" : "../../html/login.html";
const verifyHandler = pageName === "login" ? verifyLogin : verifySignUp;

// 버튼이 유효한면 style 변경
export const activeButton = () => {
  if (isAllValid(inputs)) {
    button.classList.add("activeButton");
    return true; // 유효하면 true 페이지 이동
  } else {
    button.classList.remove("activeButton");
    return false;
  }
};
// 페이지 이동
const navigate = (url) => {
  window.location.href = url;
};

// 버튼 클릭 핸들러
const clickHandler = (e) => {
  e.preventDefault();
  if (activeButton() && verifyHandler()) navigate(url);
};

button.addEventListener("click", clickHandler);
