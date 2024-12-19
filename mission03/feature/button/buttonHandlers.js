// import
import { isEmpty } from "../valid/condition.js";

// DOM
const form = document.querySelector("form");
const button = form.querySelector("button");
const inputs = form.querySelectorAll("input");
const pageName = inputs.length === 2 ? "login" : "signup";
const url =
  pageName === "login" ? "../../html/items.html" : "../../html/login.html";

const isAllValid = (inputs) => {
  // 모든 input 요소가 유효한지 체크하는 함수
  for (const input of inputs) {
    const field = input.closest(".field"); // 가까운 field 요소 가져오기
    const errorMessage = field.querySelector(".error-message"); // field의 에러 메시지 가져오기

    if (isEmpty(input) || errorMessage) return false; // 비어있거나 오류 메시지가 있으면 유효하지 않음
  }

  return true; // 모든 요소에 값이 있고 오류 메시지가 없으면 유효함
};

// url 이동 함수
const navigate = (url) => {
  window.location.href = url;
};

// 버튼이 유효한지 판단
const buttonHandler = (nav = () => {}) => {
  if (isAllValid(inputs)) {
    button.classList.add("activeButton");
    nav();
  } else {
    button.classList.remove("activeButton");
  }
};

// 버튼 호버 핸들러
const hoverHandler = (e) => {
  e.preventDefault();
  buttonHandler();
};

// 버튼 클릭 핸들러
const clickHandler = (e) => {
  e.preventDefault();
  const nav = () => navigate(url);
  buttonHandler(nav);
};

button.addEventListener("click", clickHandler);
button.addEventListener("mouseover", hoverHandler);
