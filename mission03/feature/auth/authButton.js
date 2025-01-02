// import
import { verifyLogin, verifySignUp } from "./verifyAuth.js";
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
    button.classList.add("activeButton"); // 유효하면 버튼 활성화
    return true; // 유효하면 true 페이지 이동
  } else {
    button.classList.remove("activeButton"); // 유효하지 않으면 버튼 비활성화
    return false; // 유효하지 않으면 false 페이지 이동 x
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
