// import
import { isEmpty } from "../valid/condition.js";

// DOM
const form = document.querySelector("form");
const button = form.querySelector("button");
const inputs = form.querySelectorAll("input");

// 모든 input 요소가 유효한지 체크하는 함수
const isAllValid = (inputs) => {
  for (const input of inputs) {
    const field = input.closest(".field"); // 가까운 field 요소 가져오기
    const errorMessage = field.querySelector(".error-message"); // field의 에러 메시지 가져오기

    if (isEmpty(input) || errorMessage) return false; // 비어있거나 오류 메시지가 있으면 유효하지 않음
    return true; // 값이 있고 오류 메시지가 없으면 유효함
  }
};

const hoverHandler = (e) => {
  if (isAllValid(inputs)) {
    button.classList.add("activeButton");
  } else {
    button.classList.remove("activeButton");
  }
};

const clickHandler = (e) => {
  if (isAllValid(inputs)) {
    // Input 에 유효한 값을 입력하면  ‘로그인' 버튼이 활성화
    // “/items” 로 이동
  } else {
    // ‘로그인' 버튼이 비활성화
  }
};

// button.addEventListener("click", clickHandler);
button.addEventListener("mouseover", hoverHandler);
