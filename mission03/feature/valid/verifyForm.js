// import
import { validHandler } from "./handler.js";

// DOM id
const ids = ["email", "nickname", "password", "password-check"];
// DOM 요소를 배열로 가져오기
const forms = ids.map((id) => document.querySelector(`#${id}`));

// DOM 배열 순회로 이벤트 등록
for (const form of forms) {
  if (!form) continue; // form이 존재하지 않으면 건너뛰기

  const listener = (e) => {
    const input = e.target;
    const handler = validHandler(input.id);
    handler(input);
  };
  form.addEventListener("focusout", listener);
  form.addEventListener("input", listener);
}
