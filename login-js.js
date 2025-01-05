const emailInput = document.querySelector("#login-email");

emailInput.addEventListener("blur", () => {
  const value = emailInput.value;
  const errorEmpty = document.querySelector("#email-empty");
  const errorForm = document.querySelector("#email-wrong");
  const isEmpty = lengthEmail(value);
  const isValid = validateEmail(value);

  emailInput.classList.remove("invalid");
  errorForm.classList.remove("visible");
  errorEmpty.classList.remove("visible");

  if (!isEmpty) {
    emailInput.classList.add("invalid");
    errorEmpty.classList.add("visible");
    return;
  }

  if (!isValid) {
    emailInput.classList.add("invalid");
    errorForm.classList.add("visible");
    return;
  }
  handleButtonVisibility();
});

const lengthEmail = (email) => !!email.length;
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
}

const passwordInput = document.querySelector("#login-password");

passwordInput.addEventListener("blur", () => {
  const value = passwordInput.value;
  const errorEmpty = document.querySelector("#password-empty");
  const errorShort = document.querySelector("#password-short");
  const isLength = validatePasswordLength(value);
  const isValid = validatePassword(value);

  passwordInput.classList.remove("invalid");
  errorEmpty.classList.remove("visible");
  errorShort.classList.remove("visible");

  if (!isValid) {
    passwordInput.classList.add("invalid");
    errorEmpty.classList.add("visible");
    return;
  }

  if (!isLength) {
    passwordInput.classList.add("invalid");
    errorShort.classList.add("visible");
    return;
  } else {
    passwordInput.classList.remove("invalid");
  }
  handleButtonVisibility();
});

const validatePassword = (password) => !!password.length;
const validatePasswordLength = (password) => password.length >= 8;

const loginButton = document.querySelector("#login-button");

function handleButtonVisibility() {
  const passwordValue = passwordInput.value;
  const isPasswordValid = validatePassword(passwordValue);

  const emailValue = emailInput.value;
  const isEmailValid = validateEmail(emailValue);

  if (isPasswordValid && isEmailValid) {
    loginButton.disabled = false;
    loginButton.classList.add("login-button");
    loginButton.classList.remove("button_disabled");
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove("login-button");
    loginButton.classList.add("button_disabled");
  }

  // 비밀번호가 8자 이상일때 활성화가 되지만, 그 이후 비밀번호를 8자 미만으로 줄였을 때 여전히 버튼이 활성화 상태입니다. 이런 오류는 어떻게 해결해야 할까요?
}

handleButtonVisibility();

const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

function setValue(value) {
  document.getElementById("value").value = value;
}

function onsubmitFunc(event) {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  const found = USER_DATA.find((user) => {
    const validEmail = user.email;
    const validPassword = user.password;
    if (validEmail === emailValue && validPassword === passwordValue) {
      return true;
    }
    if (validEmail !== emailValue) {
      return false;
    }
    if (validPassword !== passwordValue) {
      return false;
    }
  });

  if (found) {
    window.location.href = "items.html";
    return true;
  }

  const foundEmail = USER_DATA.find((user) => {
    const validEmail = user.email;
    if (validEmail === emailValue) {
      return true;
    }
    return false;
  });

  if (!foundEmail) {
    document.getElementById("modalError").innerText =
      "등록되지 않은 이메일입니다.";
    return true;
  }

  const foundPassword = USER_DATA.find((user) => {
    const validPassword = user.password;
    if (validPassword === passwordValue) {
      return true;
    }
    return false;
  });

  if (!foundPassword) {
    document.getElementById("modalError").innerText =
      "비밀번호가 일치하지 않습니다.";
  }
  return false;
}

const modal = document.querySelector(".modal");
const modalOpen = document.querySelector("#login-button");
const modalClose = document.querySelector(".close_btn");

modalOpen.addEventListener("click", function () {
  modal.style.display = "block";
});
modalClose.addEventListener("click", function () {
  modal.style.display = "none";
});
