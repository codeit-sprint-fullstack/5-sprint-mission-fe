export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]

export const email = {
  input: document.getElementById("email"),
  error: document.getElementById("email-error"),
  validator: function() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.input.value)
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
  if(!value) error.textContent = text.empty;
  else error.textContent = text.unvalid;
};