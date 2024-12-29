const emailInput = document.querySelector("#signup-email");

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

const passwordInput = document.querySelector("#signup-password");

passwordInput.addEventListener("blur", () => {
  const value = passwordInput.value;
  const errorEmpty = document.querySelector("#password-empty");
  const errorShort = document.querySelector("#password-short");

  const isValid = validatePassword(value);
  const isLength = validatePasswordLength(value);

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

const checkPasswordsMatch = () => {
  const password1 = document.getElementById("signup-password").value;
  const password2 = document.getElementById("equal-Password").value;
  return password1 === password2;
};

const signupButton = document.querySelector("#signup-button");

function handleButtonVisibility() {
  const passwordValue = passwordInput.value;
  const isPasswordValid = validatePassword(passwordValue);
  const isPasswordEqual = checkPasswordsMatch();

  const emailValue = emailInput.value;
  const isEmailValid = validateEmail(emailValue);

  if (isPasswordValid && isEmailValid && isPasswordEqual) {
    signupButton.disabled = false;
    signupButton.classList.add("signup-button");
    signupButton.classList.remove("button_disabled");
  } else {
    signupButton.disabled = true;
    signupButton.classList.remove("signup-button");
    signupButton.classList.add("button_disabled");
  }
}

const passwordConfirmInput = document.querySelector("#equal-Password");

passwordConfirmInput.addEventListener("blur", () => {
  const isEqual = checkPasswordsMatch();
  const errorUnequal = document.querySelector("#password-unequal");

  passwordConfirmInput.classList.remove("invalid");
  errorUnequal.classList.remove("visible");

  if (!isEqual) {
    passwordConfirmInput.classList.add("invalid");
    errorUnequal.classList.add("visible");
  }

  handleButtonVisibility();
});

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
    if (validEmail === emailValue) {
      return false;
    } else {
      return true;
    }
  });

  //비밀번호와 비밀번호 확인이 일치, 불일치 관련 모달 팝업을 구현하지 못하였습니다.

  if (found) {
    window.location.href = "/login.html";
    return true;
  }

  const foundEmail = USER_DATA.find((user) => {
    const validEmail = user.email;
    if (validEmail === emailValue) {
      return true;
    }
  });

  if (foundEmail) {
    document.getElementById("modalError").innerText = "사용 중인 이메일입니다.";
  }
}

const modal = document.querySelector(".modal");
const modalOpen = document.querySelector("#signup-button");
const modalClose = document.querySelector(".close_btn");

modalOpen.addEventListener("click", function () {
  modal.style.display = "block";
});
modalClose.addEventListener("click", function () {
  modal.style.display = "none";
});

//모달 팝업이 이메일, 비밀번호 에러 모두 제대로 작동하지 않고 있는데 어디서 코드가 잘못된 것인지 파악하지 못하였습니다.
