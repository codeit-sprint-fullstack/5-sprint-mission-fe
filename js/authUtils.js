export const email = {
  input: document.getElementById("email"),
  error: document.getElementById("email-error"),
  validator: function () {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(this.input.value)
  },
  text: {
    unvalid: "잘못된 이메일 형식입니다.",
    empty: "이메일을 입력해주세요."
  }
};

export const pwd = {
  input: document.getElementById("pwd"),
  error: document.getElementById("pwd-error"),
  validator: function () {
    return this.input.value.length >= 8
  },
  text: {
    unvalid: "비밀번호를 8자 이상 입력해주세요.",
    empty: "비밀번호를 입력해주세요.",
  }
}

//공백 입력 무시
//e.g. "a  b" -> "ab"
export const removeWhitespace = (e) => e.target.value = e.target.value.replace(/\s+/g, "");

export const updateInvalidMessage = (value, error, text) => {
  if (!value) error.textContent = text.empty;
  else error.textContent = text.unvalid;
};

export const validateInput = (element, updateButtonState, confirm) => {
  const value = element.input.value;

  updateInvalidMessage(value, element.error, element.text);
  if (!value || !element.validator(confirm)) element.input.classList.add("error");
  else element.input.classList.remove("error");

  updateButtonState();
}
