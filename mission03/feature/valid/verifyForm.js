// import
import { validHandler } from "./handler.js";
import { activeButton } from "../auth/authButton.js";

// DOM
const form = document.querySelector("form"); // form 요소
const inputs = form.querySelectorAll("input"); // input 요소

// 오류 체크 함수
export const checkError = (inputs) => {
  for (const input of inputs) {
    const listener = function () {
      const handler = validHandler(this.id); // this를 사용해 현재 요소 참조
      handler(this);
      activeButton();
    };
    input.addEventListener("focusout", listener);
    input.addEventListener("input", listener);
  }
};

// 오류 체크 실행
checkError(inputs);
