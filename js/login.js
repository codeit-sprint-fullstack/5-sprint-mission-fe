const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

document.addEventListener("DOMContentLoaded", () => {
  const pw = document.getElementById("pw");
  const pwError = document.getElementById("pwError");
  const pwView = document.getElementById("pwView");
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const login = document.getElementById("login");
  const modal = document.querySelector(".modal");
  const modalMessage = document.querySelector(".modal-message");
  const modalBtn = document.querySelector(".modal-btn");
  const ErorRed = "#F74747";
  const emailValidate = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  const pwValidate = /^(?=.*[a-zA-Z])(?=.*[0-8])(?=.*[!@#$%^*+=-]).{6,16}$/;

  window.addEventListener("resize", (e) => {
    if (e.target.innerWidth < 1200) {
      const main = document.querySelector("main");
      main.style.padding = "48px 52px 48px 52px";
      main.style.width = "calc(100% - 104px)";
      main.style.margin = "0 auto";
      main.style.height = "calc(100vh - 96px)";
    }
    if (e.target.innerWidth < 744) {
      const main = document.querySelector("main");
      main.style.padding = "24px 15px 24px 15px";
      main.style.width = "calc(100% - 30px)";
      main.style.margin = "0 auto";
      main.style.height = "calc(100vh - 48px)";
    }
  });

  const debounce = (func, delay) => {
    let timer;
    return function () {
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const focusOut = (target, error, message) => {
    target.addEventListener("focusout", () => {
      if (target.value === "") {
        target.style.border = `1px solid ${ErorRed}`;
        error.textContent = message;
        return;
      }
    });
  };

  const modalOpen = (msg) => {
    modalMessage.textContent = msg;
    modal.style.display = "block";
  };
  const modalClose = () => {
    modalMessage.textContent = "";
    modal.style.display = "none";
  };

  const keyUp = (target, error, message) => {
    target.addEventListener(
      "keyup",
      debounce(() => {
        let emailCheck = emailValidate.test(email.value);
        let pwCheck = pwValidate.test(pw.value);

        if (emailCheck && pwCheck) {
          login.disabled = false;
        } else {
          login.disabled = true;
        }

        if (target.id === "email") {
          if (!emailCheck) {
            target.style.border = `1px solid ${ErorRed}`;
            error.textContent = message;
          } else {
            target.style.border = "";
            error.textContent = "";
          }
        }

        if (target.id === "pw") {
          if (!pwCheck) {
            target.style.border = `1px solid ${ErorRed}`;
            error.textContent = message;
          } else {
            target.style.border = "";
            error.textContent = "";
          }
        }
      }, 500)
    );
  };

  email.addEventListener(
    "keyup",
    debounce(() => {
      serch = USER_DATA.findIndex((d) => {
        return d.email === email.value;
      });
    }, 500)
  );

  pwView.addEventListener("click", () => {
    if (pw.type === "password") {
      pw.type = "text";
      pwView.src = "../assets/btn_visibility_on_24px.png";
    } else {
      pw.type = "password";
      pwView.src = "../assets/btn_visibility_off_24px.png";
    }
  });

  login.addEventListener("click", () => {
    let serch = USER_DATA.find((d) => {
      return d.email === email.value;
    });
    console.log(serch);
    if (!serch) {
      modalOpen("일치하는 회원정보가 없습니다.");
    } else if (serch.password !== pw.value) {
      modalOpen("비밀번호가 일치하지 않습니다.");
    } else {
      location.href = "./items.html";
    }
  });

  modalBtn.addEventListener("click", () => {
    modalClose();
  });

  focusOut(email, emailError, "이메일을 입력해 주세요");
  focusOut(pw, pwError, "패스워드를 입력해 주세요.");
  keyUp(email, emailError, "잘못된 이메일 형식입니다.");
  keyUp(pw, pwError, "비밀번호를 8자 이상 입력해주세요.");
});
